import {
  useDisclosure,
  Flex,
  InputGroup,
  Box,
  Input,
  InputRightElement,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import useAuthStore from "store/authStore";
import { Post } from "types/Post";
import { timeAgo } from "utils/timeAgo";
import { GoHeart, GoHeartFill, GoComment } from "react-icons/go";
import useLikePost from "hooks/useLikePost";
import usePostComment from "hooks/usePostComment";
import CommentsModal from "components/Modals/CommentsModal";
type PostFooterProps = {
  post: Post;
  isProfilePage: boolean;
  creatorProfile?: any;
};
const PostFooter: React.FC<PostFooterProps> = ({
  isProfilePage,
  post,
  creatorProfile,
}) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef<HTMLInputElement | null>(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitComment = async () => {
    await handlePostComment(post.id!, comment);
    setComment("");
  };
  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <GoHeart /> : <GoHeartFill color="red" />}
        </Box>

        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current?.focus()}
        >
          <GoComment />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize="12" color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontSize="sm" fontWeight={700}>
            {creatorProfile?.username}{" "}
            <Text as="span" fontWeight={400}>
              {post.title}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              fontSize="sm"
              color={"gray"}
              cursor={"pointer"}
              onClick={onOpen}
            >
              View all {post.comments.length} comments
            </Text>
          )}
          {/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
          {isOpen ? (
            <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
          ) : null}
        </>
      )}

      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                variant={"ghost"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};
export default PostFooter;
