import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { InputWithPrepend } from "../components/elements/inputfields";
import { PrimaryButton } from "../components/elements/buttons";
import { StyledForm } from "../components/elements/others";
import {
  DarkText,
  LightText,
  H4,
  StyledLink,
} from "../components/elements/typographies";
import { UserIcon, LockIcon } from "../icons";
import theme from "../theme";
import isEmail from "validator/lib/isEmail";
import { AuthContext } from "../auth";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../components/elements/typographies";

export const LoginWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colorPallet.lightBackground};
  padding: 100px 0px 0px 0px;
  margin: 0;
`;

type FormDataTypes = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { logInWithEmailAndPassword } = React.useContext(AuthContext);
  const [error, setError] = React.useState<string>("");
  const { register, handleSubmit, formState } = useForm<FormDataTypes>({
    mode: "onBlur",
  });
  const history = useHistory();

  async function onSubmit(data: FormDataTypes) {
    try {
      setError("");
      await logInWithEmailAndPassword(data.email, data.password);
      if (!formState.isSubmitting) setTimeout(() => history.push("/"), 1000);
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <LoginWrapper>
      <H4>Login</H4>
      <LightText>Login to continue to this app</LightText>
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
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          label="Password"
          prepend={<LockIcon />}
          inputRef={register({
            required: true,
            minLength: 5,
            maxLength: 20,
          })}
        />
        <PrimaryButton>Log In</PrimaryButton>
        <ErrorMessage>{error}</ErrorMessage>
      </StyledForm>
      <DarkText>
        Do you have an account?
        <StyledLink>
          <Link to="/signup"> Signup now </Link>
        </StyledLink>
      </DarkText>
    </LoginWrapper>
  );
};

export default Login;
