import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "store/authStore";
import useUserProfileStore from "store/userProfileStore";
import { useLocation } from "react-router-dom";
import { Post } from "types/Post";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import usePostStore from "store/postStore";

type Inputs = {
  title: string;
  description: string;
};

const useCreatePost = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  //   const addPost = useUserProfileStore((state) => state.addPost);
  //   const userProfile = useUserProfileStore((state) => state.userProfile);
  const { addPost, userProfile } = useUserProfileStore();
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile: any, inputs: Inputs) => {
    if (isLoading) return;
    if (!selectedFile || !inputs.title)
      throw new Error("Title and Image are required");
    setIsLoading(true);

    const newPost: Post = {
      title: inputs.title,
      description: inputs.description,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser?.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser!.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile?.uid === authUser?.uid) {
        createPost({ ...newPost, id: postDocRef.id });
      }

      if (pathname !== "/" && userProfile?.uid === authUser?.uid) {
        addPost({ ...newPost, id: postDocRef.id });
      }

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
};

export default useCreatePost;
