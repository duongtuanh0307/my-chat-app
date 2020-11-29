import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../theme";
import { CloseIcon } from "../../icons";
import { H5 } from "../elements/typographies";

const ModalWrapper = styled.div`
  background-color: transparent;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  overflow: hidden;
`;

const ModalOverlay = styled.div`
  background-color: ${theme.colorPallet.darkText};
  opacity: 0.3;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const UnstyledModalContentWrapper: FC<{
  children: React.ReactNode;
  className?: string;
  width: string;
  height: string;
}> = ({ className, width, height, children }) => (
  <div className={className} attr-width={width} attr-height={height}>
    {children}
  </div>
);

const ModalContentWrapper = styled(UnstyledModalContentWrapper).attrs(
  (props: { width: string; height: string }) => ({
    width: props.width,
    height: props.height,
  })
)`
  background-color: ${theme.colorPallet.white};
  padding: 1rem 2rem 2rem 2rem;
  margin: 80px auto;
  border-radius: 4px;
  position: relative;
  z-index: 25;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  justify-content: space-between;
`;

const ModalHeader = styled.div`
  padding: 0.5rem 0;
  margin: 0;
  border-bottom: 1px solid ${theme.colorPallet.lightGray};
  display: flex;
  justify-content: space-between;
`;

type ModalTypes = {
  modalTitle: string;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  width: string;
  height: string;
};

//Modal Button
type ButtonTypes = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled: boolean;
  width?: string;
  actionType: "confirm" | "close" | "danger" | "cancel";
};

const ModalButtonUnstyled: FC<ButtonTypes> = ({
  children,
  onClick,
  className,
  disabled,
  actionType,
  width,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${className} button-${actionType}`}
    attr-width={width}
  >
    {children}
  </button>
);

export const ModalButton = styled(ModalButtonUnstyled).attrs(
  (props: { width?: string }) => ({
    width: props.width || "120px",
  })
)`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border-radius: 4px;
  font-weight: 600;
  width: ${(props) => props.width};
  &:hover {
    outline: transparent;
    cursor: pointer;
  }
  &:focus {
    outline: transparent;
  }
  padding: 1rem;
  &.button-confirm {
    background-color: ${theme.colorPallet.primary};
    color: ${theme.colorPallet.white};
    border: 1px solid ${theme.colorPallet.primary};
  }
  &.button-cancel {
    background-color: ${theme.colorPallet.white};
    color: ${theme.colorPallet.darkText};
    border: 1px solid ${theme.colorPallet.darkText};
  }
  &.button-close {
    background-color: transparent;
    color: ${theme.colorPallet.darkText};
    border: none;
    padding: 0;
    width: 24px;
  }
  &.button-danger {
    background-color: ${theme.colorPallet.danger};
    color: ${theme.colorPallet.white};
    border: 1px solid ${theme.colorPallet.danger};
  }
`;

export const ModalButtonsGroup = styled.div`
  display: flex;
  justify-content: center;
  ${ModalButton} {
    margin: 0 2rem;
  }
`;

export const Modal: FC<ModalTypes> = ({
  modalTitle,
  onClose,
  children,
  className,
  width,
  height,
}) => (
  <div>
    <ModalWrapper className={className}>
      <ModalOverlay></ModalOverlay>
      <ModalContentWrapper width={width} height={height}>
        <ModalHeader>
          <H5>{modalTitle}</H5>
          <ModalButton onClick={onClose} actionType="close" disabled={false}>
            <CloseIcon />
          </ModalButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalContentWrapper>
    </ModalWrapper>
  </div>
);
