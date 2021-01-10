import gql from "graphql-tag";

export const LOG_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
    $password2: String!
    $phoneNum: String!
  ) {
    createAccount(
      email: $email
      username: $username
      password: $password
      password2: $password2
      phoneNum: $phoneNum
    ) {
      token
      user {
        id
      }
    }
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
