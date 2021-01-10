import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useQuery } from "@apollo/react-hooks";
import { GET_ROOMS } from "./RoomQueries";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  .Header {
    position: fixed;
    top: 0;
  }
`;

const HideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #535c68;
  opacity: 0.6;
`;

const FormContainer = styled.div`
  display: flex;
  position: fixed;
  background-color: #f5f6fa;
  min-height: 10rem;
  min-width: 20rem;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
  span {
    margin-bottom: 15px;
  }
  input {
    margin-bottom: 15px;
  }
  button {
    background-color: #1e3799;
    width: 30%;
    color: white;
    border-radius: 10px;
    font-family: "Ubuntu", sans-serif;
  }
`;

const FormText = styled.span`
  font-size: 15px;
  font-family: "Ubuntu", sans-serif;
`;

const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #a5b1c2;
  border-radius: 10px;
  box-shadow: 1px 1px 10px #8395a7;
  min-width: 23.75rem;
  width: auto;
  max-height: none;
  padding: 0.5rem 0.7rem 0 1rem;
`;

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  max-height: 85px;
  justify-content: center;
  align-items: center;
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

const RoomUL = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  svg {
    color: white;
    opacity: 0.7;
  }
`;

const RoomItem = styled.li`
  font-family: "Ubuntu", sans-serif;
`;

const CreateContainer = styled.div`
  padding-top: 1.9rem;
  padding-bottom: 1.7rem;
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.04);
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  color: #079992;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  svg {
    color: #079992;
    &:hover {
      border-bottom: 1px solid #079992;
    }
  }
  li {
    color: black;
    &:hover {
      color: #079992;
    }
  }
  span {
    &:hover {
      border-bottom: 1px solid #079992;
    }
  }
`;

export default ({ action, setAction, onSubmit, roomName }) => {
  const { data } = useQuery(GET_ROOMS);

  let roomArray;
  if (data !== undefined) {
    const { getRooms } = data;
    roomArray = getRooms;
  }

  return (
    <Wrapper>
      <Header text={"Linker"}></Header>
      {action === "showList" ? (
        <>
          <RoomWrapper>
            <RoomContainer>
              <RoomUL>
                {roomArray &&
                  roomArray.map((e) => (
                    <StyledLink to={e.name} key={e.id}>
                      <RoomItem>{e.name}</RoomItem>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </StyledLink>
                  ))}
              </RoomUL>
            </RoomContainer>
            <CreateContainer>
              <StyledLink to="/" onClick={() => setAction("makeList")}>
                <span>Create New Room</span>
              </StyledLink>
            </CreateContainer>
          </RoomWrapper>
        </>
      ) : (
        <HideWrapper className="hideWrapper">
          <FormContainer>
            <Form onSubmit={onSubmit}>
              <FormText>Room Name</FormText>
              <Input placeholder="Enter new Room name" {...roomName} />
              <Button text="Submit" />
            </Form>
          </FormContainer>
        </HideWrapper>
      )}
    </Wrapper>
  );
};
