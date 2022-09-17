import { useState } from "react";
import styled from "styled-components";
import LikesList from "./LikesList";

const StyledLikes = styled.div`
  button {
    background: none;
    border: none;
    color: var(--color-white);
    font-size: 0.9rem;
    cursor: pointer;
    
    :hover {
      color: var(--color-orange);
    }
  }
`;

function Likes({ likes, count }) {
  const [listVisible, setListVisible] = useState(false);

  return (
    <StyledLikes>
      <button onClick={() => {
        setListVisible(true);
        document.body.style = 'overflow: hidden;';
      }}>
        <p>
          {`${count} Likes`}
        </p>
      </button>
      { listVisible
        && <LikesList
          likes={likes}
          setListVisible={setListVisible} />}
    </StyledLikes>
  );
}

export default Likes;
