import React, { ReactElement, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { UserInfo } from "../pages/Auth/AuthForm";

type InputFuctionalComponent = {
  (props: {
    children: string;
    inputValue: string;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  }): ReactElement;
};

const InputComponent: InputFuctionalComponent = ({
  children,
  inputValue,
  setUserInfo,
}) => {
  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const inputValue = event.target.value;
    setUserInfo((prev) => ({ ...prev, [key]: inputValue }));
  };

  return (
    <InputWrapper>
      <InputBox
        type={children === "password" ? "password" : "text"}
        value={inputValue || ""}
        onChange={(event) => inputHandler(event, children)}
      />
    </InputWrapper>
  );
};

export default InputComponent;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  padding: 15px;
  border-radius: 10px;
  border: none;
  background-color: rgb(225, 225, 225);
  font-size: 1.5rem;
`;
