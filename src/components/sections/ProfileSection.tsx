import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../theme";
import { CurrentUserContext } from "../../App";
import Avatar from "./Avatar";
import { H4, H5, LightText, DarkText } from "../elements/typographies";

const ProfileSectionWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: justify;
  padding: 2rem;
  margin: 0px;
`;

const AvatarWrapper = styled.div`
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

const ProfileSection: FC = () => {
  const {
    username,
    email,
    about_me,
    profile_image,
    date_of_birth,
    phone_number,
  } = React.useContext(CurrentUserContext);

  return (
    <ProfileSectionWrapper>
      <H4>My Profile</H4>
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

export default ProfileSection;
