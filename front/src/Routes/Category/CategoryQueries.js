import gql from "graphql-tag";

export const GET_CATEGORIRES = gql`
  {
    getCategories {
      id
      name
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($name: String!) {
    deleteCategory(name: $name)
  }
`;

export const SUBSCRIPTION_CATEGORY = gql`
  subscription {
    subCategory {
      id
      name
    }
  }
`;
