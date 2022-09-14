import styled from "styled-components";
import Card from "../styles/Card";
import Friend from "./Friend";

const StyledFriendList = styled(Card)`
  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.6rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Friends = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  gap: 16px;
`;

function FriendList({ friends }) {

  return (
    <StyledFriendList>
      <h3>Friends</h3>
      <Friends>
        {
          friends.map((friend) =>
            <Friend friend={friend} key={friend._id} />
          )
        }
      </Friends>
    </StyledFriendList>
  );
}

export default FriendList;
