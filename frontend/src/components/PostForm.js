import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import Avatar from "../styles/Avatar";
import Card from "../styles/Card";
import SEND_ICON from '../img/send.svg';
import api from "../adapters/api";
import Loading from "./Loading";

const Error = styled.p`
  color: red;
  font-size: 0.8rem;
  /* position: absolute;
  bottom: -12px; */
`;

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
  textarea {
    font-family: 'Roboto', sans-serif;
    padding: 8px;
    font-size: 1rem;
    border-radius: 16px;
    background-color: var(--color-white);
    border: none;
    width: 100%;
    color: var(--color-gray-dark);
    resize: none;
    &:focus {
      outline: none;
    }
    &.invalid {
      outline: 2px solid red;
    }
    &&::placeholder {
      color: var(--color-gray-light);
    }
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
  }
`;

function PostForm({ refreshPosts }) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  
  const [text, setText] = useState('');
  function handleChange(event) {
    const element = event.target;
    setText(element.value);
    element.style.height = "auto";
    element.style.height = element.scrollHeight + 'px';
  }

  const [error, setError] = useState(null);
  async function submitPost(event) {
    event.preventDefault();
    if (text.length < 3) {
      setError('Post must have at least 3 characters');
      return;
    }
    setLoading(true);
    try {
      await api.post('/posts', { text });
      setText('');
      setError(null);
      refreshPosts();
    } catch (err) {
      setError('Something went wrong');
    }
    setLoading(false);
  }
  
  useEffect(() => {
    if(error === 'Post must have at least 3 characters' && text.length >= 3) {
      setError(null);
    }
  }, [text, error]);

  return (
    <StyledPostForm>
      {
        loading
        ? <Loading />
        : null
      }

      <form onSubmit={submitPost}>
        <div className="post-text">
          <Avatar
            alt="User's avatar"
            src={user.avatar}
            width="36px"
            height="36px"
          />
          <div className="user-input">
            <textarea
              value={text}
              onChange={handleChange}
              placeholder="Share your thoughts"
              aria-label="Post text"
              rows="1"
              className={error ? 'invalid' : null}
            />
            {error
            ? <Error>{error}</Error>
            : null}
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
      </form>
    </StyledPostForm>
  );
}

export default PostForm;
