import styled from "styled-components";

const StyledLikeCounter = styled.div`
  button {
    font-size: 0.9rem;
    :hover {
      color: var(--color-orange);
    }
  }
`;

function LikeCounter({ likeCount, setLikeListVisible }) {
  return (
    <StyledLikeCounter>
      <button onClick={() => setLikeListVisible(true)}>
        <p>
          {`${likeCount} Likes`}
        </p>
      </button>
    </StyledLikeCounter>
  );
}

export default LikeCounter;
