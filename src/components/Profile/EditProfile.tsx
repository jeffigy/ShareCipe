import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import useEditProfile from "hooks/useEditProfile";
import usePreviewImg from "hooks/usePreviewImg";
import useShowToast from "hooks/useShowToast";
import React, { useRef, useState } from "react";
import useAuthStore from "store/authStore";

type EditProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditProfile: React.FC<EditProfileProps> = ({ isOpen, onClose }) => {
  const [inputs, setinputs] = useState({
    fullName: "",
    username: "",
    bio: "",
  });
  const authUser = useAuthStore((state) => state.user);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const { isUpdating, editProfile } = useEditProfile();
  const showToast = useShowToast();

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Stack} spacing={"10px"} py={"20px"}>
          <FormControl>
            <Stack as={Center} spacing={"5px"}>
              <Avatar
                size={"xl"}
                src={selectedFile || authUser?.profilePicURL}
              />
              <Button
                size={"sm"}
                onClick={() => fileRef.current?.click()}
                borderRadius={"full"}
                variant={"outline"}
              >
                Change Photo
              </Button>
              <Input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleImageChange}
              />
            </Stack>
          </FormControl>

          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              value={inputs.fullName || authUser?.fullName}
              onChange={(e) =>
                setinputs({ ...inputs, fullName: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={inputs.username || authUser?.username}
              onChange={(e) =>
                setinputs({ ...inputs, username: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              value={inputs.bio || authUser?.bio}
              onChange={(e) => setinputs({ ...inputs, bio: e.target.value })}
            />
          </FormControl>

          <Flex w={"full"}>
            <Button
              w={"full"}
              onClick={onClose}
              colorScheme="gray"
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              w={"full"}
              onClick={handleEditProfile}
              isLoading={isUpdating}
            >
              Submit
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default EditProfile;
