import { gql } from "@apollo/client";

export const AUTH_CHECK = gql`
  query authCheck {
    authCheck {
      password
      username
      # recipes
      subscriptions
      bookmarks
      email
    }
  }
`;