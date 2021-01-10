import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import RoomPresenter from "./RoomPresenter";
import { CREATE_ROOM } from "./RoomQueries";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";

export default withRouter(() => {
  const [action, setAction] = useState("showList");

  const roomName = useInput("");

  const [createRoom] = useMutation(CREATE_ROOM);

  let newRoomObj;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (roomName.value !== "") {
      try {
        newRoomObj = await createRoom({ variables: { name: roomName.value } });
        if (!newRoomObj) {
          // when fail to create room
          toast.error("fail to create new room");
        } else {
          // when success to make room
          toast.success("success to make new room !");
          setAction("showList");
        }
      } catch {
        toast.error("occur unexpected error");
      }
    } else {
      toast.error("room name is required !");
    }
  };

  return (
    <RoomPresenter
      action={action}
      setAction={setAction}
      onSubmit={onSubmit}
      roomName={roomName}
    />
  );
});
