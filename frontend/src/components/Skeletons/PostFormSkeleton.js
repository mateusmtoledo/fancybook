import Form from "src/styles/Form";
import { PostFormContainer } from "src/styles/PostForm";
import Skeleton from 'react-loading-skeleton';

function PostFormSkeleton() {
  return (
    <PostFormContainer>
      <Form as="div">
        <div className="post-text">
          <Skeleton circle width={36} height={36} />
          <div className="user-input">
            <Skeleton borderRadius={16} height={32} />
          </div>
        </div>
        <hr />
        <div className="actions">
          <button>
            <Skeleton circle width={32} height={32} />
          </button>
        </div>
      </Form>
    </PostFormContainer>
  );
}

export default PostFormSkeleton;
