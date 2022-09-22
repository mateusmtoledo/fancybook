import styled from "styled-components";
import Card from "../styles/Card";
import Like from "./Like";
import X_ICON from "../img/x.svg";
import { useCallback, useRef } from "react";

const Filler = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3E3939AA;
  z-index: 2;
  overflow: hidden;
  padding: 8px;
`;

const StyledLikesList = styled(Card)`
  width: min(400px, 100%);
  height: clamp(300px, 100%, 400px);
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-family: 'Outfit', sans-serif;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    img {
      display: block;
    }
  }

  .likes {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    list-style-type: none;

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-track {
      background: none;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--color-orange);
      border-radius: 20px;
    }
  }
`;

function LikeList({ likes, setListVisible, hasNextPage, loadNextLikePage, likesLoading }) {
  const observer = useRef();

  const lastLikeRef = useCallback((node) => {
    if (likesLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage)
        loadNextLikePage();
    });
    if (node) observer.current.observe(node);
  }, [loadNextLikePage, hasNextPage, likesLoading]);

  if (!likes) return null;

  return (
    <Filler>
      <StyledLikesList>
        <div className="header">
          <h2>Likes</h2>
          <button onClick={() => {
            setListVisible(false);
            document.body.style = '';
          }}>
            <img
              src={X_ICON}
              alt="Close like list"
              width="32px"
              height="32px"
            />
          </button>
        </div>
        <ul className="likes">
          {
            likes.map((like, index) => {
              if (index + 1 === likes.length) {
                return <Like ref={lastLikeRef} key={like._id} author={like.author} />
              }
              return <Like key={like._id} author={like.author} />
            }
            )
          }
        </ul>
      </StyledLikesList>
    </Filler>
  );
}

export default LikeList;
