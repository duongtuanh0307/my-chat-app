import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../theme";

type PropsTypes = {
  onClick?: (e: React.SyntheticEvent) => void;
  children: React.ReactNode;
  className?: string;
  value?: "profile" | "chat" | "contacts" | "setting";
} & { opening?: boolean };

const MenuItemUnstyled: FC<PropsTypes> = ({
  children,
  className,
  value,
  onClick,
  opening,
}) => {
  return (
    <button
      value={value}
      className={`${className} ${opening && "opened"} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const MenuItem = styled(MenuItemUnstyled)`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border: none;
  background-color: transparent;
  padding: 0.5rem;
  margin: 0.5rem;
  &:focus {
    outline-color: transparent;
  }
  &.opened {
    outline-color: transparent;
    svg {
      color: ${theme.colorPallet.primary};
      font-weight: 600;
      width: 32px;
      height: 32px;
    }
  }
  & > * {
    pointer-events: none;
  }
`;

export default MenuItem;
