import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const FETCH_USER = gql`
  query fetchUser {
    user {
      id
      name
      odots {
        id
        title
        color
        date
      }
    }
  }
`;

export const FETCH_ODOT = gql`
  query fetchOdot($id: ID!) {
    odot(id: $id) {
      id
      title
      color
      date
      dots {
        id
        title
        detail
        complete
      }
    }
  }
`;

export const FETCH_DOT = gql`
  query fetchDot($id: ID!) {
    dot(id: $id) {
      id
      title
      detail
      complete
    }
  }
`