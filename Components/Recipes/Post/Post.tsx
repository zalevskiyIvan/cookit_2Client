import { postType } from "../../../common/types/postType";
import style from "./Post.module.css";
import { format } from "timeago.js";
import { useMutation } from "@apollo/client";
import { TO_BOOKMARKS } from "./PostMutation";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../../../common/context/userContext";

export default function Post({ post }: { post: postType }) {
  const { user } = useContext(UserContext);
  console.log(user);
  
  const [isInBookmarks, setIsInBookmarks] = useState(false);
  console.log(isInBookmarks);
  
  useEffect(() => {
    user?.bookmarks.forEach((el) => el === post._id && setIsInBookmarks(true));
  }, []);

  const router = useRouter();
  const [toBookmarksM] = useMutation(TO_BOOKMARKS);

  const toBookmarks = async (postID: string) => {
    try {
      await toBookmarksM({ variables: { postID } });
    } catch (error) {
      error.graphQLErrors.forEach(
        (e: any) =>
          e.extensions?.code === "UNAUTHENTICATED" && router.push("/auth")
      );
    }
  };
  return (
    <>
      {post && (
        <div className={style.post}>
          <div className={style.post_header}>
            <img src="/img/avatar.png" alt="" />
            <h2>{post.title}</h2>
            <span>{post.createdAt && format(post.createdAt)}</span>
          </div>
          <div className={style.post_content}>
            {post.img ? (
              <img className={style.post_img} src={post.img} alt="" />
            ) : (
              <p>{post.description}</p>
            )}
          </div>

          <div className={style.post_footer}>
            <div>
              <img src="/img/like.png" alt="" />
              <strong>{post.likesCount ? post.likesCount.length : 0}</strong>
            </div>
            <div>
              <img src="/img/comments.png" alt="" />
              <strong>{post.comments?.length}</strong>
            </div>
            <div>
              {isInBookmarks ? (
                <img src="/img/inBookmarks.png" alt="" />
              ) : (
                <img
                  onClick={() => toBookmarks(post._id)}
                  src="/img/outBookmarks.png"
                  alt=""
                />
              )}
              <strong>{post.bookmarks?.length}</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
// ! Category type
