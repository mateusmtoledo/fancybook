import { LikeCounterStyled } from "src/styles/LikeCounter";

function LikeCounter({ likeCount, setLikeListVisible }) {
  return (
    <LikeCounterStyled>
      <button onClick={() => setLikeListVisible(true)}>
        <p>{`${likeCount} Likes`}</p>
      </button>
    </LikeCounterStyled>
  );
}

export default LikeCounter;
