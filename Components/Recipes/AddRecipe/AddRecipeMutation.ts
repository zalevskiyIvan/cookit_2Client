import { gql } from "@apollo/client";

export const ADD_RECIPE = gql`
  mutation addRecipe($recipe: RecipeI) {
    addRecipe(recipe: $recipe) {
      title
      cook
    }
  }
`;
