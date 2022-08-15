import React, { ReactElement } from "react";
import styled from "styled-components";

type ButtonFunctionalComponent = {
  (props: { children: string }): ReactElement;
};

const ButtonComponent: ButtonFunctionalComponent = ({ children }) => {
  return <BasicButton disabled>{children}</BasicButton>;
};

export default ButtonComponent;

const BasicButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: dodgerblue;
  color: blue;
  border: none;
  border-radius: 10px;
  font-size: 1.5rem;
`;
