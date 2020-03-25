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
  mutation newOdot($title: String!, $color: String, $date: String) {
    newUserOdot(title: $title, color: $color, date: $date) {
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

export const UPDATE_ODOT = gql`
  mutation UpdateOdot($id: ID!, $title: String!, $color: String) {
    updateOdot(id: $id, title: $title, color: $color) {
      id
      title
      color
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
        detail
        complete
      }
    }
  }
`;

export const UPDATE_DOT = gql`
  mutation UpdateDot($id: ID!, $title: String, $detail: String, $complete: Boolean) {
    updateDot(id: $id, title: $title, detail: $detail, complete: $complete) {
      id
      title
      detail
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