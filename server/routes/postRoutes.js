
import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});


  router.route('/').get(async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      res.status(200).json({ success: true, data: post });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching post data' });
    }
  });

  router.post('/:id/like', async (req, res) => {

    const { id } = req.params;  // Get the post ID from the URL
    const { userId, liked } = req.body;  // Get the liked status from the request body
    try {
      // Find the post by ID
      //console.log("userId:", userId);

      const post = await Post.findById(id);
      if (!post) {
        console.log('Post not found');
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      if(req.body.liked == false)
      {
        post.likedBy = post.likedBy.filter(id => id !== userId);
        await post.save();
      }

      if (post.likedBy.includes(userId)) {
        return res.status(400).json({ error: 'User has already liked this post' });
      }
      // Increment or decrement the likes count based on 'liked' value
      post.likes = liked && !post.likedBy.includes(userId)? post.likes + 1 : Math.max(0, post.likes - 1);
      console.log(`Updated likes count: ${post.likes}`);

     
  
      // Add the userId to the likedBy array
      post.likedBy.push(userId);
      await post.save();  // Save the updated post
      console.log('Post saved successfully');

      // Respond with the updated post
      res.status(200).json({ success: true, data: post });
    } catch (err) {
      console.error('Error saving post:', err);

      // Handle any errors
      res.status(500).json({ success: false, message: 'Error updating likes' });
    }
  });

export default router;


