import styled from "styled-components";
import theme from "./theme";
import { User } from "@styled-icons/fa-regular";
import { Lock } from "@styled-icons/boxicons-regular";
import { Contacts, UserAdd } from "@styled-icons/remix-line";
import { Settings } from "@styled-icons/ionicons-outline";
import { ChatDots, ThreeDotsVertical } from "@styled-icons/bootstrap";
import { LogoutBox } from "@styled-icons/remix-line";
import { CloseOutline, SearchOutline } from "@styled-icons/evaicons-outline";
import { Chat } from "@styled-icons/crypto";

//Default size 14px;
export const UserIcon = styled(User).attrs((props) => ({
  size: props.size || "14px",
  color: props.color || theme.colorPallet.darkText,
}))`
  color: ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const LockIcon = styled(Lock).attrs((props) => ({
  size: props.size || "14px",
  color: props.color || theme.colorPallet.darkText,
}))`
  color: ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

//Default size 24px;
export const ContactsIcon = styled(Contacts).attrs((props) => ({
  size: props.size || "24px",
  color: props.color || theme.colorPallet.darkText,
}))`
  color: ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const SettingsIcon = styled(Settings).attrs((props) => ({
  size: props.size || "24px",
  color: props.color || theme.colorPallet.darkText,
}))`
  color: ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const LogoutIcon = styled(LogoutBox).attrs((props) => ({
  size: props.size || "28px",
  color: props.color || theme.colorPallet.darkText,
}))`
  color: ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const ChatDotsIcon = styled(ChatDots).attrs((props) => ({
  size: props.size || "24px",
  color: props.color || theme.colorPallet.darkText,
}))`
  color: ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const ThreeDotsIcon = styled(ThreeDotsVertical).attrs((props) => ({
  color: props.color || theme.colorPallet.secondary,
}))`
  color: ${(props) => props.color};
  width: 24px;
  height: 24px;
`;

export const CloseIcon = styled(CloseOutline).attrs((props) => ({
  color: props.color || theme.colorPallet.secondary,
}))`
  color: ${(props) => props.color};
  width: 24px;
  height: 24px;
`;

export const AddContactIcon = styled(UserAdd).attrs((props) => ({
  color: props.color || theme.colorPallet.darkText,
}))`
  color: ${(props) => props.color};
  width: 24px;
  height: 24px;
`;

export const SearchIcon = styled(SearchOutline).attrs((props) => ({
  color: props.color || theme.colorPallet.secondary,
}))`
  color: ${(props) => props.color};
  width: 24px;
  height: 24px;
`;

export const BigChatIcon = styled(Chat).attrs((props) => ({
  color: props.color || theme.colorPallet.primary,
}))`
  color: ${(props) => props.color};
  width: 120px;
  height: 120px;
`;
