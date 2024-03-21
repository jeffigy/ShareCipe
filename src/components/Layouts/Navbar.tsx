import { Text, Flex, Container, Input, Image } from "@chakra-ui/react";
import AuthModal from "components/Auth/AuthModal";
import ProfileMenu from "components/Auth/ProfileMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "firebase/FirebaseConfig";
import Logo from "assets/Logo.svg";
const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <Flex bg={"bg"} zIndex={1} top={0} position={"fixed"} w={"full"}>
      <Container maxW={"container.xl"}>
        <Flex justify={"space-between"} h={"56px"} align={"center"}>
          <Flex gap={2} alignItems={"center"}>
            <Image src={Logo} boxSize={"50px"} />
            <Text fontSize={20} display={{ base: "none", lg: "block" }}>
              ShareCipe
            </Text>
          </Flex>
          <Input
            mx={"20px"}
            w={"500px"}
            bg={"white"}
            placeholder="Search..."
            variant={"unstyle"}
          />
          {!user && !loading && <AuthModal />}
          {user && !loading && <ProfileMenu />}
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
