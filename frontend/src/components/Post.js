import styled from "styled-components";
import Avatar from "../styles/Avatar";
import Card from "../styles/Card";
import LIKE_ICON from "../img/thumbs-up.svg";
import COMMENT_ICON from "../img/comment.svg";
import { Link } from "react-router-dom";

const InteractButton = styled.button`
  background: none;
  border: none;
  display: flex;
  color: var(--color-white);
  align-items: center;
  font-size: 1rem;
  gap: 8px;
  cursor: pointer;
`;

const StyledPost = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 80px;
  }
  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
  }
  .post-info {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .author-name {
    font-size: 1rem;
    font-weight: 700;
  }
  .post-date {
    font-size: 0.75rem;
    color: var(--color-gray-light);
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function Post({ post }) {
  return (
    <StyledPost>
      <Link to={`/user/${post.author._id}`}>
        <div className="post-info">
          <Avatar
            alt={`${post.author.firstName}'s avatar`}
            src={post.author.avatar}
            width="36px"
            height="36px"
          />
          <div>
            <p className="author-name">{post.author.fullName}</p>
            <p className="post-date">{new Date(post.date).toLocaleString('en-US')}</p>
          </div>
        </div>
      </Link>
      <p>
        {post.text}
      </p>
      <hr />
      <div className="buttons">
        <InteractButton>
          <img
            alt="Like this post"
            src={LIKE_ICON}
            width="24px"
            height="24px"
          />
          <p>Like</p>
        </InteractButton>
        <InteractButton>
          <img
            alt="Comment on this post"
            src={COMMENT_ICON}
            width="24px"
            height="24px"
          />
          <p>Comment</p>
        </InteractButton>
      </div>
    </StyledPost>
  );
}

export default Post;
