import React, { FC } from "react";
import styled from "styled-components";
import { H5 } from "../elements/typographies";
import { DeleteIcon } from "../../icons";
import { ActionButton } from "../elements/buttons";
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

const ContactItem: FC<{
  name: string;
  className?: string;
  userId: string;
  setTargetUserId: React.Dispatch<React.SetStateAction<string>>;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}> = ({
  name,
  className,
  onClick,
  setTargetUserId,
  setConfirmDelete,
  userId,
}) => {
  function handleConfirmDelete() {
    setTargetUserId(userId);
    setConfirmDelete(true);
  }

  return (
    <ContactItemWrapper className={className}>
      <H5 onClick={onClick}>{name}</H5>
      <div>
        <ActionButton onClick={handleConfirmDelete}>
          <DeleteIcon />
        </ActionButton>
      </div>
    </ContactItemWrapper>
  );
};

export default ContactItem;
