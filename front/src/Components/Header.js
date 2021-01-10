import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { BrowserRouter as Router, Link } from "react-router-dom";

const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  svg {
    font-size: 30px;
  }
  box-shadow: 1px 1px 20px #8395a7;
  background-color: #667aff;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 10px;
  color: white;
  svg {
    margin-right: 5px;
    opacity: 0.7;
  }
`;

const HeaderSpan = styled.span`
  font-family: "Raleway", sans-serif;
  font-size: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
`;

export default ({ text }) => {
  const [logOut] = useMutation(LOG_OUT);
  return (
    <HeaderContainer className="Header">
      <TitleBox>
        <FontAwesomeIcon icon={faComments} />
        <HeaderSpan>{text}</HeaderSpan>
      </TitleBox>
      <TitleBox>
        <Router>
          <StyledLink to="/" onClick={logOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </StyledLink>
        </Router>
      </TitleBox>
    </HeaderContainer>
  );
};
