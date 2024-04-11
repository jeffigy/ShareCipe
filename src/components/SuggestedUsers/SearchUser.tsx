import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser";
import { useRef } from "react";
import useSearchUser from "hooks/useSearchUser";

const SearchUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef<any>(null);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();

  const handleSearchUser = (e: any) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };
  return (
    <>
      <Input
        onClick={onOpen}
        flexGrow={1}
        mx={"20px"}
        bg={"white"}
        placeholder="Search..."
        variant={"unstyle"}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"400px"}>
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="e.g. john" ref={searchRef} />
              </FormControl>

              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUser user={user} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchUser;
