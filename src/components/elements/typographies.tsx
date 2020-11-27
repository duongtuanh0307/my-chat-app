import styled from "styled-components";
import theme from "../../theme";

export const H4 = styled.h4`
  font-family: "Public Sans", sans-serif;
  color: ${theme.colorPallet.darkText};
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  padding: 0;
`;

export const H5 = styled.h5`
  font-family: "Public Sans", sans-serif;
  color: ${theme.colorPallet.darkText};
  font-weight: 600;
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
  padding: 0;
`;

export const H6 = styled.h6`
  font-family: "Public Sans", sans-serif;
  color: ${theme.colorPallet.darkText};
  font-weight: 600;
  font-size: 0.9rem;
  margin: 0 0 0.25rem 0;
  padding: 0;
`;

export const DarkText = styled.p`
  font-family: "Public Sans", sans-serif;
  color: ${theme.colorPallet.darkText};
  font-size: 1rem;
  padding: 0;
  margin: 0;
`;

export const LightText = styled.p`
  font-family: "Public Sans", sans-serif;
  color: ${theme.colorPallet.secondary};
  font-size: 1rem;
  padding: 0;
  margin: 0;
`;

export const LightTextCentered = styled(LightText)`
  text-align: center;
`;

export const StyledLink = styled.span`
  a {
    font-family: "Public Sans", sans-serif;
    color: ${theme.colorPallet.primary};
    font-weight: 600;
    text-decoration-line: none !important;
    font-size: 0.9rem;
    padding: 0;
    margin: 0;
    &:hover {
      cursor: pointer;
      color: ${theme.colorPallet.blue};
    }
  }
`;

export const ErrorMessage = styled.p`
  font-family: "Public Sans", sans-serif;
  color: ${theme.colorPallet.danger};
  text-align: center;
`;
