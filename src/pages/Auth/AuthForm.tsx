import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import styled from "styled-components";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";

export interface UserInfo {
  email: string;
  password: string;
}

type AuthFormComponent = {
  (props: {
    children: string;
    isSignIn: boolean;
    setIsSignIn: Dispatch<SetStateAction<boolean>>;
  }): ReactElement;
};

const AuthForm: AuthFormComponent = ({ children, isSignIn, setIsSignIn }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  const changeForm = () => {
    setIsSignIn(!isSignIn);
    setUserInfo({} as UserInfo);
  };

  return (
    <>
      <AuthTitle>{children}</AuthTitle>
      <InputWrapper>
        <EmailWrapper>
          <InputTitle>이메일</InputTitle>
          <InputComponent inputValue={userInfo.email} setUserInfo={setUserInfo}>
            email
          </InputComponent>
        </EmailWrapper>
        <PasswordWrapper>
          <InputTitle>패스워드</InputTitle>
          <InputComponent
            inputValue={userInfo.password}
            setUserInfo={setUserInfo}
          >
            password
          </InputComponent>
        </PasswordWrapper>
      </InputWrapper>
      {isSignIn ? (
        <ButtonWrapper>
          <SignInButton>로그인</SignInButton>
          <SignupMessage>
            회원이 아니신가요?{" "}
            <SignupText onClick={changeForm}>회원가입</SignupText>
          </SignupMessage>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <SignInButton>회원가입</SignInButton>
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

const SignInButton = styled(ButtonComponent)``;

const SignupText = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;
