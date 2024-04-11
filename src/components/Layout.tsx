import { Flex } from "@chakra-ui/react";

import Navbar from "./Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "firebase/FirebaseConfig";
import { useEffect } from "react";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    async function getLoader() {
      const { jelly } = await import("ldrs");
      jelly.register();
    }
    getLoader();
  }, []);

  const [user, loading] = useAuthState(auth);

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <Flex direction={"column"} minH={"100vh"}>
      <Navbar />
      <Flex flexGrow={1} mt={"56px"}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;

const Footer = () => {
  return (
    <Flex h={"56px"} justify={"center"} align={"center"}>
      © 2024 ShareCipe. All rights reserved
    </Flex>
  );
};

const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir="column"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <l-jelly color="#9a2119" speed="1" size="80"></l-jelly>
    </Flex>
  );
};
