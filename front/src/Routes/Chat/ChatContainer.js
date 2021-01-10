import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import ChatPresenter from "./ChatPresenter";
import { withRouter } from "react-router-dom";
import {
  CREATE_MESSAGE,
  GET_ROOM_BY_NAME,
  SEE_ALL_MESSAGE,
  SUBSCRIPTION_MSG,
} from "./ChatQueries";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";

export default withRouter(({ location }) => {
  const [messageArr, setMessageArr] = useState([]);
  const { pathname } = location;
  const roomName = pathname.slice(1, pathname.length);
  const [createMsg] = useMutation(CREATE_MESSAGE);

  const message = useInput("");

  let messageObj, roomNum, messageArray; // messageArray 는 useQuery 로 얻은 데이터 인데 undefined 가 아닌 데이터

  const { data: getRoom } = useQuery(GET_ROOM_BY_NAME, {
    variables: { roomName },
  });
  
  if (getRoom !== undefined) {
    const {
      getRoomByName: { id: roomId },
    } = getRoom;
    roomNum = Number(roomId);
  }

  const {
    subscribeToMore,
    data: messageList,
    error: msgQueryError,
    loading: msgQueryLoading,
  } = useQuery(SEE_ALL_MESSAGE, {
    variables: { roomId: roomNum },
  });

  if (messageList !== undefined) {
    messageArray = messageList;
  }

  useEffect(() => {
    if (msgQueryError) {
      console.error(msgQueryError);
    }
    if (messageArr) {
      setMessageArr(messageArr.seeAllMessage, [msgQueryError, messageArr]);
    }
  }, [msgQueryLoading]);

  const subscribeToNewMessage = () => {
    subscribeToMore({
      document: SUBSCRIPTION_MSG,
      updateQuery: (currentMessages, { subscriptionData }) => {
        if (!subscriptionData.data) return currentMessages;
        const newMessage = subscriptionData.data.subMessage;
        const updateMessages = currentMessages.seeAllMessage.concat(newMessage);
        setMessageArr(updateMessages);
        return { seeAllMessage: updateMessages };
      },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (message.value !== undefined || message.value !== "") {
      try {
        messageObj = await createMsg({
          variables: {
            message: message.value,
            roomId: roomNum,
          },
        });
        if (!messageObj) {
          toast.error("fail to create new message !, try again");
        }
      } catch {
        toast.error("text must be not empty");
      }
    }
  };

  return (
    <ChatPresenter
      location={location}
      message={message}
      onSubmit={onSubmit}
      messageArray={messageArray}
      subscribeToNewMessage={subscribeToNewMessage}
    />
  );
});
