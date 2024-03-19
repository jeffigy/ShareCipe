import { Input, Button } from "@chakra-ui/react";

const Signup = () => {
  return (
    <>
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Input placeholder="Confirm Password" />
      <Button w={"full"}>Sign Up</Button>
    </>
  );
};

export default Signup;
