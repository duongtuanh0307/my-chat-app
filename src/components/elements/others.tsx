import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../theme";

//styled-form
export const Form: FC<{
  children: React.ReactNode;
  className?: string;
  onSubmit?: any;
}> = ({ className, children, onSubmit }) => (
  <form className={className} onSubmit={onSubmit}>
    {children}
  </form>
);

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  padding: 2rem 1rem 3rem;
  margin: 1.5rem 0 3rem 0;
  min-width: 400px !important;
  max-width: 600px !important;
  background-color: ${theme.colorPallet.white};
  border-radius: 5px;
`;

// Action Menu

const ActionMenuUnstyled: FC<{
  open: boolean;
  className?: string;
}> = ({ className, open = false, children }) => (
  <div className={`${className} ${open && "opened"}`}>{children}</div>
);

const ActionMenuItemUnstyled: FC<{
  onClick?: () => void;
  className?: string;
}> = ({ onClick, className, children }) => (
  <div className={className} onClick={onClick}>
    {children}
  </div>
);

export const ActionMenu = styled(ActionMenuUnstyled)`
  display: none;
  border: 1px solid ${theme.colorPallet.light};
  border-radius: 4px;
  background-color: ${theme.colorPallet.white};
  padding: 0.5rem;
  &.opened {
    display: block;
    position: absolute;
    z-index: 100;
    left: 400px;
  }
`;

export const ActionMenuItem = styled(ActionMenuItemUnstyled)`
  padding: 0.25rem 2rem;
  border-bottom: 1px solid ${theme.colorPallet.light};
  text-align: center;
`;
