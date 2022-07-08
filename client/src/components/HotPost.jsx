import React from "react";
import { useAppContext } from "../context/appContext";
import BriefPost from "./BriefPost";

function HotPost() {
  const { posts } = useAppContext();

  function getHotPosts() {
    return posts.filter((post) => post.feature === "hot");
  }
  const hotPosts = getHotPosts();

  return (
    <div className="hot-content">
      <h3>Hot Posts</h3>
      <div className="posts">
        {hotPosts.map((post) => (
          <React.Fragment key={post._id}>
            <BriefPost post={post} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default HotPost;
