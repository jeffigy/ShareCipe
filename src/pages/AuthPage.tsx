import { Image, Container, Flex, Text } from "@chakra-ui/react";
import AuthForm from "components/Auth/AuthForm";
import Logo from "assets/Logo.svg";
const AuthPage = () => {
  return (
    <Flex minH={"full"} justify={"center"} align={"center"} w={"full"} px={4}>
      <Container maxW={"container.lg"} p={0} w={"full"}>
        <Flex
          justify={"center"}
          align={"center"}
          gap={{ md: "50px", lg: "100px", xl: "150px" }}
        >
          <Flex
            justify="center"
            direction={"column"}
            display={{ base: "none", md: "flex" }}
          >
            <Image src={Logo} h={270} alt="Phone img" />
            <Text color={"gray.600"} fontSize={"20px"}>
              Savor the flavor of sharing with ShareCipe.
            </Text>
          </Flex>

          <AuthForm />
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
