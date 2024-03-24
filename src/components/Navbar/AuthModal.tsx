import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <Button onClick={onOpen} variant={"ghost"}>
        Log In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Logo Here</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={"20px"}>
            <VStack spacing={"10px"}>
              {isLogin ? <Login /> : <Signup />}

              <Flex justify={"center"} align={"center"}>
                <Text fontSize={14} mx={2}>
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;

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
