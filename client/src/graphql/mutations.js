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

export const DELETE_ODOT = gql`
  mutation DeleteOdot($id: ID!) {
    removeUserOdot(id: $id) {
      id
      name
      odots {
        id
        title
      }
    }
  }
`

export const NEW_DOT = gql`
  mutation NewDot($title: String!, $odotId: ID!) {
    newOdotDot(title: $title, odotId: $odotId) {
      id
      title
      dots {
        id
        title
        complete
      }
    }
  }
`;

export const UPDATE_DOT = gql`
  mutation UpdateDot($id: ID!, $title: String, $complete: Boolean) {
    updateDot(id: $id, title: $title, complete: $complete) {
      id
      title
      complete
    }
  }
`

export const DELETE_DOT = gql`
  mutation DeleteDot($odotId: ID!, $dotId: ID!) {
    removeOdotDot(odotId: $odotId, dotId: $dotId) {
      id
      title
      dots {
        id
        title
        complete
      }
    }
  }
`