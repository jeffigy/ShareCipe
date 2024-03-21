import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "firebase/FirebaseConfig";
import useAuthStore from "store/authStore";
import { LoginInputs } from "types/Auth";
import { doc, getDoc } from "firebase/firestore";
import { User } from "types/User";

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, _user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs: LoginInputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill all the fields", "error");
    }

    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnapshot = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnapshot.data()));
        loginUser(docSnapshot.data() as User);
      }
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
    }
  };
  return { loading, error, login };
};

export default useLogin;
