import Main from "../styles/Main";
import PostList from "../components/PostList";
import FriendRequestList from "../components/FriendRequestList";
import Aside from "../styles/Aside";
import usePosts from "../hooks/usePosts";

function Home() {
  const {
    posts,
    hasNextPage,
    postsLoading,
    refreshPosts,
    loadNextPostPage,
  } = usePosts();

  return (
    <>
      <Main>
        <PostList
          posts={posts}
          postsLoading={postsLoading}
          hasNextPage={hasNextPage}
          loadNextPostPage={loadNextPostPage}
          refreshPosts={refreshPosts}
          renderForm
        />
        <Aside>
          <FriendRequestList
            refreshPosts={refreshPosts}
          />
        </Aside>
      </Main>
    </>
  );
}

export default Home;
