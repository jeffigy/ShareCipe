import { Text, Flex, Container, Input, Image } from "@chakra-ui/react";
import AuthModal from "components/Navbar/AuthModal";
import ProfileMenu from "components/Navbar/ProfileMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "firebase/FirebaseConfig";
import Logo from "assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import CreatePost from "components/Navbar/CreatePost";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();
  return (
    <Flex bg={"bg"} zIndex={1} top={0} position={"fixed"} w={"full"}>
      <Container maxW={"container.xl"}>
        <Flex justify={"space-between"} h={"56px"} align={"center"}>
          <Flex
            gap={2}
            alignItems={"center"}
            onClick={() => navigate("/")}
            cursor={"pointer"}
          >
            <Image src={Logo} boxSize={"50px"} display={"block"} />
            <Text fontSize={20} display={{ base: "none", lg: "block" }}>
              ShareCipe
            </Text>
          </Flex>
          <Flex flexGrow={1} maxW={{ base: "500px", md: "600px" }}>
            <Input
              flexGrow={1}
              onClick={() => navigate("search")}
              mx={"20px"}
              bg={"white"}
              placeholder="Search..."
              variant={"unstyle"}
            />
            {user && !loading && <CreatePost />}
          </Flex>
          {!user && !loading && <AuthModal />}
          {user && !loading && <ProfileMenu />}
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
