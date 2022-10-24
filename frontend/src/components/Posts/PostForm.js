import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Avatar from "../Avatar";
import SEND_ICON from '../../img/send.svg';
import api from "../../adapters/api";
import VariableHeightTextInput from "../VariableHeightTextInput";
import { Link } from "react-router-dom";
import { ErrorMessage, PostFormContainer } from "../../styles/PostForm";
import Form from "../../styles/Form";
import PostFormSkeleton from "../Skeletons/PostFormSkeleton";
import Loading from "../Loading";
import { ToastContext } from "src/contexts/ToastContext";

function PostForm({ postsLoading, setPosts }) {
  const { user } = useContext(UserContext);
  const { sendNotification } = useContext(ToastContext);
  
  const [text, setText] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  if (postsLoading) return <PostFormSkeleton /> 

  async function submitPost(event) {
    event.preventDefault();
    setFormLoading(true);
    setErrors(null);
    try {
      const response = await api.post('/posts', { text });
      setText('');
      setPosts((prev) => [response.data.post, ...prev]);
    } catch (err) {
      const { invalidFields } = err.response.data;
      if (invalidFields) {
        setErrors(invalidFields);
      } else {
        sendNotification({
          type: 'error',
          text: 'Something went wrong',
        });
      }
    }
    setFormLoading(false);
  }

  return (
    <PostFormContainer>
      { formLoading && <Loading />}
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
