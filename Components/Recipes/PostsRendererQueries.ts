import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query ($limig: Int, $page: Int) {
    getAllRecipes(limit: $limig, page: $page) {
      title
      likesCount
      comments
      description
      category
      cook
      createdAt
      _id
    }
  }
`;
