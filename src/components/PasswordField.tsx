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
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [showInput, setShowInput] = useState<boolean>(false);

  const toggleShowInput: MouseEventHandler<HTMLButtonElement> = () => {
    setShowInput(!showInput);
  };
  return (
    <InputGroup>
      <Input
        placeholder={placeholder}
        type={showInput ? "text" : "password"}
        value={value}
        onChange={onChange}
      />
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
