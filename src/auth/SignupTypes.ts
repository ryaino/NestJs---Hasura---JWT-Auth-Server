type Maybe<T> = T | null;

type CreateUserOutput = {
  id: number;
  email: string;
  password: string;
};

type JsonWebToken = {
  token: string;
};

type Mutation = {
  Login?: Maybe<JsonWebToken>;
  Signup?: Maybe<CreateUserOutput>;
};

type LoginArgs = {
  email: string;
  password: string;
};

type SignupArgs = {
  email: string;
  password: string;
};
