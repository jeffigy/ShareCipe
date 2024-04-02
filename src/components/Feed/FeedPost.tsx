import { Box, Card, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Post } from "types/Post";

type FeedPostProps = {
  post: Post;
};

const FeedPost: React.FC<FeedPostProps> = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy!);

  return (
    <Box p={"10px"} bg={"white"} borderRadius={"lg"}>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={"lg"} overflow={"hidden"}>
        <Image src={post.imageURL} alt={"FEED POST IMG"} />
      </Box>
      <PostFooter
        isProfilePage={false}
        post={post}
        creatorProfile={userProfile}
      />
    </Box>
  );
};

export default FeedPost;
