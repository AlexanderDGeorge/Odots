import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const FETCH_USER = gql`
  query fetchUser($id: ID!) {
    user(id: $id) {
      id
      name
      odots {
        id
        title
      }
    }
  }
`;

export const FETCH_ODOT = gql`
  query fetchOdot($id: ID!) {
    odot(id: $id) {
      id
      title
      dots {
        id
        title
      }
    }
  }
`;

export const FETCH_DOT = gql`
  query fetchDot($id: ID!) {
    dot(id: $id) {
      id
      title
    }
  }
`