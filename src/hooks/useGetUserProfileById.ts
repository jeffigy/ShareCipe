import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/FirebaseConfig";

const useGetUserProfileById = (userId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<DocumentData | null>(null);

  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        showToast("Error", (error as Error).message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [showToast, setUserProfile, userId]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
