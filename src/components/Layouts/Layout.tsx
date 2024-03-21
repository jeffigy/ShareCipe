import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
  return (
    <Flex direction={"column"} minH={"100vh"}>
      <Navbar />
      <Flex flexGrow={1} mt={"56px"}>
        <Outlet />
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
