import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Flex,
  Text,
  Button,
  Skeleton,
  Icon,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Image,
  Circle,
} from "@chakra-ui/react";
import useLogout from "hooks/useLogout";
import { useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import useAuthStore from "store/authStore";
import Logo from "assets/Logo.svg";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  return (
    <>
      <DesktopMenu />
      <MobileMenu />
    </>
  );
};

export default ProfileMenu;

const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef<any>();
  const { handleLogout } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser)
    return (
      <Skeleton
        boxSize={"40px"}
        display={{ base: "block", md: "none" }}
        borderRadius={"md"}
      />
    );

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label=""
        icon={<HamburgerIcon />}
        variant={"outline"}
        display={{ base: "block", md: "none" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={ref}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Flex h={"56px"} align={"center"} justify={"center"}>
            <Image src={Logo} boxSize={"50px"} />
          </Flex>
          <DrawerBody as={Flex} direction={"column"} gap={"20px"} pt={"20px"}>
            <Flex
              bgColor={"brand.100"}
              borderRadius={"md"}
              gap={"5px"}
              direction={"column"}
              p={"10px"}
              justify={"center"}
              align="center"
            >
              <Circle border={"6px solid"} borderColor={"white"}>
                <Avatar
                  boxSize={"95px"}
                  src={authUser?.profilePicURL}
                  name={authUser?.fullName}
                />
              </Circle>
              <Text ml={1} fontSize={22} color={"black"}>
                {authUser?.fullName}
              </Text>
            </Flex>
            <Button
              as={Link}
              to={authUser?.username}
              size={"lg"}
              leftIcon={<Icon boxSize={"25px"} as={AiOutlineUser} />}
              w={"full"}
              onClick={onClose}
            >
              View Profile
            </Button>
          </DrawerBody>
          <DrawerFooter>
            <Button
              leftIcon={<Icon boxSize={"25px"} as={IoLogOutOutline} />}
              w={"full"}
              variant="outline"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const DesktopMenu = () => {
  const authUser = useAuthStore((state) => state.user);
  const { handleLogout } = useLogout();

  if (!authUser) {
    return <Skeleton height="43px" w={"100px"} borderRadius={"full"} />;
  }

  return (
    <Menu>
      <Flex
        display={{ base: "none", md: "flex" }}
        as={MenuButton}
        p={2}
        borderRadius={"full"}
        border={"1px solid"}
        borderColor={"brand.600"}
        color={"brand.600"}
        _hover={{
          borderColor: "brand.300",
          color: "brand.300",
        }}
      >
        <Flex align="center">
          <Avatar
            boxSize={"25px"}
            src={authUser?.profilePicURL}
            name={authUser?.fullName}
          />
          <Text
            display={{ base: "none", lg: "block" }}
            ml={1}
            fontSize={14}
            color={"black"}
          >
            {authUser?.fullName}
          </Text>
          <ChevronDownIcon boxSize={"20px"} ml={1} />
        </Flex>
      </Flex>
      <MenuList display={{ base: "none", md: "block" }}>
        <MenuItem
          as={Link}
          to={authUser?.username}
          icon={<Icon as={AiOutlineUser} boxSize={"25px"} />}
        >
          View Profile
        </MenuItem>
        <MenuItem
          icon={<Icon as={IoLogOutOutline} boxSize={"25px"} />}
          onClick={handleLogout}
        >
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
