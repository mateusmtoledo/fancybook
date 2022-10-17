import { useState } from "react";
import styled from "styled-components";
import LikeList from "./LikeList";

const StyledLikeCounter = styled.div`
  button {
    font-size: 0.9rem;
    :hover {
      color: var(--color-orange);
    }
  }
`;

function LikeCounter({ likes, count, loadNextLikePage, hasNextPage, likesLoading }) {
  const [listVisible, setListVisible] = useState(false);

  return (
    <StyledLikeCounter>
      <button onClick={() => setListVisible(true)}>
        <p>
          {`${count} Likes`}
        </p>
      </button>
      { listVisible
        && <LikeList
          likes={likes}
          setListVisible={setListVisible}
          loadNextLikePage={loadNextLikePage}
          hasNextPage={hasNextPage}
          likesLoading={likesLoading}/>}
    </StyledLikeCounter>
  );
}

export default LikeCounter;