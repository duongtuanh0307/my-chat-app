import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../theme";

type PropsTypes = {
  id: string;
  type: "text" | "password" | "email" | "text-field";
  onChange?: any;
  placeholder?: string;
  label?: string;
  className?: string;
  name?: string;
} & {
  prepend?: React.ReactNode;
  rows?: number;
  inputRef?: any;
  append?: React.ReactNode;
  value?: string;
};

const Input: FC<PropsTypes> = ({
  onChange,
  id,
  placeholder,
  label,
  type,
  prepend,
  className,
  rows,
  inputRef,
  name,
  append,
  value,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <div className="inputArea">
        {prepend && <span>{prepend}</span>}
        {type === "text-field" ? (
          <textarea
            onChange={onChange}
            placeholder={placeholder}
            ref={inputRef}
            rows={rows ?? 3}
            value={value}
            name={name}
          ></textarea>
        ) : (
          <input
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            ref={inputRef}
            value={value}
          />
        )}
        {append && <span>{append}</span>}
      </div>
    </div>
  );
};

export const StyledInput = styled(Input)`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  color: ${theme.colorPallet.darkText};
  font-family: "Public Sans", sans-serif;
  font-size: 16px;
  line-height: 1.5em;
  width: 100%;
  padding: 1rem;
  label {
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .inputArea {
    input {
      font-size: 0.9em;
      background-color: ${theme.colorPallet.light};
      border: 1px solid ${theme.colorPallet.lightGray};
      border-radius: 5px;
      padding: 1rem;
      width: calc(100% - 2rem);
    }
    input:focus {
      outline: none;
    }
    textarea {
      font-size: 0.9em;
      background-color: ${theme.colorPallet.light};
      border: 1px solid ${theme.colorPallet.lightGray};
      border-radius: 5px;
      padding: 1rem;
      width: calc(100% - 2rem);
    }
    textarea:focus {
      outline: none;
    }
  }
`;

export const InputWithPrepend = styled(StyledInput)`
  .inputArea {
    display: flex;
    flex-direction: row;
    height: 3rem;
    width: 100%;
    input {
      border-radius: 0px 5px 5px 0px !important;
      border-left: 0px;
      width: 100%;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      border: 1px solid ${theme.colorPallet.lightGray};
      background-color: ${theme.colorPallet.light};
      border-radius: 5px 0px 0px 5px;
    }
  }
`;

export const InputWithAppend = styled(StyledInput)`
  .inputArea {
    display: flex;
    flex-direction: row;
    height: 3rem;
    width: 100%;
    input {
      border-radius: 5px 0px 0px 5px !important;
      border-right: 0px;
      width: 100%;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      border: 1px solid ${theme.colorPallet.lightGray};
      background-color: ${theme.colorPallet.light};
      border-radius: 0px 5px 5px 0px;
    }
  }
`;

export const InputNotEditable = styled(StyledInput)`
  padding: 0.5rem 0;
  .inputArea {
    input {
      pointer-events: none;
      background-color: ${theme.colorPallet.lightGray};
    }
  }
`;

export const SettingInput = styled(StyledInput)`
  padding: 0.5rem 0;
  .inputArea {
    input,
    textarea {
      background-color: ${theme.colorPallet.white};
    }
  }
`;
