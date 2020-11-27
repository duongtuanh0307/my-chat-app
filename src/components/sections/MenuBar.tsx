import React, { FC } from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import {
  UserIcon,
  ContactsIcon,
  SettingsIcon,
  ChatDotsIcon,
  LogoutIcon,
} from "../../icons";
import { AuthContext } from "../../auth";

const MenuBarWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80px;
  margin: 0;
  z-index: 9;
  box-shadow: 0 2px 4px rgba(15, 34, 58, 0.12);
`;

const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

type PropsTypes = {
  openingSection: "profile" | "chat" | "contacts" | "setting";
  handleOpeningSection: (e: React.SyntheticEvent) => void;
};

const MenuBar: FC<PropsTypes> = ({ handleOpeningSection, openingSection }) => {
  const { signOut } = React.useContext(AuthContext);

  type SectionItemTypes = {
    value: "profile" | "chat" | "contacts" | "setting";
    icon: React.ReactNode;
  };

  const sectionsList: SectionItemTypes[] = [
    {
      value: "profile",
      icon: <UserIcon size="24px" />,
    },
    {
      value: "chat",
      icon: <ChatDotsIcon />,
    },
    {
      value: "contacts",
      icon: <ContactsIcon />,
    },
    {
      value: "setting",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <MenuBarWrapper>
      <MenuItemsWrapper>
        {sectionsList.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            children={item.icon}
            onClick={(e) => {
              handleOpeningSection(e);
            }}
            opening={item.value === openingSection}
          />
        ))}
      </MenuItemsWrapper>
      <MenuItem children={<LogoutIcon />} onClick={() => signOut()} />
    </MenuBarWrapper>
  );
};

export default MenuBar;
