import { Button, Image } from "@chakra-ui/react";
import React from "react";
import GoogleLogo from "assets/google.png";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "firebase/FirebaseConfig";
import useShowToast from "hooks/useShowToast";
import useAuthStore from "store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "types/User";
import { useNavigate } from "react-router-dom";
type GoogleAuthProps = {
  prefix: string;
};

const GoogleAuth: React.FC<GoogleAuthProps> = ({ prefix }) => {
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      const userRef = doc(firestore, "users", newUser!.user.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userDoc = userSnapshot.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
      } else {
        const userDoc: User = {
          uid: newUser!.user.uid,
          email: newUser!.user.email!,
          username: newUser!.user.email!.split("@")[0],
          fullName: newUser!.user.displayName!,
          bio: "",
          profilePicURL: newUser!.user.photoURL ? newUser!.user.photoURL : "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser!.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser;
      }
      navigate(0);
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
    }
  };

  return (
    <Button
      w={"full"}
      colorScheme="brand"
      variant={"outline"}
      onClick={handleGoogleAuth}
      isLoading={loading}
    >
      <Image src={GoogleLogo} w={5} mr={5} />
      {prefix} with Google
    </Button>
  );
};
export default GoogleAuth;
