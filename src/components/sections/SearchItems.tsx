import React, { FC } from "react";
import { H5 } from "../elements/typographies";
import styled from "styled-components";
import theme from "../../theme";
import Avatar from "../sections/Avatar";
import { CurrentUserContext } from "../../App";
import { CHECK_IF_CONTACT_ADDED } from "../../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { StyledButton } from "../elements/buttons";
import { ADD_CONTACT } from "../../graphql/mutations";
import { GET_CONTACTS_LIST } from "../../graphql/queries";

type SearchResultTypes = {
  id: string;
  username: string;
  profile_image: string;
  onClick?: any;
};

const MeButtonUnstyled: FC<{ className?: string }> = ({ className }) => (
  <StyledButton className={className} width="120px" height="32px">
    ME
  </StyledButton>
);

const MeButton = styled(MeButtonUnstyled)`
  pointer-events: none;
`;

const AddedContactButtonUnstyled: FC<{ className?: string }> = ({
  className,
}) => (
  <StyledButton className={className} width="120px" height="32px">
    Added Contact
  </StyledButton>
);

const AddedContactButton = styled(AddedContactButtonUnstyled)`
  pointer-events: none;
`;

const NotAddedButtonUnstyled: FC<{
  onClick: () => void;
  className?: string;
}> = ({ onClick, className }) => (
  <StyledButton
    className={className}
    width="120px"
    height="32px"
    onClick={onClick}
  >
    Add Contact
  </StyledButton>
);

const NotAddedButton = styled(NotAddedButtonUnstyled)`
  background-color: ${theme.colorPallet.white};
  border: 2px solid ${theme.colorPallet.primary};
  color: ${theme.colorPallet.primary};
  font-weight: 600;
  &:hover {
    cursor: pointer;
    outline: transparent;
  }
  &:focus {
    outline: transparent;
  }
`;

const SearchItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  ${Avatar} {
    margin-right: 1rem;
  }
  & > div {
    display: flex;
    align-items: center;
  }
`;

const SearchItem: FC<SearchResultTypes> = ({
  id,
  username,
  profile_image,
  onClick,
}) => {
  const { currentUserId } = React.useContext(CurrentUserContext);
  const isCurrentUser = currentUserId === id;
  const { data } = useQuery(CHECK_IF_CONTACT_ADDED, {
    variables: { currentUserId: currentUserId, guestUserId: id },
  });
  const isAddedContact = data?.contacts_list.length !== 0;
  const [addContact] = useMutation(ADD_CONTACT, {
    refetchQueries: [
      {
        query: CHECK_IF_CONTACT_ADDED,
        variables: { currentUserId: currentUserId, guestUserId: id },
      },
      {
        query: GET_CONTACTS_LIST,
        variables: { userId: currentUserId },
      },
    ],
  });
  function handleAddContact() {
    addContact({
      variables: { currentUserId: currentUserId, guestUserId: id },
    });
  }
  return (
    <SearchItemWrapper onClick={onClick}>
      <div>
        <Avatar profile_image={profile_image} size="sm" />
        <H5>{username}</H5>
      </div>
      {isCurrentUser ? (
        <MeButton />
      ) : isAddedContact ? (
        <AddedContactButton />
      ) : (
        <NotAddedButton onClick={handleAddContact} />
      )}
    </SearchItemWrapper>
  );
};

export default SearchItem;
