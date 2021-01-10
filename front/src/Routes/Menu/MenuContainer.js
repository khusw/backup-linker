import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MenuPresenter from "./MenuPresenter";

const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default () => {
  const [logOut] = useMutation(LOG_OUT);
  return <MenuPresenter logOut={logOut} />;
};
