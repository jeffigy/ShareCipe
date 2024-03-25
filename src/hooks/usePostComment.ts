import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "store/authStore";
import usePostStore from "store/postStore";
import { CommentType } from "types/Comment";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "firebase/FirebaseConfig";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authuser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  const handlePostComment = async (postId: string, comment: string) => {
    if (isCommenting) return;
    if (!authuser) {
      showToast("Error", " You must ge logged in to comment", "error");
    }
    setIsCommenting(true);
    const newComment: CommentType = {
      comment: comment,
      createdAt: Date.now(),
      createdBy: authuser!.uid,
      postId: postId,
    };
    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      addComment(postId, newComment);
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
    } finally {
      setIsCommenting(false);
    }
  };
  return { isCommenting, handlePostComment };
};

export default usePostComment;
