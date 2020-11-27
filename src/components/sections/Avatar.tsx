import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../theme";

const AvatarUnstyled: FC<{
  profile_image: string;
  className?: string;
  size: "md" | "sm";
  onClick?: () => void;
}> = ({ profile_image, className, size, onClick }) => {
  return (
    <div className={`${className} avatar-${size}`} onClick={onClick}>
      <img
        src={
          profile_image.trim() === ""
            ? "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg"
            : profile_image
        }
        alt="user avatar"
      />
    </div>
  );
};

const Avatar = styled(AvatarUnstyled)`
  img {
    display: inline-block;
    border: solid 2px ${theme.colorPallet.lightBackground};
    border-radius: 50%;
  }
  &.avatar-md {
    img {
      width: 96px;
      height: 96px;
    }
  }
  &.avatar-sm {
    img {
      width: 36px;
      height: 36px;
    }
  }
`;

export default Avatar;
