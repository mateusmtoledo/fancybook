import styled from "styled-components";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

function CommentList({ comments }) {
  return (
    <CommentListContainer>
      <CommentForm />
      {
        comments.map((comment) => 
          <Comment key={comment._id} comment={comment} />
        )
      }
    </CommentListContainer>
  );
}

export default CommentList;
