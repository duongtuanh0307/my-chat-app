import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../theme";
import ProfileSection from "../sections/ProfileSection";
import RecentChatsSection from "../sections/RecentChatsSection";
import SettingSection from "../sections/SettingSection";
import ContactSection from "../sections/ContactSection";

const LeftSidebarWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  width: 400px;
  flex-direction: column;
  margin: 0;
  background-color: ${theme.colorPallet.light};
`;

type PropsTypes = {
  openingSection: "profile" | "chat" | "contacts" | "setting";
  setSelectedGuest: React.Dispatch<React.SetStateAction<string>>;
};

const LeftSidebar: FC<PropsTypes> = ({ openingSection, setSelectedGuest }) => {
  const displayedSection =
    openingSection === "profile" ? (
      <ProfileSection />
    ) : openingSection === "chat" ? (
      <RecentChatsSection setSelectedGuest={setSelectedGuest} />
    ) : openingSection === "contacts" ? (
      <ContactSection setSelectedGuest={setSelectedGuest} />
    ) : (
      <SettingSection />
    );
  return <LeftSidebarWrapper>{displayedSection}</LeftSidebarWrapper>;
};

export default LeftSidebar;
