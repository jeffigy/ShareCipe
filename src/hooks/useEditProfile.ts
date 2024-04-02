import { useState } from "react";
import useAuthStore from "store/authStore";
import useUserProfileStore from "store/userProfileStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "firebase/FirebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type EditInputs = {
  bio: string;
  fullName: string;
  username: string;
};

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const editProfile = async (inputs: EditInputs, selectedFile: any) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    const usersCollectionRef = collection(firestore, "users");
    const q = query(
      usersCollectionRef,
      where("username", "==", inputs.username)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists", "error");
      setIsUpdating(false);
      return;
    }

    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(firestore, "users", authUser.uid);

    let URL = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username.toLowerCase() || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      showToast("Success", "Profile updated successfully", "success");
      navigate("/");
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
