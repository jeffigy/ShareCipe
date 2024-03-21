import { Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
import PasswordField from "components/PasswordField";
import useLogin from "hooks/useLogin";
import { useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { loading, error, login } = useLogin();

  return (
    <>
      <Input
        placeholder="Email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <PasswordField
        placeholder="Password"
        value={inputs.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputs({ ...inputs, password: e.target.value })
        }
      />
      <Button
        size={"sm"}
        textDecoration={"underline"}
        alignSelf={"end"}
        variant={"ghost"}
        style={{
          padding: 0,
        }}
        _hover={{
          bgColor: "none",
        }}
      >
        Forgot Password?
      </Button>

      {error && (
        <Alert status="error" p={2} borderRadius={4}>
          <AlertIcon />
          {error.message}
        </Alert>
      )}

      <Button w={"full"} isLoading={loading} onClick={() => login(inputs)}>
        Log In
      </Button>
    </>
  );
};

export default Login;
