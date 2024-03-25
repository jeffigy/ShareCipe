import {
  Button,
  CloseButton,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import useCreatePost from "hooks/useCreatePost";
import usePreviewImg from "hooks/usePreviewImg";
import useShowToast from "hooks/useShowToast";
import { useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setinputs] = useState({
    title: "",
    description: "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, inputs);
      onClose();
      setinputs({ title: "", description: "" });
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", (error as Error).message, "error");
    }
  };

  return (
    <>
      <Button
        display={{ base: "none", md: "inline-flex" }}
        leftIcon={<Icon as={CiSquarePlus} boxSize={"25px"} />}
        variant={"ghost"}
        onClick={onOpen}
      >
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody as={Stack} spacing={"10px"} py={"20px"}>
            <Input
              placeholder="Title"
              value={inputs.title}
              onChange={(e) => setinputs({ ...inputs, title: e.target.value })}
            />
            <Textarea
              placeholder="description"
              value={inputs.description}
              onChange={(e) =>
                setinputs({ ...inputs, description: e.target.value })
              }
            />
            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            {!selectedFile && (
              <IconButton
                onClick={() => imageRef.current?.click()}
                aria-label="add-photo"
                variant="ghost"
                icon={<Icon as={BiImageAdd} boxSize={"40px"} />}
              />
            )}

            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt="Selected img" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                />
              </Flex>
            )}
            <Flex justify={"flex-end"}>
              <Button onClick={handlePostCreation} isLoading={isLoading}>
                Post
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
