import styled from "styled-components";
import Card from "../styles/Card";
import Like from "./Like";
import X_ICON from "../img/x.svg";

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
  height: clamp(300px, 100%, 500px);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      display: block;
    }
  }

  h2 {
    font-family: 'Outfit', sans-serif;
  }
`;

function LikesList({ likes, setListVisible }) {
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
        <div className="Likes">
          {
            likes.map((like) =>
              <Like key={like._id} like={like} />
            )
          }
        </div>
      </StyledLikesList>
    </Filler>
  );
}

export default LikesList
