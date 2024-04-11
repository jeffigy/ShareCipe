import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import Comment from "components/Profile/Comment";
import usePostComment from "hooks/usePostComment";
import React, { useEffect, useRef } from "react";
import { Post } from "types/Post";

type CommentsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
};

const CommentsModal: React.FC<CommentsModalProps> = ({
  isOpen,
  onClose,
  post,
}) => {
  const { handlePostComment, isCommenting } = usePostComment();
  const commentRef = useRef<HTMLInputElement | null>(null);
  const commentsContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmitComment = async (e: { preventDefault: () => void }) => {
    // do not refresh the page, prevent it
    e.preventDefault();
    await handlePostComment(post.id!, commentRef.current!.value);
    commentRef.current!.value = "";
  };

  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current!.scrollTop =
        commentsContainerRef.current!.scrollHeight;
    };
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
            ref={commentsContainerRef}
          >
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Flex>
          <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
            <Input placeholder="Comment" size={"sm"} ref={commentRef} />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default CommentsModal;
