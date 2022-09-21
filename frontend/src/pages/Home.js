import api from "../adapters/api";
import Main from "../styles/Main";
import PostList from "../components/PostList";
import FriendRequestList from "../components/FriendRequestList";
import { useState } from "react";
import { useEffect } from "react";
import Aside from "../styles/Aside";

async function getPosts(page) {
  page = page || 1;
  const response = await api.get(`/posts?page=${page}`);
  return response.data;
}

function Home() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);

  async function refreshPosts() {
    setPostsLoading(true);
    setPosts([]);
    try {
      const posts = await getPosts(1);
      setPosts(posts.posts);
      setHasNextPage(posts.hasNextPage);
      setPage(1);
    } catch (err) {
      // TODO implement error handling
      console.log(err);
    }
    setPostsLoading(false);
  }

  useEffect(() => {
    refreshPosts();
  }, []);

  async function nextPage() {
    try {
      setPostsLoading(true);
      const newPosts = await getPosts(page + 1);
      setPosts([...posts, ...newPosts.posts]);
      setHasNextPage(newPosts.hasNextPage);
      setPage(page + 1);
    } catch (err) {
      // TODO implement error handling
      console.log(err);
    }
    setPostsLoading(false);
  }

  return (
    <>
      <Main>
        <PostList
          posts={posts}
          refreshPosts={refreshPosts}
          nextPage={nextPage}
          postsLoading={postsLoading}
          hasNextPage={hasNextPage}
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
