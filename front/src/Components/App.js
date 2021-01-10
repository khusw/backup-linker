import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Helmet from "./Helmet";
import Theme from "../Styles/Theme";
import Router from "../Routes/Router";
import { BrowserRouter } from "react-router-dom";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

export default () => {
  const { data } = useQuery(QUERY);
  let isLoggedIn;

  if (data !== undefined) {
    isLoggedIn = data.isLoggedIn;
  }

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Helmet />
        <BrowserRouter>
          <Router isLoggedIn={isLoggedIn} />
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
};
