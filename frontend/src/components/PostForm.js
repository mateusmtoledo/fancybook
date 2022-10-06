import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import Avatar from "./Avatar";
import Card from "../styles/Card";
import SEND_ICON from '../img/send.svg';
import api from "../adapters/api";
import Loading from "./Loading";
import VariableHeightTextInput from "./VariableHeightTextInput";
import { Link } from "react-router-dom";

const Error = styled.p`
  color: red;
  font-size: 0.8rem;
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
  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
  }
`;

function PostForm({ refreshPosts }) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  
  const [text, setText] = useState('');

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
      console.log(err);
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
