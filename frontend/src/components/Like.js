import styled from "styled-components";
import Avatar from "./Avatar";

const StyledLike = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function Like({ like }) {
  return (
    <StyledLike>
      <Avatar
        user={like}
        size="36px"
      />
      <p>{like.fullName}</p>
    </StyledLike>
  );
}

export default Like;
