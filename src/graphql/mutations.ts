import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $username: String!
    $aboutMe: String!
    $dob: String!
    $firebaseUserId: String!
    $phoneNumber: String!
    $profileImage: String!
  ) {
    insert_user(
      objects: {
        email: $email
        username: $username
        about_me: $aboutMe
        date_of_birth: $dob
        firebase_user_id: $firebaseUserId
        phone_number: $phoneNumber
        profile_image: $profileImage
      }
    ) {
      affected_rows
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation addContact($currentUserId: uuid!, $guestUserId: uuid!) {
    insert_contacts_list(
      objects: {
        contact_item_id: $guestUserId
        contact_owner_id: $currentUserId
      }
    ) {
      affected_rows
    }
  }
`;

export const CREATE_NEW_CHATBOX = gql`
  mutation createChatbox($user01: uuid!, $user02: uuid!) {
    insert_chatboxes(objects: { user01_id: $user01, user02_id: $user02 }) {
      returning {
        id
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($chatboxId: uuid!, $message: String!, $senderId: uuid!) {
    insert_messages(
      objects: {
        chatbox_id: $chatboxId
        message: $message
        sender_id: $senderId
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo(
    $userId: uuid!
    $aboutMe: String
    $dob: String
    $phoneNumber: String
    $profileImage: String
  ) {
    update_user_by_pk(
      pk_columns: { id: $userId }
      _set: {
        about_me: $aboutMe
        date_of_birth: $dob
        phone_number: $phoneNumber
        profile_image: $profileImage
      }
    ) {
      id
    }
  }
`;

export const DELETE_CONTACT_ITEM = gql`
  mutation deleteContact($contactItemId: uuid!) {
    delete_contacts_list(where: { contact_item_id: { _eq: $contactItemId } }) {
      affected_rows
    }
  }
`;
