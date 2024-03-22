import {
  Avatar,
  Button,
  Circle,
  Container,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();

  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        gap={{ base: 4, sm: 10 }}
        py={10}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Circle border={"10px solid"} borderColor={"white"}>
          <Avatar size={{ base: "xl", md: "2xl" }} />
        </Circle>

        <VStack align={"start"} gap={2} mx={"auto"} flex={1}>
          <Flex
            gap={4}
            direction={{ base: "column", sm: "row" }}
            justify={{ base: "center", sm: "flex-start" }}
            align={"center"}
            w={"full"}
          >
            <Text fontSize={{ base: "sm", md: "lg" }}>username</Text>
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                size={{ base: "xs", md: "sm" }}
                // onClick={onOpen}
              >
                Edit Profile
              </Button>
            </Flex>
          </Flex>
          <Flex align={"center"} gap={{ base: 2, sm: 4 }}>
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as="span" fontWeight={"bold"} mr={1}>
                {/* {userProfile.posts.length} */} 1000
              </Text>
              Posts
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as="span" fontWeight={"bold"} mr={1}>
                {/* {userProfile.followers.length} */} 1000
              </Text>
              Followers
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as="span" fontWeight={"bold"} mr={1}>
                {/* {userProfile.following.length} */} 1000
              </Text>
              Following
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {/* {userProfile.fullName} */} John Doe
            </Text>
          </Flex>
        </VStack>
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        direction={"column"}
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
          </TabList>
          <Divider />
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
};

export default Profile;
