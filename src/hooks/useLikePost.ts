import { useState } from "react";
import useAuthStore from "store/authStore";
import { Post } from "types/Post";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "firebase/FirebaseConfig";

const useLikePost = (post: Post) => {
  const authUser = useAuthStore((state) => state.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser!.uid));
  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser) {
      return showToast(
        "Error",
        "You must be logged in to like a post",
        "error"
      );
    }
    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", post.id!);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });
      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
