import { Text, Flex, Container, Input } from "@chakra-ui/react";
import AuthModal from "components/Auth/AuthModal";

const Navbar = () => {
  return (
    <Flex bg={"bg"} zIndex={1} top={0} position={"fixed"} w={"full"}>
      <Container maxW={"container.xl"}>
        <Flex justify={"space-between"} h={"56px"} align={"center"}>
          <Text>TastyExchange</Text>
          <Input
            mx={"20px"}
            w={"500px"}
            bg={"white"}
            placeholder="Search..."
            variant={"unstyle"}
          />
          <AuthModal />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
