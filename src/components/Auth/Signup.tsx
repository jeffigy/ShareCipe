import { Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
import PasswordField from "components/PasswordField";
import useSignUpWithEmailAndPassword from "hooks/useSignUpWithEmailAndPassword";
import { useState } from "react";
import { RegisterInputs } from "types/Auth";

const Signup = () => {
  const [inputs, setInputs] = useState<RegisterInputs>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  return (
    <>
      <Input
        placeholder="Full Name"
        value={inputs.fullName}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
      />

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
      <PasswordField
        placeholder="Confirm Password"
        value={inputs.confirmPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputs({ ...inputs, confirmPassword: e.target.value })
        }
      />
      {error && (
        <Alert status="error" p={2} borderRadius={4}>
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Button w={"full"} isLoading={loading} onClick={() => signup(inputs)}>
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
