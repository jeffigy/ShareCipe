import Layout from "components/Layouts/Layout";
import Landing from "pages/Landing";
import NotFound from "pages/NotFound";
import Profile from "pages/Profile";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path=":username" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
