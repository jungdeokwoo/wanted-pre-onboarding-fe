import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
  useMemo,
} from "react";
import styled from "styled-components";
import InputComponent from "../../components/InputComponent";
import { BasicButton } from "../../components/ButtonComponent";
import FetchApi from "../../utils/FetchApi";
import { configURL } from "../../config";
import { useNavigate } from "react-router-dom";
import { InputStringValue } from "../../components/InputComponent";

export interface UserInfo {
  email: string;
  password: string;
}

type AuthFormComponent = {
  (props: {
    children: string;
    isSignIn: boolean;
    setIsSignIn: Dispatch<SetStateAction<boolean>>;
    setErrorMessage: Dispatch<SetStateAction<string>>;
  }): ReactElement;
};

const AuthForm: AuthFormComponent = ({
  children,
  isSignIn,
  setIsSignIn,
  setErrorMessage,
}) => {
  const [userInfo, setUserInfo] = useState<InputStringValue>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const FetchAuth = FetchApi();

  const isValidUserInfo = useMemo(() => {
    if (userInfo.email !== undefined && userInfo.password !== undefined) {
      return (
        userInfo.email?.includes("@") &&
        userInfo.email?.includes(".") &&
        userInfo.password.length >= 8
      );
    }
  }, [userInfo.email, userInfo.password]);

  const changeForm = () => {
    setIsSignIn(!isSignIn);
    setUserInfo({} as InputStringValue);
    setErrorMessage("");
  };

  const signInHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const response = await FetchAuth.post(configURL.signIn, userInfo);
    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.access_token);
      navigate("/todo", { replace: true });
    } else {
      const result = await response.json();
      if (result.message === "Unauthorized") {
        setErrorMessage(`비밀번호를 다시 확인해주세요`);
      } else {
        setErrorMessage(`${result.message}`);
      }
    }
  };

  const signUpHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const response = await FetchAuth.post(configURL.signUp, userInfo);
    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.access_token);
      navigate("/todo", { replace: true });
    } else {
      const result = await response.json();
      setErrorMessage(`${result.message}`);
    }
  };

  return (
    <>
      <AuthTitle>{children}</AuthTitle>
      <InputWrapper>
        <EmailWrapper>
          <InputTitle>이메일</InputTitle>
          <InputComponent
            inputValue={userInfo.email}
            setStateValue={setUserInfo}
          >
            email
          </InputComponent>
        </EmailWrapper>
        <PasswordWrapper>
          <InputTitle>패스워드</InputTitle>
          <InputComponent
            inputValue={userInfo.password}
            setStateValue={setUserInfo}
          >
            password
          </InputComponent>
        </PasswordWrapper>
      </InputWrapper>
      {isSignIn ? (
        <ButtonWrapper>
          <SignInButton
            onClick={(event) => signInHandler(event)}
            disabled={!isValidUserInfo}
          >
            로그인
          </SignInButton>
          <SignupMessage>
            회원이 아니신가요?{" "}
            <SignupText onClick={changeForm}>회원가입</SignupText>
          </SignupMessage>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <SignUpButton
            onClick={(event) => signUpHandler(event)}
            disabled={!isValidUserInfo}
          >
            회원가입
          </SignUpButton>
          <SignupText onClick={changeForm}>로그인화면으로 돌아가기</SignupText>
        </ButtonWrapper>
      )}
    </>
  );
};

export default AuthForm;

const AuthTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  font-size: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2.5;
  width: 100%;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 1;
  width: 100%;
`;

const PasswordWrapper = styled(EmailWrapper)``;

const InputTitle = styled.p`
  font-size: 1.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 2;
  width: 100%;
  border-radius: 10px;
`;

const SignupMessage = styled.p`
  font-size: 1rem;
`;

const SignInButton = styled(BasicButton)``;

const SignUpButton = styled(BasicButton)``;

const SignupText = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;
