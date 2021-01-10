import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Category from "../Category/CategoryContainer";
import Message from "../../Components/Message";

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 80px auto min-content;
  grid-template-areas:
    "Header"
    "Workspace";
  .Header {
    box-shadow: none;
  }
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  grid-template-columns: 200px auto;
  grid-area: "Workspace";
`;

const ChatMenuContainer = styled.div`
  display: grid;
  width: 200px;
  height: 100%;
  background-color: #667aff;
  color: white;
  grid-template-rows: 80px 80px 1fr;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`;

const Title = styled.span`
  font-family: "Chelsea Market", cursive;
`;

const ItemText = styled.span`
  font-family: "Ubuntu", sans-serif;
`;

const PeopleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 20px;
  }
  span {
    margin-left: 10px;
    font-size: 20px;
  }
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`;

const ChatScreenContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 70px 1fr;
`;

const ChatScreenHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ChatScreenBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  position: fixed;
  bottom: 0;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  background-color: #b2bec3;
  border: none;
  form {
    width: 100%;
    button {
      background-color: #27ae60;
      width: 20%;
      color: white;
      border-radius: 10px;
    }
    input {
      background-color: #b2bec3;
      width: 70%;
    }
  }
  border-radius: 10px;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #667aff;
  }
`;

export default ({
  location,
  message,
  onSubmit,
  messageArray,
  subscribeToNewMessage,
}) => {
  const { pathname } = location;
  const roomName = pathname.slice(1, pathname.length);
  useEffect(() => subscribeToNewMessage(), []);

  return (
    <Wrapper>
      <Header text={"Linker"} />
      <ChatWrapper className="ChatWrapper">
        <ChatMenuContainer>
          <TitleContainer>
            <Title>{roomName} Room</Title>
          </TitleContainer>
          <PeopleContainer>
            <StyledLink to={`/${roomName}/People`}>
              <FontAwesomeIcon icon={faAddressBook} />
              <ItemText>People</ItemText>
            </StyledLink>
          </PeopleContainer>
          <Category />
        </ChatMenuContainer>
        <ChatScreenContainer>
          <ChatScreenHeader>
            <Title>{roomName}</Title>
          </ChatScreenHeader>
          <ChatScreenBox>
            {messageArray &&
              messageArray.seeAllMessage.map((e) => (
                <Message
                  text={e.text}
                  time={e.createdAt}
                  key={e.id}
                  avatar={e.sender.avatarUrl}
                />
              ))}
            <InputWrapper>
              <InputContainer className="InputContainer">
                <form onSubmit={onSubmit}>
                  <Input
                    placeholder={"Enter any words"}
                    type="text"
                    {...message}
                  />
                  <Button text={"Submit"} />
                </form>
              </InputContainer>
            </InputWrapper>
          </ChatScreenBox>
        </ChatScreenContainer>
      </ChatWrapper>
    </Wrapper>
  );
};
