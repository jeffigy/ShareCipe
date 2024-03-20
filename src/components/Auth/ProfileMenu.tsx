import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";

const ProfileMenu = () => {
  return (
    <Menu>
      <MenuButton cursor={"pointer"} as={Avatar} size={"md"}></MenuButton>
      <MenuList border={"none"}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Log out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
