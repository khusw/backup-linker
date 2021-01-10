import React from "react";
import styled from "styled-components";
import DefaultIcon from "../imgs/defaultProfile.jpg";

const ProfileIconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileIcon = styled.img`
  width: 50px;
  border-radius: 20px;
  src: ${(props) => props.theme.defaultProfile};
`;

export default ({ avatar }) => {
  return (
    <ProfileIconBox className="ProfileIconBox">
      <ProfileIcon src={DefaultIcon} avatar={avatar} />
    </ProfileIconBox>
  );
};
