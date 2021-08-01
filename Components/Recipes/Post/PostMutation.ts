import { gql } from "@apollo/client";

export const TO_BOOKMARKS = gql`
  mutation toBookmarks($postID: ID) {
    toBookmarks(postID: $postID)
  }
`;
