import React, { FC } from "react";
import { H4 } from "../elements/typographies";
import styled from "styled-components";
import { AddContactIcon } from "../../icons";
import ContactItem from "./ContactItem";
import { CurrentUserContext } from "../../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_CONTACTS_LIST } from "../../graphql/queries";
import { StyledButton } from "../elements/buttons";
import AddContactModal from "./AddContactModal";

const ContactsWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: justify;
  padding: 2rem;
  margin: 0px;
`;

const ContactHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${StyledButton} {
    margin: 0;
    background-color: transparent;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: transparent;
    }
  }
`;

const ContactSection: FC<{ setSelectedGuest: any }> = ({
  setSelectedGuest,
}) => {
  type ContactTypes = {
    contact_item: {
      id: string;
      username: string;
    };
  };

  const { id } = React.useContext(CurrentUserContext);
  const { data, loading } = useQuery(GET_CONTACTS_LIST, {
    variables: {
      userId: id,
    },
  });

  const [openAddContact, setOpenAddContact] = React.useState(false);
  if (loading) return <div>Loading ....</div>;
  const contactsList = data ? data.contacts_list : [];
  const handleOpenAddContact = function () {
    setOpenAddContact(!openAddContact);
  };

  return (
    <div>
      <ContactsWrapper>
        <ContactHeaderWrapper>
          <H4>Contacts</H4>
          <StyledButton width="40px" onClick={handleOpenAddContact}>
            <AddContactIcon />
          </StyledButton>
        </ContactHeaderWrapper>
        <div>
          {contactsList.map((contact: ContactTypes) => (
            <ContactItem
              key={contact.contact_item.id}
              name={contact.contact_item.username}
              onClick={() => setSelectedGuest(contact.contact_item.id)}
            ></ContactItem>
          ))}
        </div>
      </ContactsWrapper>
      {openAddContact && (
        <AddContactModal handleOpenAddContact={handleOpenAddContact} />
      )}
    </div>
  );
};

export default ContactSection;
