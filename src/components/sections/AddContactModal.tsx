import React, { FC } from "react";
import { SearchIcon } from "../../icons";
import { Modal, ModalButton, ModalButtonsGroup } from "../elements/modals";
import { InputWithPrepend } from "../elements/inputfields";
import SearchItem from "./SearchItems";
import useSearch from "../../utils/useSearch";
import styled from "styled-components";

type AddContactModalTypes = {
  handleOpenAddContact: () => void;
};

type SearchResultTypes = {
  id: string;
  username: string;
  profile_image: string;
};

const StyledSearchResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding-right: 1rem;
  overflow-y: scroll;
`;

const AddContactModal: FC<AddContactModalTypes> = ({
  handleOpenAddContact,
}) => {
  const [inputString, setInputString] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<SearchResultTypes[]>(
    []
  );
  const results = useSearch(inputString);
  const handleSearch = function (): void {
    inputString.trim() === ""
      ? setSearchResults([])
      : setSearchResults(results);
  };

  const SearchResult: FC<{
    searchResults: SearchResultTypes[];
    className?: string;
  }> = ({ searchResults, className }) => {
    return (
      <StyledSearchResult className={className}>
        {searchResults.map(({ id, username, profile_image }) => (
          <SearchItem
            key={id}
            username={username}
            profile_image={profile_image}
            id={id}
          />
        ))}
      </StyledSearchResult>
    );
  };

  return (
    <Modal
      width="400px"
      height="600px"
      modalTitle="Add Contact"
      onClose={handleOpenAddContact}
    >
      <InputWithPrepend
        value={inputString}
        id="search"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputString(e.target.value);
          if (e.target.value.trim() === "") setSearchResults([]);
        }}
        placeholder="Input username to search users ..."
        prepend={<SearchIcon />}
      />
      {searchResults && <SearchResult searchResults={searchResults} />}
      <ModalButtonsGroup>
        <ModalButton
          disabled={false}
          actionType="cancel"
          onClick={handleOpenAddContact}
        >
          Cancel
        </ModalButton>
        <ModalButton
          disabled={false}
          actionType="confirm"
          onClick={() => handleSearch()}
        >
          Search
        </ModalButton>
      </ModalButtonsGroup>
    </Modal>
  );
};

export default AddContactModal;
