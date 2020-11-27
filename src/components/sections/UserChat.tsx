import React, { FC } from "react";
import Avatar from "../sections/Avatar";
import styled from "styled-components";
import { CurrentUserContext } from "../../App";
import theme from "../../theme";
import { StyledInput } from "../elements/inputfields";
import { PrimaryButton } from "../elements/buttons";
import { H5 } from "../elements/typographies";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import { GET_USER_BY_ID, SEARCH_CHATBOX } from "../../graphql/queries";
import { GET_MESSAGES_BY_CHAT_ID } from "../../graphql/subscriptions";
// import { ADD_MESSAGE } from "../../graphql/mutations";
import { ADD_MESSAGE, CREATE_NEW_CHATBOX } from "../../graphql/mutations";

type ChatTypes = {
  message: string;
  sender_id: string;
};

const SingleChat: FC<{
  chat: ChatTypes;
  className?: string;
  profile_image: string;
  chatType: "mychat" | "tome";
}> = ({ chat, className, profile_image, chatType }) => (
  <div className={`${className} ${chatType}`}>
    <Avatar profile_image={profile_image} size="sm" />
    <p>{chat.message}</p>
  </div>
);

const StyledChat = styled(SingleChat)`
  display: flex;
  p {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    font-family: "Public Sans", sans-serif;
    position: relative;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    max-width: 400px;
  }
  &.mychat {
    flex-direction: row-reverse;
    justify-content: flex-start;
    p {
      background-color: ${theme.colorPallet.primary};
      color: ${theme.colorPallet.white};
      margin-right: 1rem;
    }
    p::after {
      content: "";
      position: absolute;
      top: 0;
      width: 0;
      height: 0;
      right: -0.5rem;
      border-top: 0.8rem solid ${theme.colorPallet.primary};
      border-right: 0.8rem solid transparent;
    }
  }
  &.tome {
    flex-direction: row;
    p {
      background-color: ${theme.colorPallet.light};
      color: ${theme.colorPallet.darkText};
      margin-left: 1rem;
    }
    p::before {
      content: "";
      position: absolute;
      top: 0;
      width: 0;
      height: 0;
      content: "";
      left: -0.5rem;
      border-top: 0.8rem solid ${theme.colorPallet.light};
      border-left: 0.8rem solid transparent;
    }
  }
`;

const UserChatWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: calc(100vw - 480px);
`;

const ChatAreaWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: (100vw-480px);
`;

const ChatboxHeader = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: ${theme.colorPallet.white};
  border-bottom: 1px solid ${theme.colorPallet.light};
  padding: 0 2rem;
  width: calc(100vw - 480px);
  ${Avatar} {
    margin-right: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const ChatsWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  overflow-y: scroll;
  height: calc(100vh - 160px);
  width: calc(100vw - 480px);
  max-height: 900px;
  padding: 0 2rem;
`;

const InputMessage = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  border-top: 1px solid ${theme.colorPallet.light};
  background-color: ${theme.colorPallet.white};
  height: 80px;
`;

const UserChat: FC<{
  handleOpenUserInfo: any;
  selectedGuestId: string;
}> = ({ handleOpenUserInfo, selectedGuestId }) => {
  const [addMessage] = useMutation(ADD_MESSAGE);
  const { currentUserId, profile_image } = React.useContext(CurrentUserContext);
  const userIdArr = [currentUserId, selectedGuestId];
  const res1 = useQuery(SEARCH_CHATBOX, {
    variables: { userIdArr: userIdArr },
  });
  const data1 = res1.data;
  const loading1 = res1.loading;
  const [createChatbox, { data, loading }] = useMutation(CREATE_NEW_CHATBOX);
  const [chatboxId, setChatboxId] = React.useState("");
  React.useEffect(() => {
    if (loading1) return;
    if (data1.chatboxes.length === 0) {
      createChatbox({
        variables: { user01: currentUserId, user02: selectedGuestId },
      });
      if (loading) return;
      setChatboxId(data.insert_chatboxes.returning.id);
      return;
    }
    setChatboxId(data1.chatboxes[0].id);
    return;
  }, [
    data1,
    loading1,
    data,
    loading,
    setChatboxId,
    createChatbox,
    currentUserId,
    selectedGuestId,
  ]);
  const [inputMes, setInputMes] = React.useState("");
  const res2 = useQuery(GET_USER_BY_ID, {
    variables: { userId: selectedGuestId },
  });
  const [loading2, guestData] = [res2.loading, res2.data];

  const res3 = useSubscription(GET_MESSAGES_BY_CHAT_ID, {
    variables: { chatboxId: chatboxId },
  });
  function handleAddMessage(): void {
    addMessage({
      variables: {
        chatboxId: chatboxId,
        senderId: currentUserId,
        message: inputMes,
      },
    });
    setInputMes("");
  }
  const loading3 = res3.loading;

  if (loading1 || loading2 || loading3) return <div>Loading ...</div>;
  const chats = res3.data ? res3.data.messages : [];

  return (
    <UserChatWrapper>
      <ChatAreaWrapper>
        <ChatboxHeader>
          <Avatar
            profile_image={guestData.user_by_pk.profile_image}
            size="sm"
            onClick={() => handleOpenUserInfo()}
          />
          <H5>{guestData.user_by_pk.username}</H5>
        </ChatboxHeader>
        <ChatsWrapper>
          {chats &&
            chats.map((chat: ChatTypes, index: number) => {
              const isMyChat = currentUserId === chat.sender_id;
              return (
                <div key={index}>
                  <StyledChat
                    chat={chat}
                    profile_image={
                      isMyChat
                        ? profile_image
                        : guestData.user_by_pk.profile_image
                    }
                    chatType={isMyChat ? "mychat" : "tome"}
                  />
                </div>
              );
            })}
        </ChatsWrapper>
        <InputMessage>
          <StyledInput
            id="message"
            type="text"
            placeholder="Enter message ..."
            rows={1}
            value={inputMes}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputMes(e.target.value);
            }}
          />
          <PrimaryButton onClick={() => handleAddMessage()} width="4rem">
            Send
          </PrimaryButton>
        </InputMessage>
      </ChatAreaWrapper>
    </UserChatWrapper>
  );
};

export default UserChat;
