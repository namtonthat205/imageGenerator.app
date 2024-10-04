import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name:{type : String, required:true},
    prompt:{type : String, required:true},
    photo:{type : String, required:true},
    likes:{type: Number, default: 0 },
    likedBy: [{type: String }], // New field to track users who liked

});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema