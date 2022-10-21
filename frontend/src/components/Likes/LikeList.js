import styled from "styled-components";
import Card from "../../styles/Card";
import Like from "./Like";
import X_ICON from "../../img/x.svg";
import React, { useCallback, useRef } from "react";
import Modal from "../Modal";
import { useEffect } from "react";

const LikeListContainer = styled(Card)`
  width: 400px;
  max-width: 100%;
  height: 400px;
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

function LikeList({ likes, likeListVisible, setLikeListVisible, likePageNumber, hasNextLikePage, loadNextLikePage, likesLoading }) {
  const observer = useRef();

  const lastLikeRef = useCallback((node) => {
    if (likesLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextLikePage)
        loadNextLikePage();
    });
    if (node) observer.current.observe(node);
  }, [loadNextLikePage, hasNextLikePage, likesLoading]);

  useEffect(() => {
    if (likeListVisible && likePageNumber === 0) {
      loadNextLikePage();
    }
  }, [likeListVisible, likePageNumber, loadNextLikePage]);

  if (!likeListVisible) return null;

  return (
    <Modal setModalVisible={setLikeListVisible}>
      <LikeListContainer>
        <div className="header">
          <h2>Likes</h2>
          <button onClick={() => setLikeListVisible(false)}>
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
      </LikeListContainer>
    </Modal>
  );
}

export default LikeList;
