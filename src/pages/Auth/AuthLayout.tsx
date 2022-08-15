import React, { useState } from "react";
import styled from "styled-components";
import AuthForm from "./AuthForm";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  return (
    <>
      {localStorage.getItem("token") && <Navigate to={"/todo"} replace />}
      <FormWrapper>
        {isSignIn ? (
          <AuthForm isSignIn={isSignIn} setIsSignIn={setIsSignIn}>
            로그인
          </AuthForm>
        ) : (
          <AuthForm isSignIn={isSignIn} setIsSignIn={setIsSignIn}>
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
