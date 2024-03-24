import {
  Avatar,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useAuthStore from "store/authStore";
import useUserProfileStore from "store/userProfileStore";
import EditProfile from "./EditProfile";
import useFollowUser from "hooks/useFollowUser";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    userProfile!.uid
  );
  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile?.username;
  const visitingAnotherProfileAndAuth =
    authUser && authUser.username !== userProfile?.username;

  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      justifySelf={"center"}
      alignSelf={{ base: "center", md: "flex-start" }}
      flexDirection={{ base: "column", sm: "row" }}
    >
      <Avatar
        alignSelf={"center"}
        style={{
          border: "10px solid",
          borderColor: "white",
        }}
        name={userProfile?.fullName}
        size={{ base: "xl", md: "2xl" }}
        src={userProfile?.profilePicURL}
      />

      <VStack align={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justify={{ base: "center", sm: "flex-start" }}
          align={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile?.username}
          </Text>
          {visitingOwnProfileAndAuth && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button size={{ base: "xs", md: "sm" }} onClick={onOpen}>
                Edit Profile
              </Button>
            </Flex>
          )}
          {visitingAnotherProfileAndAuth && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                size={{ base: "xs", md: "sm" }}
                onClick={handleFollowUser}
                isLoading={isUpdating}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex align={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile?.posts.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile?.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile?.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile?.fullName}
          </Text>
        </Flex>
      </VStack>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ProfileHeader;
