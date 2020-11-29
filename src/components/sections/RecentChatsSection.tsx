import React, { FC } from "react";
import RecentChatItem from "./RecentChatItem";
import { H4 } from "../elements/typographies";
import styled from "styled-components";
import { CurrentUserContext } from "../../App";
import { useSubscription } from "@apollo/client";
import { GET_MY_CHATBOXES } from "../../graphql/subscriptions";

const RecentChatsWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: justify;
  margin: 0px;
  padding: 2rem;
  ${H4} {
    margin-bottom: 2rem;
  }
`;

const ChatItemsWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: justify;
  margin: 0px;
`;

export type ChatBoxTypes = {
  id: string;
  messages_aggregate: {
    aggregate: {
      count: number;
    };
  };
  user01: {
    id: string;
    username: string;
    profile_image: string;
  };
  user02: {
    id: string;
    profile_image: string;
    username: string;
  };
  messages: [
    {
      message: string;
    }
  ];
};

const RecentChatsSection: FC<{
  setSelectedGuest: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setSelectedGuest }) => {
  const { currentUserId } = React.useContext(CurrentUserContext);
  const { data, loading } = useSubscription(GET_MY_CHATBOXES, {
    variables: { userId: currentUserId },
  });
  if (loading) return <div>Loading .... </div>;
  const currentUserChatboxes: ChatBoxTypes[] = data.chatboxes;

  return (
    <RecentChatsWrapper>
      <H4>Recent Chats</H4>
      <ChatItemsWrapper>
        {currentUserChatboxes !== [] &&
          currentUserChatboxes.map((chatbox) => (
            <RecentChatItem
              onClick={() => {
                const guestId =
                  chatbox.user01.id === currentUserId
                    ? chatbox.user02.id
                    : chatbox.user01.id;
                setSelectedGuest(guestId);
              }}
              key={chatbox.id}
              profile_image={
                chatbox.user01.id === currentUserId
                  ? chatbox.user02.profile_image
                  : chatbox.user01.profile_image
              }
              username={
                chatbox.user01.id === currentUserId
                  ? chatbox.user02.username
                  : chatbox.user01.username
              }
              chat_content={chatbox.messages[0]?.message}
              newchat_num={chatbox.messages_aggregate.aggregate.count}
            />
          ))}
      </ChatItemsWrapper>
    </RecentChatsWrapper>
  );
};

export default RecentChatsSection;
