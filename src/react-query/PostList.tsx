import React, { useState } from "react";
import usePostList from "./hooks/usePostList";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostList = () => {
  const pageSize: number = 10;
  const { data: posts, error, isLoading, fetchNextPage, isFetchingNextPage } = usePostList({ pageSize });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.pages.map((posts, index) => (
          <React.Fragment key={index}>
            {posts?.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button className="btn btn-primary my-3 ms-2" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
        Load More
      </button>
    </>
  );
};

export default PostList;
