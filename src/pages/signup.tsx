import React, { FC } from "react";
import { LoginWrapper } from "./login";
import { Link } from "react-router-dom";
import { InputWithPrepend } from "../components/elements/inputfields";
import { PrimaryButton } from "../components/elements/buttons";
import { StyledForm } from "../components/elements/others";
import {
  DarkText,
  LightTextCentered,
  LightText,
  H4,
  StyledLink,
} from "../components/elements/typographies";
import { UserIcon, LockIcon } from "../icons";
import { useApolloClient } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { AuthContext } from "../auth";
import { useHistory } from "react-router-dom";
import { CHECK_IF_USERNAME_TAKEN } from "../graphql/queries";
import { ErrorMessage } from "../components/elements/typographies";

type FormDataTypes = {
  email: string;
  password: string;
  username: string;
};

const Signup: FC = () => {
  const client = useApolloClient();
  const [error, setError] = React.useState("");
  const history = useHistory();
  const { register, handleSubmit, formState } = useForm<FormDataTypes>({
    mode: "onBlur",
  });
  const {
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
  } = React.useContext(AuthContext);

  async function onSubmit(data: FormDataTypes): Promise<void> {
    try {
      setError("");
      await signUpWithEmailAndPassword(data);
      if (!formState.isSubmitting) {
        await logInWithEmailAndPassword(data.email, data.password);
        setTimeout(() => history.push("/"), 1000);
      }
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error: any) {
    if (error.message.includes("users_username_key")) {
      setError("Username already taken");
    } else {
      setError(error.message);
    }
  }

  async function validateUsername(username: string) {
    const variables = { username };

    const response = await client.query({
      query: CHECK_IF_USERNAME_TAKEN,
      variables,
    });

    return response.data.user.length === 0;
  }

  return (
    <LoginWrapper>
      <H4>Sign up</H4>
      <LightText>Get your account now</LightText>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputWithPrepend
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          label="Email"
          prepend={<UserIcon />}
          inputRef={register({
            required: true,
            validate: (input) => isEmail(input),
          })}
        />
        <InputWithPrepend
          id="username"
          name="username"
          type="text"
          placeholder="Enter username"
          label="Username"
          prepend={<UserIcon />}
          inputRef={register({
            required: true,
            minLength: 5,
            maxLength: 20,
            validate: async (input) => await validateUsername(input),
          })}
        />
        <InputWithPrepend
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          label="Password"
          prepend={<LockIcon />}
          inputRef={register({
            required: true,
            minLength: 6,
          })}
        />
        <PrimaryButton
          type="submit"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          Sign Up
        </PrimaryButton>
        <ErrorMessage>{error}</ErrorMessage>
        <LightTextCentered>
          By regestering you agree to all the
          <StyledLink>
            <Link to="/"> Terms of Use</Link>
          </StyledLink>
        </LightTextCentered>
      </StyledForm>
      <DarkText>
        Already have an account?
        <StyledLink>
          <Link to="/login"> Login</Link>
        </StyledLink>
      </DarkText>
    </LoginWrapper>
  );
};

export default Signup;
