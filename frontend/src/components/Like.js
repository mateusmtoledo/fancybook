import styled from "styled-components";
import Avatar from "./Avatar";

const StyledLike = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function Like({ author }) {
  return (
    <StyledLike>
      <Avatar
        user={author}
        size="36px"
      />
      <p>{author.fullName}</p>
    </StyledLike>
  );
}

export default Like;
