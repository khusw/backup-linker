import React from "react";
import styled from "styled-components";
import ProfileIcon from "./ProfileIcon";

const MessageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 10px;
  margin-top: 20px;
  margin-right: 10px;
`;

const MsgContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MsgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin-bottom: 10px;
`;

const Msg = styled.span`
  font-size: 20px;
  padding: 20px 10px;
`;

export default ({ text, avatar }) => {
  return (
    <MessageWrapper className="MessageWrapper">
      <MsgContainer>
        <ProfileIcon avatar={avatar} />
        <ColumnBox>
          <MsgBox>
            <Msg> {text} </Msg>
          </MsgBox>
        </ColumnBox>
      </MsgContainer>
    </MessageWrapper>
  );
};
