import Layout from "components/Layout";
import { auth } from "firebase/FirebaseConfig";
import AuthPage from "pages/AuthPage";
import HomePage from "pages/HomePage";
import NotFound from "pages/NotFound";
import ProfilePage from "pages/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const [authUser] = useAuthState(auth);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to={"/"} />}
        />

        <Route path="/:username" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
