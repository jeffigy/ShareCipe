import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "firebase/FirebaseConfig";
import useShowToast from "./useShowToast";
import useAuthStore from "store/authStore";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
      navigate("/");
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
    }
  };

  return { handleLogout, isLoggingOut, error };
};

export default useLogout;
