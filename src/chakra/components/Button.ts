import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const ghost = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    _hover: {
      background: "none",
    },
    _active: {
      background: "none",
      color: `${c}.400`,
    },
  };
});

const ButtonTheme = defineStyleConfig({
  variants: { ghost },
  defaultProps: {
    colorScheme: "brand",
  },
});

export default ButtonTheme;
