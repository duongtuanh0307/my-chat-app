import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../theme";

type PropsTypes = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  type?: "submit" | "button" | "reset";
};

export const Button: FC<PropsTypes> = ({
  onClick,
  disabled,
  className,
  children,
  width,
  height,
  type,
}) => (
  <button
    className={className}
    disabled={disabled}
    onClick={onClick}
    type={type}
    attr-width={width}
    attr-height={height}
  >
    {children}
  </button>
);

export const StyledButton = styled(Button).attrs((props) => ({
  width: props.width || "calc(100% - 2rem)",
  height: props.height || "40px",
}))`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  text-align: center;
  vertical-align: center;
  border-radius: 5px;
  border: none;
  margin: 1rem;
`;

export const PrimaryButton = styled(StyledButton)`
  color: ${theme.colorPallet.white};
  background-color: ${theme.colorPallet.primary};
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background-color: ${theme.colorPallet.blue};
  }
`;

//Action Button:
const StyledActionButton = styled.button`
  border: none;
  background-color: transparent;
  z-index: 100;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: transparent;
  }
  & > * {
    pointer-events: none;
  }
`;

export const ActionButton: FC<{
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ className, onClick, children }) => (
  <StyledActionButton onClick={onClick} className={className}>
    {children}
  </StyledActionButton>
);
