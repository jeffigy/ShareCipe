import { Input, Button } from "@chakra-ui/react";

const Login = () => {
  return (
    <>
      <Input placeholder="Email" />

      <Input placeholder="Password" />
      <Button
        size={"sm"}
        textDecoration={"underline"}
        alignSelf={"end"}
        variant={"ghost"}
        style={{
          padding: 0,
        }}
        _hover={{
          bgColor: "none",
        }}
      >
        Forgot Password?
      </Button>

      <Button w={"full"}>Log In</Button>
    </>
  );
};

export default Login;
