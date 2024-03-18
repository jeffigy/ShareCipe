import { Avatar, Box, Button, Container, Flex, Input } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <Box minH={"100vh"} w={"full"}>
      <Flex bg={"bg"} zIndex={1} top={0} position={"fixed"} w={"full"}>
        <Container maxW={"container.xl"}>
          <Flex justify={"space-between"} h={"56px"} align={"center"}>
            <Button variant={"ghost"}>Browse</Button>
            <Input
              w={"500px"}
              bg={"white"}
              placeholder="Search..."
              variant={"unstyle"}
            />
            <Avatar />
          </Flex>
        </Container>
      </Flex>
      <Outlet />
    </Box>
  );
};

export default Layout;
