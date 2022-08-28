import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import Avatar from "../styles/Avatar";
import Card from "../styles/Card";
import SEND_ICON from '../img/send.svg';
import api from "../adapters/api";

const StyledPostForm = styled(Card)`
  .post-text {
    display: flex;
    gap: 16px;
    align-items: center;
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
    box-sizing: content-box;
    font-family: 'Roboto', sans-serif;
    padding: 8px;
    font-size: 1rem;
    line-height: 19px;
    border-radius: 16px;
    background-color: var(--color-white);
    border: none;
    width: 100%;
    color: var(--color-gray-dark);
    resize: none;
  }
  textarea:focus-visible {
    outline: none;
  }
  textarea::placeholder {
    color: var(--color-gray-light);
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

function PostForm({ getPosts }) {
  const { user } = useContext(UserContext);
  const [text, setText] = useState('');

  function handleChange(event) {
    const element = event.target;
    setText(element.value);
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) - 16 + 'px';
  }

  async function submitPost(event) {
    event.preventDefault();
    try {
      api.post('/posts', { text });
      getPosts();
    } catch (err) {
      // TODO implement error handling
      console.log(err);
    }
  }

  return (
    <StyledPostForm>
      <form onSubmit={submitPost}>
        <div className="post-text">
          <Avatar
            alt="User's avatar"
            src={user.avatar}
            width="36px"
            height="36px"
          />
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Share your thoughts"
            aria-label="Post text"
            rows="1"
          />
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
