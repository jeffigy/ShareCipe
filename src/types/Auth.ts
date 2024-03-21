export type LoginInputs = {
  email: string;
  password: string;
};

export type RegisterInputs = LoginInputs & {
  confirmPassword: string;
  username: string;
  fullName: string;
};
