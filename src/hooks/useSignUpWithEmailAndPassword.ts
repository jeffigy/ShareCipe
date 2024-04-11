import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "firebase/FirebaseConfig";
import useShowToast from "./useShowToast";
import useAuthStore from "store/authStore";
import { User } from "types/User";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { RegisterInputs } from "types/Auth";
import { useNavigate } from "react-router-dom";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, _user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state: any) => state.login);
  const navigate = useNavigate();

  const signup = async (inputs: RegisterInputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.confirmPassword ||
      !inputs.fullName
    ) {
      showToast("Error", "Please fill all the fields", "error");
    }

    if (inputs.password !== inputs.confirmPassword) {
      showToast("Error", "Password fields do not match", "error");
    }

    const username = inputs.email.split("@")[0];

    const usersRef = collection(firestore, "users");

    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser && error) {
        showToast("Error", (error as Error).message, "error");
        return;
      }

      if (newUser) {
        const userDoc: User = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: username.toLowerCase(),
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        localStorage.setItem("user-info", JSON.stringify(userDoc));

        loginUser(userDoc);

        navigate(0);
      }
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
