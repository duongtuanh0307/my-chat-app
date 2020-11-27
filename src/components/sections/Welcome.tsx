import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../theme";
import { BigChatIcon } from "../../icons";

const WelcomeWrapper = styled.div`
  width: calc(100vw - 480px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.colorPallet.primary};
  font-size: 1rem;
  margin-top: 20%;
  p {
    padding: 0;
    margin: 0;
  }
  ${BigChatIcon} {
    padding-bottom: 2rem;
  }
  span {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const Welcome: FC = () => (
  <WelcomeWrapper>
    <BigChatIcon />
    <p>
      Welcome to <span>CHAT APP</span>
    </p>
    <p> Select a contact to start chatting!</p>
  </WelcomeWrapper>
);

export default Welcome;
