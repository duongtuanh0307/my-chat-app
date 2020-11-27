import React, { FC } from "react";
import styled from "styled-components";
import { H4, H5 } from "../elements/typographies";
import { Form } from "../elements/others";
import { PrimaryButton } from "../elements/buttons";
import { SettingInput, InputNotEditable } from "../elements/inputfields";
import Avatar from "../sections/Avatar";
import { CurrentUserContext } from "../../App";
import theme from "../../theme";
import { UPDATE_USER_INFO } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
// import handleUploadImage from "../../utils/handleUploadImage";

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  margin-top: 1rem;
  ${H5} {
    padding: 0.5rem;
  }
`;

const SettingWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: justify;
  margin: 0px;
  padding: 1rem;
  ${H4} {
    padding: 0 1rem;
  }
  .update-success {
    color: ${theme.colorPallet.primary};
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const ActionButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

// const SettingMenuWrapper = styled.div`
//   display: flex;
// `;

const SettingDetail = styled.div`
  border-top: 1px solid ${theme.colorPallet.darkText};
  border-bottom: 1px solid ${theme.colorPallet.darkText};
  margin: 0;
  padding: 1rem 2rem;
`;

// const StyledSettingMenuItem = styled.button.attrs((props) => ({
//   className: props.className,
// }))`
//   font-family: "Public Sans", sans-serif;
//   color: ${theme.colorPallet.darkText};
//   font-weight: 600;
//   font-size: 0.9rem;
//   margin: 0;
//   background-color: transparent;
//   border: 1px solid ${theme.colorPallet.darkText};
//   border-bottom: none;
//   border-radius: 0px 8px 0px 0px;
//   padding: 0.5rem 1rem;
//   text-align: left;
//   &.opening {
//     background-color: ${theme.colorPallet.primary};
//     color: ${theme.colorPallet.white};
//     outline: transparent;
//   }
// `;

type UpdateUserTypes = {
  userId: string;
  aboutMe?: string;
  dob?: string;
  phoneNumber?: string;
  profileImage?: string;
};

type FormDataTypes = {
  aboutMe?: string;
  dob?: string;
  phoneNumber?: string;
  profileImage?: string;
  username: string;
  email: string;
};

// const SettingMenuItem: FC<{
//   children: React.ReactNode;
//   className?: string;
//   onClick?: () => void;
// }> = ({ className, onClick, children }) => (
//   <StyledSettingMenuItem className={className} onClick={onClick}>
//     {children}
//   </StyledSettingMenuItem>
// );

const SettingSection: FC = () => {
  // const [openEditProfile, setOpenEditProfile] = React.useState<boolean>(true);
  // const [openResetPassword, setOpenResetPassword] = React.useState<boolean>(
  //   false
  // );
  const {
    profile_image,
    username,
    about_me,
    email,
    id,
    date_of_birth,
    phone_number,
  } = React.useContext(CurrentUserContext);
  const [profileImage, setProfileImage] = React.useState(profile_image);
  // const uploadAvatarRef = React.useRef();
  // function openFileInput() {
  //   uploadAvatarRef.click();
  // }
  // async function handleUpdateAvatar(event: React.FormEvent<HTMLInputElement>) {
  //   const url = await handleUploadImage(event.target.files[0], "avatar");
  //   setProfileImage(url);
  // }
  const { register, handleSubmit, formState } = useForm<FormDataTypes>({
    mode: "onBlur",
    defaultValues: {
      aboutMe: about_me,
      dob: date_of_birth,
      phoneNumber: phone_number,
      profileImage: profile_image,
      username: username,
      email: email,
    },
  });
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);
  const [updateResult, showUpdateResult] = React.useState(false);

  function onSubmit(data: FormDataTypes) {
    const variables: UpdateUserTypes = {
      userId: id,
      aboutMe: data.aboutMe ? data.aboutMe : about_me,
      dob: data.dob ? data.dob : date_of_birth,
      phoneNumber: data.phoneNumber ? data.phoneNumber : phone_number,
      profileImage: profileImage,
    };
    updateUserInfo({ variables: variables });
    showUpdateResult(true);
  }

  const editProfile: React.ReactNode = (
    <div key="edit profile">
      <AvatarWrapper>
        {/* <input type="file" style={{display:"none"} ref={uploadAvatarRef} onChange={handleUpdateAvatar}}/> */}
        <Avatar profile_image={profile_image} size="md" />
        <H5>{username}</H5>
      </AvatarWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SettingInput
          name="profileImage"
          id="profileImage"
          type="text"
          label="Profile img"
          placeholder="input your profile picture"
          inputRef={register}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProfileImage(e.target.value);
          }}
        />
        <SettingInput
          name="aboutMe"
          id="aboutMe"
          type="text-field"
          label="About me"
          placeholder="descript about yourself"
          inputRef={register}
        />
        <InputNotEditable
          id="username"
          name="username"
          type="text"
          label="Name"
          inputRef={register}
        />
        <InputNotEditable
          id="email"
          name="email"
          type="text"
          label="Email"
          inputRef={register}
        />
        <SettingInput
          id="dob"
          name="dob"
          type="text"
          label="Birthday"
          inputRef={register}
        />
        <SettingInput
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          label="Phone Number"
          inputRef={register}
        />
        {updateResult && (
          <div className="update-success"> Your Info Is Updated!</div>
        )}
        <ActionButtonsWrapper>
          <PrimaryButton
            key="update"
            width="50%"
            type="submit"
            disabled={formState.isSubmitting}
          >
            Update
          </PrimaryButton>
        </ActionButtonsWrapper>
      </Form>
    </div>
  );

  // const resetPassword: React.ReactNode = (
  //   <div key="reset password">
  //     <Form>
  //       <SettingInput
  //         id="recent-password"
  //         type="password"
  //         label="Recent Password"
  //         placeholder="Input your recent password"
  //       />
  //       <SettingInput
  //         id="new-password"
  //         type="password"
  //         label="New Password"
  //         placeholder="Input your new password"
  //       />
  //       <SettingInput
  //         id="confirm-new-password"
  //         type="password"
  //         label="Confirm New Password"
  //         placeholder="Confirm your new password"
  //       />
  //       <ActionButtonsWrapper>
  //         <PrimaryButton
  //           key="update"
  //           width="50%"
  //           onClick={() => console.log("Save setting")}
  //         >
  //           Reset
  //         </PrimaryButton>
  //       </ActionButtonsWrapper>
  //     </Form>
  //   </div>
  // );
  return (
    <SettingWrapper>
      <H4>Settings</H4>
      {/* <SettingMenuWrapper>
        <SettingMenuItem
          key="setting"
          onClick={() => {
            setOpenResetPassword(false);
            setOpenEditProfile(true);
          }}
          className={openEditProfile ? "opening" : ""}
        >
          Edit Profile
        </SettingMenuItem> */}
      {/* <SettingMenuItem
          key="editpass"
          onClick={() => {
            setOpenEditProfile(false);
            setOpenResetPassword(true);
          }}
          className={openResetPassword ? "opening" : ""}
        >
          Reset Password
        </SettingMenuItem> */}
      {/* </SettingMenuWrapper> */}
      <SettingDetail>
        {editProfile}
        {/* {openEditProfile && editProfile} */}
        {/* {openResetPassword && resetPassword} */}
      </SettingDetail>
    </SettingWrapper>
  );
};

export default SettingSection;
