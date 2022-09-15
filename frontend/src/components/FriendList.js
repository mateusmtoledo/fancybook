import styled from "styled-components";
import Card from "../styles/Card";
import Friend from "./Friend";
import X_CIRCLE_ICON from "../img/x-circle.svg";

const StyledFriendList = styled(Card)`
  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.4rem;
    margin-bottom: 8px;
  }
`;

const Friends = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  gap: 16px;
`;

const NoFriends = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
  font-weight: 700;
  gap: 8px;
  opacity: 0.6;
`;

function FriendList({ friends }) {

  return (
    <StyledFriendList>
      <h3>Friends</h3>
      {
        friends.length
        ? <Friends>
            {
              friends.map((friend) =>
                <Friend friend={friend} key={friend._id} />
              )
            }
          </Friends>
        : <NoFriends>
            <img
              src={X_CIRCLE_ICON}
              alt="No friends found"
            />
            <p>No friends found</p>
          </NoFriends>
      }
    </StyledFriendList>
  );
}

export default FriendList;
