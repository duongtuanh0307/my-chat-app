import React, { FC } from "react";
import Truncate from "react-truncate";
import { H5, LightText } from "../elements/typographies";
import styled from "styled-components";
import Avatar from "../sections/Avatar";
import theme from "../../theme";

type RecentChatPropsTypes = {
  profile_image: string;
  username: string;
  chat_content: string;
  newchat_num: number;
  onClick: () => void;
};

const RecentChatItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  & > * {
    margin: 0px 0.5rem;
  }
  & > .new-chat-num {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${theme.colorPallet.pink};
    color: ${theme.colorPallet.red};
    font-weight: 600;
    text-align: center;
    line-height: 1em;
    padding: 8px 0px;
  }
  & > .chat-info-wrapper {
    display: flex;
    ${Avatar} {
      margin-right: 1rem;
    }
  }
`;

const RecentChatItem: FC<RecentChatPropsTypes> = ({
  profile_image,
  username,
  chat_content,
  newchat_num,
  onClick,
}) => {
  return (
    <RecentChatItemWrapper onClick={onClick}>
      <div className="chat-info-wrapper">
        <Avatar profile_image={profile_image} size="sm" />
        <div>
          <H5>
            {username}
            <span> ({newchat_num})</span>
          </H5>
          <Truncate lines={1} ellipsis="..." width={200} trimWhitespace>
            <LightText>{chat_content}</LightText>
          </Truncate>
        </div>
      </div>
      {/* <div className="new-chat-num">{newchat_num}</div> */}
    </RecentChatItemWrapper>
  );
};

export default RecentChatItem;
