import { Flex, Image, Text, Container } from "@chakra-ui/react";
import Logo from "assets/Logo.svg";
import CreatePost from "components/Auth/CreatePost";
import ProfileMenu from "components/Auth/ProfileMenu";
import SearchUser from "components/SuggestedUsers/SearchUser";

import { auth } from "firebase/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Flex bg={"bg"} zIndex={1} top={0} position={"fixed"} w={"full"}>
      <Container maxW={"container.xl"}>
        <Flex justify={"space-between"} h={"56px"} align={"center"}>
          {pathname !== "/auth" && (
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
          )}
          <Flex flexGrow={1} maxW={{ base: "500px", md: "600px" }}>
            {user && !loading && (
              <>
                <SearchUser />
                <CreatePost />
              </>
            )}
          </Flex>
          {user && !loading && <ProfileMenu />}
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
