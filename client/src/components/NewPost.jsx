import React from "react";
import { useAppContext } from "../context/appContext";
import BriefPost from "./BriefPost";

function NewPost() {
  const { posts } = useAppContext();

  function getNewPosts() {
    return posts.filter((post) => post.feature === "new");
  }
  const newPosts = getNewPosts();

  if (newPosts.length === 0) {
    return (
      <div className="new-content">
        <h3>New Posts</h3>
        <h5>No post to display...</h5>
      </div>
    );
  }

  return (
    <div className="new-content">
      <h3>New Posts</h3>
      <div className="posts">
        {newPosts.map((post) => (
          <BriefPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default NewPost;
