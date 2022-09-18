import styled from "styled-components";
import Avatar from "../styles/Avatar";

const StyledLike = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function Like({ like }) {
  return (
    <StyledLike>
      <Avatar
        src={like.avatar}
        alt={`${like.firstName}'s avatar`}
        width="36px"
        height="36px"
      />
      <p>{like.fullName}</p>
    </StyledLike>
  );
}

export default Like;
