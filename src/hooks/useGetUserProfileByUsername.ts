import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useUserProfileStore from "store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "firebase/FirebaseConfig";

const useGetUserProfileByUsername = (username: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return setUserProfile(null);

        let userDoc;

        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });
        setUserProfile(userDoc);
      } catch (error) {
        showToast("Error", (error as Error).message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
