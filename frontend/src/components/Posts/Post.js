import UserDisplayInfo from "../UserDisplayInfo";
import useLikes from "../../hooks/useLikes";
import useComments from "../../hooks/useComments";
import { useState } from "react";
import LikeList from "../Likes/LikeList";
import LikeButton from "../Likes/LikeButton";
import LikeCounter from "../Likes/LikeCounter";
import CommentCounter from "../Comments/CommentCounter";
import CommentButton from "../Comments/CommentButton";
import CommentList from "../Comments/CommentList";
import { PostContainer, PostStatsContainer, ButtonsContainer } from "src/styles/Post";

function Post({ post }) {
  const [likeListVisible, setLikeListVisible] = useState(false);
  const {
    likes,
    setLikes,
    likeCount,
    setLikeCount,
    likePageNumber,
    hasNextLikePage,
    loadNextLikePage,
    userHasLiked,
    setUserHasLiked,
    likesLoading,
  } = useLikes(post._id, post.likeCount, post.userHasLiked);

  const [commentListVisible, setCommentListVisible] = useState(false);
  const {
    comments,
    setComments,
    commentPageNumber,
    loadNextCommentPage,
    hasNextCommentPage,
    commentCount,
  } = useComments(post._id, post.commentCount);

  return (
    <PostContainer>
      <UserDisplayInfo
        user={post.author}
        postDate={post.date}
        bold
      />
      <p>
        {post.text}
      </p>
      <hr />
      <PostStatsContainer>
        <LikeCounter
          likeCount={likeCount}
          setLikeListVisible={setLikeListVisible}
        />
        <CommentCounter
          commentCount={commentCount}
          setCommentListVisible={setCommentListVisible}
        />
      </PostStatsContainer>
      <ButtonsContainer>
        <LikeButton
          setLikes={setLikes}
          setLikeCount={setLikeCount}
          userHasLiked={userHasLiked}
          setUserHasLiked={setUserHasLiked}
          postId={post._id}
        />
        <CommentButton
          commentListVisible={commentListVisible}
          setCommentListVisible={setCommentListVisible}
        />
      </ButtonsContainer>
      <LikeList
        likes={likes}
        likeListVisible={likeListVisible}
        setLikeListVisible={setLikeListVisible}
        likePageNumber={likePageNumber}
        hasNextLikePage={hasNextLikePage}
        loadNextLikePage={loadNextLikePage}
        loading={likesLoading}
      />
      <CommentList
        postId={post._id}
        comments={comments}
        commentPageNumber={commentPageNumber}
        setComments={setComments}
        hasNextCommentPage={hasNextCommentPage}
        loadNextCommentPage={loadNextCommentPage}
        commentListVisible={commentListVisible}
      />
    </PostContainer>
  );
}

export default Post;
