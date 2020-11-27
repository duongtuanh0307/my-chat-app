import React, { FC } from "react";
import styled from "styled-components";
import { H5 } from "../elements/typographies";
import { ThreeDotsIcon } from "../../icons";
import { ActionMenu, ActionMenuItem } from "../elements/others";
import theme from "../../theme";

const ContactItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${theme.colorPallet.lightGray};
  ${H5} {
    font-size: 1.1rem;
    &:hover {
      cursor: pointer;
      color: ${theme.colorPallet.primary};
    }
  }
`;

const StyledActionButton = styled.button`
  border: none;
  background-color: transparent;
  &:focus {
    outline: transparent;
  }
`;

const ActionButton: FC<{
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ className, onClick, children }) => (
  <StyledActionButton onClick={onClick} className={className}>
    {children}
  </StyledActionButton>
);
// Contact Item
const ContactItem: FC<{
  name: string;
  className?: string;
  onClick: () => void;
}> = ({ name, className, onClick }) => {
  const [openActionMenu, setOpenActionMenu] = React.useState(false);

  function handleShowActionMenu() {
    setOpenActionMenu(!openActionMenu);
  }

  return (
    <ContactItemWrapper className={className}>
      <H5 onClick={onClick}>{name}</H5>
      <div>
        <ActionButton onClick={handleShowActionMenu}>
          <ThreeDotsIcon />
        </ActionButton>
        <ActionMenu open={openActionMenu}>
          <ActionMenuItem>Hello</ActionMenuItem>
          <ActionMenuItem>Hi</ActionMenuItem>
          <ActionMenuItem>Action</ActionMenuItem>
        </ActionMenu>
      </div>
    </ContactItemWrapper>
  );
};

export default ContactItem;
