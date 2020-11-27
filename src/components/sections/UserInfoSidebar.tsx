import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../theme";
import Avatar from "./Avatar";
import { H4, H5, LightText, DarkText } from "../elements/typographies";
import { CloseIcon } from "../../icons";
import { GET_USER_BY_ID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const ProfileSectionWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  width: 400px;
  height: 100%;
  flex-direction: column;
  text-align: justify;
  padding: 2rem;
  margin: 0px;
  background-color: ${theme.colorPallet.white};
  border-left: 2px solid ${theme.colorPallet.lightGray};
  position: fixed;
  right: 0;
  z-index: 15;
`;

const AvatarWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  ${H5} {
    padding: 0.5rem;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    background-color: transparent;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
`;
const DetailInfo = styled.div`
  padding: 2rem 0;
  margin: 2.5rem 0;
  ${H5} {
    text-align: center;
    border-bottom: 1px solid ${theme.colorPallet.secondary};
    padding-bottom: 0.5rem;
  }
  div {
    margin: 1.5rem 0;
    display: flex;
    justify-content: space-between;
  }
`;

const UserInfoSidebar: FC<{
  handleClose: () => void;
  selectedGuestId: string;
}> = ({ handleClose, selectedGuestId }) => {
  const { data, loading } = useQuery(GET_USER_BY_ID, {
    variables: { userId: selectedGuestId },
  });
  if (loading)
    return <ProfileSectionWrapper>Loading Info</ProfileSectionWrapper>;
  const {
    username,
    about_me,
    profile_image,
    phone_number,
    email,
    date_of_birth,
  } = data.user_by_pk;
  return (
    <ProfileSectionWrapper>
      <UserInfoHeader>
        <H4>Profile</H4>
        <button onClick={handleClose}>
          <CloseIcon />
        </button>
      </UserInfoHeader>
      <AvatarWrapper>
        <Avatar profile_image={profile_image} size="md" />
        <H5>{username}</H5>
      </AvatarWrapper>
      <InfoWrapper>
        <LightText>{about_me}</LightText>
        <DetailInfo>
          <H5>About</H5>
          <div>
            <LightText>Name</LightText>
            <DarkText>{username}</DarkText>
          </div>
          <div>
            <LightText>Email</LightText>
            <DarkText>{email}</DarkText>
          </div>
          <div>
            <LightText>Birthday</LightText>
            <DarkText>
              {date_of_birth === "" ? "*********" : date_of_birth}
            </DarkText>
          </div>
          <div>
            <LightText>Phone Number</LightText>
            <DarkText>{phone_number}</DarkText>
          </div>
        </DetailInfo>
      </InfoWrapper>
    </ProfileSectionWrapper>
  );
};

export default UserInfoSidebar;
