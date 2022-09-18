import styled from "styled-components";
import Avatar from "./Avatar";
import Card from "../styles/Card";
import FriendshipButtons from "./FriendshipButtons";

const StyledUserInfo = styled(Card)`
  width: 100%;
  height: max-content;
  padding: 0;
  
  .user-info {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    background: ${props => `url(${props.coverPhoto}),
      url('https://images.pexels.com/photos/706498/pexels-photo-706498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`};
    background-position: center;
    height: 220px;
    padding: 8px 32px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;

    img {
      position: relative;
      top: 32px;
    }

    h4 {
      font-size: 2rem;
      font-family: 'Outfit', sans-serif;
    }
  }

  .options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 16px;
    gap: 8px;
    min-height: 64px;

    button {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      font-size: 1.2rem;
      font-family: 'Outfit', sans-serif;
      background-color: var(--color-orange);
      color: var(--color-white);
      border-radius: 6px;
      border: none;
      cursor: pointer;
    }
  }

  @media (max-width: 650px) {
    .user-info {
      padding: 8px 16px;

      img {
        width: 104px;
        height: 104px;
      }

      h4 {
        font-size: 1.8rem;
      }
    }
  }
`;

function UserInfo({user}) {
  return (
    <StyledUserInfo coverPhoto={user.coverPhoto}>
      <div className="user-info">
        <Avatar
          user={user}
          size="128px"
        />
        <h4>{user.fullName}</h4>
      </div>
      <div className="options">
        <FriendshipButtons targetUser={user} />
      </div>
    </StyledUserInfo>
  );
}

export default UserInfo;
