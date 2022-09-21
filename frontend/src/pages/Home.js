import Main from "../styles/Main";
import PostList from "../components/PostList";
import FriendRequestList from "../components/FriendRequestList";
import { useState } from "react";
import Aside from "../styles/Aside";
import usePosts from "../hooks/usePosts";

function Home() {
  const [pageNumber, setPageNumber] = useState(1);
  const { posts, hasNextPage, postsLoading } = usePosts(pageNumber);

  return (
    <>
      <Main>
        <PostList
          posts={posts}
          postsLoading={postsLoading}
          hasNextPage={hasNextPage}
          goToNextPage={() => setPageNumber(pageNumber + 1)}
          renderForm
        />
        <Aside>
          <FriendRequestList
            refreshPosts={() => setPageNumber(1)}
          />
        </Aside>
      </Main>
    </>
  );
}

export default Home;
