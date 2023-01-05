import UserDisplayInfo from "../UserDisplayInfo/UserDisplayInfo";
import useLikes from "../../hooks/useLikes";
import useComments from "../../hooks/useComments";
import { useRef, useState } from "react";
import LikeList from "../Likes/LikeList";
import LikeButton from "../Likes/LikeButton";
import LikeCounter from "../Likes/LikeCounter";
import CommentCounter from "../Comments/CommentCounter";
import CommentButton from "../Comments/CommentButton";
import CommentList from "../Comments/CommentList";
import {
  PostContainer,
  PostStatsContainer,
  ButtonsContainer,
  PostText,
} from "src/styles/Post";
import { useStateWithCallbackLazy } from "use-state-with-callback";

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

  const [commentListVisible, setCommentListVisible] =
    useStateWithCallbackLazy(false);
  const {
    comments,
    setComments,
    commentPageNumber,
    loadNextCommentPage,
    hasNextCommentPage,
    commentCount,
    commentsLoading,
  } = useComments(post._id, post.commentCount);

  const commentInputRef = useRef(null);
  function focusCommentInput() {
    if (!commentListVisible) {
      setCommentListVisible(true, () => commentInputRef.current.focus());
      return;
    }
    commentInputRef.current.focus();
  }

  return (
    <PostContainer>
      <UserDisplayInfo
        user={post.author}
        postDate={post.date}
        avatarSize="36px"
        marginBottom="16px"
        bold
      />
      <PostText>{post.text}</PostText>
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
      <hr />
      <ButtonsContainer>
        <LikeButton
          setLikes={setLikes}
          setLikeCount={setLikeCount}
          userHasLiked={userHasLiked}
          setUserHasLiked={setUserHasLiked}
          postId={post._id}
          likePageNumber={likePageNumber}
          likesLoading={likesLoading}
        />
        <CommentButton
          commentListVisible={commentListVisible}
          focusCommentInput={focusCommentInput}
        />
      </ButtonsContainer>
      <LikeList
        likes={likes}
        likeListVisible={likeListVisible}
        setLikeListVisible={setLikeListVisible}
        likePageNumber={likePageNumber}
        hasNextLikePage={hasNextLikePage}
        loadNextLikePage={loadNextLikePage}
        likesLoading={likesLoading}
      />
      <CommentList
        postId={post._id}
        comments={comments}
        commentPageNumber={commentPageNumber}
        setComments={setComments}
        hasNextCommentPage={hasNextCommentPage}
        loadNextCommentPage={loadNextCommentPage}
        commentListVisible={commentListVisible}
        commentsLoading={commentsLoading}
        ref={commentInputRef}
      />
    </PostContainer>
  );
}

export default Post;
