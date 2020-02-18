import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      token
      loggedIn
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      id
      loggedIn
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;

export const NEW_ODOT = gql`
  mutation NewOdot($title: String!) {
    newUserOdot(title: $title) {
      id
      name
      odots {
        id
        title
      }
    }
  }
`;

export const UPDATE_ODOT = gql`
  mutation UpdateOdot($id: ID!, $title: String!) {
    updateOdot(id: $id, title: $title) {
      id
      title
    }
  }
`;

export const NEW_DOT = gql`
  mutation NewDot($title: String!, $odotId: ID!) {
    newOdotDot(title: $title, odotId: $odotId) {
      id
      title
      dots {
        id
        title
      }
    }
  }
`;