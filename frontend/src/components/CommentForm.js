import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import Form from "../styles/Form";
import Avatar from "./Avatar";
import VariableHeightTextInput from "./VariableHeightTextInput";

const CommentFormContainer = styled(Form)`
  flex-direction: row;
  gap: 8px;
`;

const CommentInputs = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SubmitCommentButton = styled.button`
  width: max-content;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: var(--color-orange);
  color: var(--color-white);
  font-weight: 700;
  border: none;
  align-self: flex-end;
  font-size: 0.9rem;
`;

function CommentForm() {
  const { user } = useContext(UserContext);
  const [text, setText] = useState('');
  
  function handleSubmit(event) {
    event.preventDefault();
    
  }

  return (
    <CommentFormContainer onSubmit={handleSubmit}>
      <Avatar size="36px" user={user} />
      <CommentInputs>
        <VariableHeightTextInput
          text={text}
          setText={setText}
          placeholder="Comment on this post"
          aria-label="Comment on this post"
        />
        <SubmitCommentButton>
          SEND
        </SubmitCommentButton>
      </CommentInputs>
    </CommentFormContainer>
  );
}

export default CommentForm;
