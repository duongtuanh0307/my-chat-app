import { gql } from "@apollo/client";

export const ME = gql`
  subscription me($firebaseUserId: String!) {
    user(where: { firebase_user_id: { _eq: $firebaseUserId } }) {
      id
      username
      email
      about_me
      profile_image
      date_of_birth
      phone_number
    }
  }
`;

export const GET_MESSAGES_BY_CHAT_ID = gql`
  subscription getMessagesByChatId($chatboxId: uuid!) {
    messages(
      where: { chatbox_id: { _eq: $chatboxId } }
      order_by: { sent_at: asc }
    ) {
      message
      sender_id
    }
  }
`;

export const GET_MY_CHATBOXES = gql`
  subscription getMyChatboxes($userId: uuid!) {
    chatboxes(
      where: {
        _or: [{ user01_id: { _eq: $userId } }, { user02_id: { _eq: $userId } }]
      }
    ) {
      id
      messages_aggregate {
        aggregate {
          count
        }
      }
      user01 {
        id
        username
        profile_image
      }
      user02 {
        id
        profile_image
        username
      }
      messages(order_by: { sent_at: desc }, limit: 1) {
        message
      }
    }
  }
`;
