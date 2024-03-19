import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { MouseEventHandler, useState } from "react";

type PasswordFieldProps = {
  placeholder: string;
};

const PasswordField: React.FC<PasswordFieldProps> = ({ placeholder }) => {
  const [showInput, setShowInput] = useState<boolean>(false);

  const toggleShowInput: MouseEventHandler<HTMLButtonElement> = () => {
    setShowInput(!showInput);
  };
  return (
    <InputGroup>
      <Input placeholder={placeholder} type={showInput ? "text" : "password"} />
      <InputRightElement>
        <IconButton
          onClick={toggleShowInput}
          aria-label="show"
          colorScheme="gray"
          variant={"ghost"}
          icon={showInput ? <ViewOffIcon /> : <ViewIcon />}
        />
      </InputRightElement>
    </InputGroup>
  );
};
export default PasswordField;
