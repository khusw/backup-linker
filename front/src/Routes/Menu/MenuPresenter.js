import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faComment,
  faCog,
  faQuestionCircle,
  faTags,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Link } from "react-router-dom";

const MenuBar = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 10px #8395a7;
  background-color: #667aff;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15%;
  font-size: 30px;
  color: white;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-family: "Raleway", sans-serif;
`;

const HomeIconBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  opacity: 0.8;
`;

const FuncIconBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  opacity: 0.8;
  color: white;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;

const IconName = styled.span`
  font-size: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: #667aff;
    background-color: white;
  }
  width: ${(props) => {
    if (
      props.className === "LogOutLink" ||
      props.className === "HomeLink" ||
      props.className === "FuncLink"
    )
      return "100%";
  }};
  height: ${(props) => {
    if (props.className === "LogOutLink") return "15%";
    if (props.className === "HomeLink") return "10%";
    if (props.className === "FuncLink") return "100%";
  }};
  display: ${(props) => {
    if (
      props.className === "LogOutLink" ||
      props.className === "HomeLink" ||
      props.className === "FuncLink"
    )
      return "flex";
  }};
  justify-content: ${(props) => {
    if (
      props.className === "LogOutLink" ||
      props.className === "HomeLink" ||
      props.className === "FuncLink"
    )
      return "center";
  }};
  align-items: ${(props) => {
    if (
      props.className === "LogOutLink" ||
      props.className === "HomeLink" ||
      props.className === "FuncLink"
    )
      return "center";
  }};
`;

export default ({ logOut }) => {
  return (
    <MenuBar>
      <TitleBox>
        <Title>Linker</Title>
      </TitleBox>
      <Router>
        <StyledLink to="/" className="HomeLink">
          <HomeIconBox>
            <FontAwesomeIcon icon={faHome} />
          </HomeIconBox>
        </StyledLink>
        <FuncIconBox>
          <StyledLink to="/OTOChat" className="FuncLink">
            <IconBox>
              <FontAwesomeIcon icon={faComment} />
              <IconName /> One To One Chat
            </IconBox>
          </StyledLink>
          <StyledLink to="/RandomChat" className="FuncLink">
            <IconBox>
              <FontAwesomeIcon icon={faQuestionCircle} />
              <IconName /> Random Chat
            </IconBox>
          </StyledLink>
          <StyledLink to="/CategoryChat" className="FuncLink">
            <IconBox>
              <FontAwesomeIcon icon={faTags} />
              <IconName /> Category Chat
            </IconBox>
          </StyledLink>
          <StyledLink to="/Profile" className="FuncLink">
            <IconBox>
              <FontAwesomeIcon icon={faCog} />
              <IconName /> Profile Setting
            </IconBox>
          </StyledLink>
        </FuncIconBox>
        <StyledLink to="/" className="LogOutLink" onClick={logOut}>
          <IconBox>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <IconName /> Log Out
          </IconBox>
        </StyledLink>
      </Router>
    </MenuBar>
  );
};
