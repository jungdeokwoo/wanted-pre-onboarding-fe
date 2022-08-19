import React, { ReactElement } from "react";
import styled, { css } from "styled-components";

type ButtonFunctionalComponent = {
  (props: { children: string; disabled: boolean }): ReactElement;
};

const ButtonComponent: ButtonFunctionalComponent = ({ children, disabled }) => {
  return <BasicButton disabled={disabled}>{children}</BasicButton>;
};

export default ButtonComponent;

export const BasicButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 10px;
  font-size: 1.5rem;
  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: grey;
        color: white;
      `;
    } else {
      return css`
        background-color: dodgerblue;
        color: black;
        cursor: pointer;
      `;
    }
  }}
`;
