import React, { ReactElement, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export type InputStringValue = { [key in string]: string };

type InputFuctionalComponent = {
  (props: {
    children: string;
    inputValue: string;
    setStateValue: Dispatch<SetStateAction<InputStringValue>>;
  }): ReactElement;
};

const InputComponent: InputFuctionalComponent = ({
  children,
  inputValue,
  setStateValue,
}) => {
  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const inputValue = event.target.value;
    setStateValue((prev: InputStringValue) => ({
      ...prev,
      [key]: inputValue,
    }));
  };

  return (
    <InputBox
      type={children === "password" ? "password" : "text"}
      value={inputValue || ""}
      onChange={(event) => inputHandler(event, children)}
    />
  );
};

export default InputComponent;

export const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  padding: 15px;
  border-radius: 10px;
  border: none;
  background-color: rgb(225, 225, 225);
  font-size: 1.5rem;
`;
