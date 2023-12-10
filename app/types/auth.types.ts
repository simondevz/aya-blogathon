export type CreateUser = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  as_writer: boolean;
  role: string;
  image: any;
};

export type UserSignup = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
  as_writer: boolean;
};

export type UserLogin = {
  username?: string;
  email?: string;
  password: string;
};

export type decodedTokenType = {
  username: string;
  role: string;
  id: number;
  iat: number;
  exp: number;
};
