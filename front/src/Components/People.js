import React from "react";
import styled from "styled-components";
import Header from "./Header";
import SearchBox from "./SearchBox";
import ProfileIcon from "./ProfileIcon";

const PeopleContainer = styled.div``;

const GridContainer = styled.div``;

const ProfileIconContainer = styled.div``; // this information get from database

const Username = styled.span``; // this information get from database

export default () => {
  return (
    <>
      <Header text={"People"}></Header>
      <PeopleContainer>
        <SearchBox />
        <GridContainer>
          <ProfileIconContainer>
            <ProfileIcon>
              <Username>User 1</Username>
            </ProfileIcon>
          </ProfileIconContainer>
        </GridContainer>
      </PeopleContainer>
    </>
  );
};
