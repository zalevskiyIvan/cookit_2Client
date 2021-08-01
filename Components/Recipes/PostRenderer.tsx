import { useQuery } from "@apollo/client";
import { useState } from "react";
import { postType } from "../../common/types/postType";
import Post from "./Post/Post";
import { GET_ALL_POSTS } from "./PostsRendererQueries";
export default function PostRenderer() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(GET_ALL_POSTS, {
    variables: { limit: 3, page },
  });
  return (
    <>
      {data?.getAllRecipes?.map((post: postType) => {
        return <Post post={post} />;
      })}
    </>
  );
}
