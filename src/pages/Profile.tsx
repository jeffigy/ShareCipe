import {
  Container,
  Divider,
  Flex,
  Icon,
  Link,
  Skeleton,
  SkeletonCircle,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CiBookmark, CiGrid41 } from "react-icons/ci";
import useGetUserProfileByUsername from "hooks/useGetUserProfileByUsername";
import ProfileHeader from "components/Profile/ProfileHeader";
import { Link as RouterLink } from "react-router-dom";
const Profile = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username!);

  if (!isLoading && !userProfile) return <UserNotFound />;

  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        direction={"column"}
      >
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        direction={"column"}
      >
        <Tabs
          size={"sm"}
          align="center"
          variant="soft-rounded"
          colorScheme="brand"
        >
          <TabList mb={1}>
            <Tab>
              {" "}
              <Icon as={CiGrid41} boxSize={"25px"} mr={1} />
              Posts{" "}
            </Tab>
            <Tab>
              {" "}
              <Icon as={CiBookmark} boxSize={"25px"} mr={1} />
              Saved
            </Tab>
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

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size="24" />

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go home
      </Link>
    </Flex>
  );
};
