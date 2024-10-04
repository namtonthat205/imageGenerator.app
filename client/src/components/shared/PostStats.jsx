import like from "@/assets/like.svg";
import likedIcon from "@/assets/liked.svg";
import { useState, useEffect } from "react";
import { useUserContext } from '@/context/AuthContext'; // Import your context
import { getCurrentUser, likePost } from '@/lib/appwrite/api';
import { useLikePost } from "@/lib/appwrite/react-query/queriesAndMutations";

const LikeButton = ({ _id, initialLikes,user }) => {


//const {mutate: likePost} = useLikePost();
  const [likes, setLikes] = useState(initialLikes);  // Default to 0 if no initialLikes are provided
  const [liked, setLiked] = useState(false);  // Assume the user hasn't liked the post yet

  useEffect(() => {
    // Fetch post data on component mount and check if the current user has liked the post
    const fetchPostData = async () => {
      try {
        const response = await fetch(`https://imagegenerator-app.onrender.com/api/v1/post/${_id}`);  // Fetch the post data from backend
        const postData = await response.json();
        console.log('post data:', postData);

        const currentUser = await getCurrentUser();
        const userId = currentUser.$id;


        if (postData.data.likedBy && postData.data.likedBy.includes(userId)) {
          console.log("Already liked");
          setLiked(true);
        }
        //console.log("postData Likes:",postData.data.likes);
        setLikes(postData.data.likes);  // Set initial likes count from backend
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [_id]);

  const handleLike = async () => {
    try {
      const currentUser = await getCurrentUser();
      const userId = currentUser.$id;  // Get the user's id

      // Toggle the like state
      const newLikeStatus = !liked;
      // Update the likes count locally
      const updatedLikes = likes + (newLikeStatus ? 1 : -1);

      setLikes(updatedLikes);
        setLiked(newLikeStatus);
      //console.log("likes:",likes)
      // Send a request to the server to update the likes
      await fetch(`https://imagegenerator-app.onrender.com/api/v1/post/${_id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ liked: newLikeStatus, userId,likes: updatedLikes, }),  // Send liked status and userId
        
      });
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={liked ? likedIcon : like}  // Conditionally show liked or unliked icon
          alt="like"
          width={20}
          height={20}
          onClick={handleLike}  // Trigger like/unlike action
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes || 0}</p>  {/* Display like count */}
      </div>
    </div>
  );
};

export default LikeButton;
