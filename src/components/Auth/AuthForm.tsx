import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Box
      borderRadius={"md"}
      bgColor={"white"}
      padding={"20px"}
      w={"100%"}
      maxW={"400px"}
    >
      <VStack spacing={"15px"} w={"full"}>
        {isLogin ? <Login /> : <Signup />}

        <Flex justify={"center"} align={"center"}>
          <Text fontSize={14} mx={2}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Text>
          <Button
            variant={"ghost"}
            fontSize={14}
            fontWeight={"normal"}
            p={0}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </Button>
        </Flex>

        <OtherOptions />

        <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
      </VStack>
    </Box>
  );
};

export default AuthForm;

const OtherOptions = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      my={4}
      gap={1}
      w={"full"}
    >
      <Box flex={2} h={"1px"} bg={"gray.400"} />
      <Text mx={1} color={"gray.400"}>
        or
      </Text>
      <Box flex={2} h={"1px"} bg={"gray.400"} />
    </Flex>
  );
};
