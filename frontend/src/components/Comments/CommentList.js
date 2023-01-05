import React, { useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Loading from "../Loading";

const CommentListContainer = styled.ul`
  margin-top: 16px;
`;

const WriteACommentButton = styled.button`
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 16px;

  :hover {
    text-decoration: underline;
  }
`;

const LoadMoreCommentsButton = styled.button`
  color: var(--color-white);
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 0.9rem;
  font-weight: 700;
  position: relative;
  margin-bottom: 8px;

  ::before {
    position: absolute;
    width: calc(100% + 32px);
    height: calc(1.6em + 8px);
    right: -16px;
    border-radius: 8px;
    transition: box-shadow 0.3s;
    content: "";
  }

  img {
    width: 20px;
    height: auto;
  }

  :hover {
    ::before {
      box-shadow: inset 0px -5px 5px -5px var(--color-orange);
    }
  }
`;

const CommentList = React.forwardRef(
  (
    {
      postId,
      comments,
      commentPageNumber,
      setComments,
      hasNextCommentPage,
      loadNextCommentPage,
      commentListVisible,
      commentsLoading,
    },
    ref
  ) => {
    useEffect(() => {
      if (commentListVisible && commentPageNumber === 0) {
        loadNextCommentPage();
      }
    }, [commentListVisible, commentPageNumber, loadNextCommentPage]);

    if (!commentListVisible) return null;

    return (
      <>
        <hr />
        <CommentListContainer>
          <CommentForm ref={ref} postId={postId} setComments={setComments} />
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
          {commentsLoading && <Loading transparent positionStatic />}
          {!commentsLoading && (
            <WriteACommentButton
              onClick={() => {
                if (ref) {
                  ref.current.focus({
                    preventScroll: true,
                  });
                  ref.current.scrollIntoView();
                }
              }}
            >
              Write a comment
            </WriteACommentButton>
          )}
          {hasNextCommentPage && !commentsLoading && (
            <LoadMoreCommentsButton onClick={loadNextCommentPage}>
              Show more comments
            </LoadMoreCommentsButton>
          )}
        </CommentListContainer>
      </>
    );
  }
);

export default CommentList;
