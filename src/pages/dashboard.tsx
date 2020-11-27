import React, { FC } from "react";
import styled from "styled-components";
import MenuBar from "../components/sections/MenuBar";
import LeftSidebar from "../components/sections/LeftSidebar";
import UserChat from "../components/sections/UserChat";
import UserInfoSidebar from "../components/sections/UserInfoSidebar";
import Welcome from "../components/sections/Welcome";

export const DashboardWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  width: 100vw;
  min-height: 100vh;
  max-height: 900px;
  flex-direction: row;
  padding: 0;
  margin: 0;
`;

const Dashboard: FC = () => {
  type SectionsTypes = "profile" | "chat" | "contacts" | "setting";

  const [showUserInfo, setShowUserInfo] = React.useState(false);
  const [openingSection, setOpeningSection] = React.useState<SectionsTypes>(
    "profile"
  );
  const [selectedGuestId, setSelectedGuest] = React.useState("");

  function handleOpeningSection(e: React.SyntheticEvent) {
    const target = e.currentTarget;
    const value = target.attributes[0].nodeValue;
    switch (value) {
      case "profile":
        setOpeningSection("profile");
        break;
      case "chat":
        setOpeningSection("chat");
        break;
      case "contacts":
        setOpeningSection("contacts");
        break;
      case "setting":
        setOpeningSection("setting");
        break;
      default:
        return;
    }
  }

  function handleCloseUserInfo() {
    setShowUserInfo(false);
  }

  function handleOpenUserInfo() {
    setShowUserInfo(true);
  }

  return (
    <DashboardWrapper>
      <MenuBar
        handleOpeningSection={handleOpeningSection}
        openingSection={openingSection}
      />
      <LeftSidebar
        setSelectedGuest={setSelectedGuest}
        openingSection={openingSection}
      />
      {selectedGuestId.trim() === "" ? (
        <Welcome />
      ) : (
        <UserChat
          selectedGuestId={selectedGuestId}
          handleOpenUserInfo={handleOpenUserInfo}
        />
      )}
      {showUserInfo && (
        <UserInfoSidebar
          selectedGuestId={selectedGuestId}
          handleClose={handleCloseUserInfo}
        />
      )}
    </DashboardWrapper>
  );
};

export default Dashboard;
