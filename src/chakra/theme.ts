import { extendTheme } from "@chakra-ui/react";
const colors = {
  brand: {
    50: "#ffe6e5",
    100: "#f9bfbc",
    200: "#ef9791",
    300: "#e66e65",
    400: "#de463b",
    500: "#c42c21",
    600: "#9a2119",
    700: "#6e1611",
    800: "#440c08",
    900: "#1e0100",
  },
  bg: "#fcf4f0",
};

const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        bg: "bg",
      },
    },
  },
});

export default theme;
