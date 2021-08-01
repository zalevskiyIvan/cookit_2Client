import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signUp($email: String, $password: String, $username: String) {
    signUp(email: $email, password: $password, username: $username) {
      email
      password
      username
      # recipes
      subscriptions
      bookmarks
    }
  }
`;

export const LOG_IN = gql`
  mutation logIn($email: String, $password: String) {
    logIn(email: $email, password: $password) {
      email
      password
      username
      # recipes
      subscriptions
      bookmarks
      # _id
    }
  }
`;
