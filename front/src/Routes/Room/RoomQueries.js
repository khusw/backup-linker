import gql from "graphql-tag";

export const GET_ROOMS = gql`
  {
    getRooms {
      id
      name
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation createRoom($name: String!) {
    createRoom(name: $name) {
      id
      name
    }
  }
`;
