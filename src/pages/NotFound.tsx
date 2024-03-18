import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
const NotFound = () => {
  return (
    <div>
      error 404, the page you are looking is not found{" "}
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue"}
        textDecoration={"underline"}
      >
        return home
      </Link>{" "}
    </div>
  );
};

export default NotFound;
