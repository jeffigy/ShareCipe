import { Button, Image } from "@chakra-ui/react";
import React from "react";
import GoogleLogo from "assets/google.png";
type GoogleAuthProps = {
  prefix: string;
};

const GoogleAuth: React.FC<GoogleAuthProps> = ({ prefix }) => {
  return (
    <Button w={"full"} colorScheme="brand" variant={"outline"}>
      <Image src={GoogleLogo} w={5} mr={5} />
      {prefix} with Google
    </Button>
  );
};
export default GoogleAuth;
