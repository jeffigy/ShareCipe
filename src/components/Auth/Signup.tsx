import { Input, Button } from "@chakra-ui/react";
import PasswordField from "components/PasswordField";

const Signup = () => {
  return (
    <>
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <PasswordField placeholder="Password" />
      <PasswordField placeholder="Confirm Password" />
      <Button w={"full"}>Sign Up</Button>
    </>
  );
};

export default Signup;
