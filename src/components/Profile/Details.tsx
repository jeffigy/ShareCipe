import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Post } from "types/Post";
import "index.css";
type DetailsProps = {
  post: Post;
};

const Details: React.FC<DetailsProps> = ({ post }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Flex
        direction={"column"}
        pt={5}
        w={"full"}
        gap={5}
        // className="custom-scrollbar"
      >
        <Text fontWeight={"bold"} fontSize={15}>
          {post.title}
        </Text>

        <div
          style={{
            textAlign: "justify",
          }}
        >
          <Text fontSize={15}>
            {showMore ? post.description : post.description.substring(0, 250)}
            {post.description.length > 250 && (
              <Button
                ml={1}
                variant={"outline"}
                size={"xs"}
                onClick={() => setShowMore(!showMore)}
                borderRadius={"full"}
              >
                {showMore ? "Show less" : "Show more"}
              </Button>
            )}
          </Text>
        </div>
      </Flex>
    </>
  );
};
export default Details;
