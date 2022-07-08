import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import HotPost from "./HotPost";
import NewPost from "./NewPost";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";

function PostsContainer() {
  const { getPosts, isLoading, numOfPages } = useAppContext();

  useEffect(() => {
    getPosts();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <div className="contents">
        <HotPost />
        <NewPost />
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </>
  );
}

export default PostsContainer;
