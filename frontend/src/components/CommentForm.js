import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../adapters/api";
import { UserContext } from "../contexts/UserContext";
import Form from "../styles/Form";
import Avatar from "./Avatar";
import VariableHeightTextInput from "./VariableHeightTextInput";

const CommentFormContainer = styled(Form)`
  flex-direction: row;
  gap: 16px;
`;

const CommentInputs = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const CommentButton = styled.button`
  width: 80px;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.9rem;
`;

const SubmitCommentButton = styled(CommentButton)`
  background-color: var(--color-orange);
`;

const CancelCommentButton = styled(CommentButton)`
  background-color: var(--color-gray-dark);
`;

function CommentForm({ postId, refreshComments }) {
  const { user } = useContext(UserContext);
  const [text, setText] = useState('');
  const [submitButtonVisible, setSubmitButtonVisible] = useState(false);
  
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post(`/posts/${postId}/comments`, { text });
      refreshComments();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CommentFormContainer onSubmit={handleSubmit}>
      <Link to={`/user/${user._id}`}>
        <Avatar size="36px" user={user} />
      </Link>
      <CommentInputs>
        <VariableHeightTextInput
          text={text}
          setText={setText}
          placeholder="Comment on this post"
          aria-label="Comment on this post"
          onFocus={() => setSubmitButtonVisible(true)}
          onBlur={() => setSubmitButtonVisible(false)}
        />
        { (submitButtonVisible || !!text.length) &&
          <CommentButtons>
            <CancelCommentButton
              type="button"
              onClick={() => setText('')}
            >
              CANCEL
            </CancelCommentButton>
            <SubmitCommentButton>
              SUBMIT
            </SubmitCommentButton>
          </CommentButtons>
        }
      </CommentInputs>
    </CommentFormContainer>
  );
}

export default CommentForm;
