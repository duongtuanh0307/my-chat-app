import React, { FC } from "react";
import { Modal, ModalButton, ModalButtonsGroup } from "../elements/modals";
import { H6 } from "../elements/typographies";
import { DELETE_CONTACT_ITEM } from "../../graphql/mutations";
import {
  GET_CONTACTS_LIST,
  CHECK_IF_CONTACT_ADDED,
} from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { CurrentUserContext } from "../../App";
import styled from "styled-components";

type ConfirmDeleteTypes = {
  targetUserId: string;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${H6} {
    font-size: 1.2rem;
    font-weight: 500;
    padding-top: 24px;
    text-align: center;
  }
`;

const ConfirmDeleteModal: FC<ConfirmDeleteTypes> = ({
  setConfirmDelete,
  targetUserId,
}) => {
  const { currentUserId } = React.useContext(CurrentUserContext);
  const [deleteContact] = useMutation(DELETE_CONTACT_ITEM, {
    refetchQueries: [
      {
        query: GET_CONTACTS_LIST,
        variables: { userId: currentUserId },
      },
      {
        query: CHECK_IF_CONTACT_ADDED,
        variables: { currentUserId: currentUserId, guestUserId: targetUserId },
      },
    ],
  });

  return (
    <DeleteModal
      modalTitle="Confirm Delete"
      onClose={() => setConfirmDelete(false)}
      width="400px"
      height="200px"
    >
      <H6>Do you realy want to delete this contact?</H6>
      <ModalButtonsGroup>
        <ModalButton
          actionType="cancel"
          disabled={false}
          onClick={() => setConfirmDelete(false)}
        >
          Cancel
        </ModalButton>

        <ModalButton
          actionType="danger"
          disabled={false}
          onClick={() => {
            deleteContact({ variables: { contactItemId: targetUserId } });
            setConfirmDelete(false);
          }}
        >
          Delete
        </ModalButton>
      </ModalButtonsGroup>
    </DeleteModal>
  );
};

export default ConfirmDeleteModal;
