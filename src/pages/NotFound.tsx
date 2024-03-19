import { Link } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6} w={"full"}>
      <Heading display="inline-block" as="h2" size="2xl" color={"brand.600"}>
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Button as={Link} to={"/"}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
