import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import Avatar from "../Avatar";
import Card from "../../styles/Card";
import SEND_ICON from '../../img/send.svg';
import api from "../../adapters/api";
import Loading from "../Loading";
import VariableHeightTextInput from "../VariableHeightTextInput";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../styles/PostForm";
import Form from "../../styles/Form";

const StyledPostForm = styled(Card)`
  position: relative;
  .post-text {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .user-input {
    flex: 1;
    position: relative;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
  }
`;

function PostForm({ refreshPosts }) {
  const { user } = useContext(UserContext);
  
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  async function submitPost(event) {
    event.preventDefault();
    setLoading(true);
    setErrors(null);
    try {
      await api.post('/posts', { text });
      setText('');
      refreshPosts();
    } catch (err) {
      const { invalidFields } = err.response.data;
      invalidFields && setErrors(invalidFields);
    }
    setLoading(false);
  }

  return (
    <StyledPostForm>
      {
        loading
        ? <Loading />
        : null
      }
      <Form onSubmit={submitPost}>
        <div className="post-text">
          <Link to={`/user/${user._id}`}>
            <Avatar
              user={user}
              size="36px"
            />
          </Link>
          <div className="user-input">
            <VariableHeightTextInput
              text={text}
              setText={setText}
              placeholder="Share your thoughts"
              aria-label="Post text"
              className={errors?.text && 'invalid'}
            />
            {errors?.text && <ErrorMessage>{errors.text.msg}</ErrorMessage>}
          </div>
        </div>
        <hr />
        <div className="actions">
          <button>
            <img
              alt="Send post"
              src={SEND_ICON}
              width="32px"
              height="32px"
            />
          </button>
        </div>
      </Form>
    </StyledPostForm>
  );
}

export default PostForm;
