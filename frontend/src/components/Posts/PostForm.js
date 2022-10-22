import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Avatar from "../Avatar";
import SEND_ICON from '../../img/send.svg';
import api from "../../adapters/api";
import Loading from "../Loading";
import VariableHeightTextInput from "../VariableHeightTextInput";
import { Link } from "react-router-dom";
import { ErrorMessage, PostFormContainer } from "../../styles/PostForm";
import Form from "../../styles/Form";

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
    <PostFormContainer>
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
    </PostFormContainer>
  );
}

export default PostForm;
