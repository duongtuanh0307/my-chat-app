import { gql } from "@apollo/client";

export const CHECK_IF_USERNAME_TAKEN = gql`
  query checkIfUserNameTaken($username: String!) {
    user(where: { username: { _eq: $username } }) {
      username
    }
  }
`;

export const GET_CONTACTS_LIST = gql`
  query getMyContacts($userId: uuid!) {
    contacts_list(
      where: { contact_owner_id: { _eq: $userId } }
      order_by: { contact_item: { username: asc } }
    ) {
      contact_item {
        id
        username
        profile_image
      }
    }
  }
`;

export const SEARCH_USERS = gql`
  query MyQuery($query: String!) {
    user(where: { username: { _ilike: $query } }) {
      id
      profile_image
      username
    }
  }
`;

export const CHECK_IF_CONTACT_ADDED = gql`
  query checkIfContactAdded($currentUserId: uuid!, $guestUserId: uuid!) {
    contacts_list(
      where: {
        _and: [
          {
            contact_owner_id: { _eq: $currentUserId }
            contact_item_id: { _eq: $guestUserId }
          }
        ]
      }
    ) {
      id
    }
  }
`;

export const SEARCH_CHATBOX = gql`
  query searchChatbox($userIdArr: [uuid!]!) {
    chatboxes(
      where: {
        _and: [
          { user01_id: { _in: $userIdArr }, user02_id: { _in: $userIdArr } }
        ]
      }
    ) {
      id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($userId: uuid!) {
    user_by_pk(id: $userId) {
      about_me
      username
      profile_image
      phone_number
      email
      date_of_birth
    }
  }
`;
