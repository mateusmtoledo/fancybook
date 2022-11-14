import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContext } from 'src/contexts/ToastContext';
import styled from 'styled-components';
import api from '../../adapters/api';
import { UserContext } from '../../contexts/UserContext';
import Form from '../../styles/Form';
import { ErrorMessage } from '../../styles/PostForm';
import Avatar from '../UserDisplayInfo/Avatar';
import Loading from '../Loading';
import VariableHeightTextInput from '../VariableHeightTextInput';

const CommentFormContainer = styled(Form)`
  position: relative;
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

function CommentForm({ postId, setComments }) {
  const { user } = useContext(UserContext);
  const [text, setText] = useState('');
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { sendNotification } = useContext(ToastContext);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrors(null);
    try {
      const response = await api.post(`/posts/${postId}/comments`, { text });
      const { comment } = response.data;
      setText('');
      setButtonsVisible(false);
      setComments((prev) => [comment, ...prev]);
    } catch (err) {
      if (!err.response.data) {
        sendNotification({
          type: 'error',
          text: 'Something went wrong',
        });
        return;
      }
      const { invalidFields } = err.response.data;
      invalidFields && setErrors(invalidFields);
    }
    setLoading(false);
  }

  return (
    <CommentFormContainer onSubmit={handleSubmit}>
      {loading && <Loading />}
      <Link to={`/user/${user._id}`}>
        <Avatar size="36px" user={user} />
      </Link>
      <CommentInputs>
        <div>
          <VariableHeightTextInput
            text={text}
            setText={setText}
            placeholder="Comment on this post"
            aria-label="Comment on this post"
            onFocus={() => setButtonsVisible(true)}
            className={errors?.text && 'invalid'}
          />
          {errors?.text && <ErrorMessage>{errors.text.msg}</ErrorMessage>}
        </div>
        {buttonsVisible && (
          <CommentButtons>
            <CancelCommentButton
              type="button"
              onClick={() => {
                setText('');
                setButtonsVisible(false);
                setErrors(null);
              }}
            >
              CANCEL
            </CancelCommentButton>
            <SubmitCommentButton>SUBMIT</SubmitCommentButton>
          </CommentButtons>
        )}
      </CommentInputs>
    </CommentFormContainer>
  );
}

export default CommentForm;
