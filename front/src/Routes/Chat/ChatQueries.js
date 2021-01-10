import gql from "graphql-tag";

export const SUBSCRIPTION_MSG = gql`
  subscription {
    subMessage {
      id
      text
      room {
        id
        name
      }
      sender {
        id
        username
        avatarUrl
      }
      createdAt
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($message: String!, $roomId: Int!) {
    createMessage(message: $message, roomId: $roomId) {
      id
      text
      sender {
        id
        username
      }
      createdAt
    }
  }
`;

export const SEE_ALL_MESSAGE = gql`
  query seeAllMessage($roomId: Int!) {
    seeAllMessage(roomId: $roomId) {
      id
      text
      room {
        id
        name
      }
      sender {
        id
        username
        avatarUrl
      }
      createdAt
    }
  }
`;

export const GET_ROOM_BY_NAME = gql`
  query getRoomByName($roomName: String!) {
    getRoomByName(roomName: $roomName) {
      id
    }
  }
`;
