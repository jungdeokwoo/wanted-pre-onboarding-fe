import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import AuthForm from "./AuthForm";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>(``);

  useEffect(() => {
    !!errorMessage === true &&
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
  }, [errorMessage]);

  return (
    <>
      {localStorage.getItem("token") && <Navigate to={"/todo"} replace />}
      <FormWrapper>
        <ErrorMassage isError={!!errorMessage}>{errorMessage}</ErrorMassage>
        {isSignIn ? (
          <AuthForm
            isSignIn={isSignIn}
            setIsSignIn={setIsSignIn}
            setErrorMessage={setErrorMessage}
          >
            로그인
          </AuthForm>
        ) : (
          <AuthForm
            isSignIn={isSignIn}
            setIsSignIn={setIsSignIn}
            setErrorMessage={setErrorMessage}
          >
            회원가입
          </AuthForm>
        )}
      </FormWrapper>
    </>
  );
};

export default AuthLayout;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 500px;
  margin: 100px auto;
  padding: 0 30px;
  border: 2px solid rgb(200, 200, 200);
  border-radius: 20px;
`;

const ErrorMassage = styled.p<{ isError: boolean }>`
  position: absolute;
  bottom: 100%;
  right: 0;
  ${({ isError }) => {
    if (isError) {
      return css`
        transform: translateY(40px);
      `;
    } else {
      return css``;
    }
  }}
  width: 500px;
  height: 40px;
  padding-left: 30px;
  font-size: 1.5rem;
  line-height: 40px;
  background-color: red;
  color: white;
  transition: all 0.3s ease;
`;
