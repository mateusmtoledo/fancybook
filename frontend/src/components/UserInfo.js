import styled from "styled-components";
import Avatar from "../styles/Avatar";
import Card from "../styles/Card";
import USER_PLUS_ICON from "../img/user-plus.svg";

const StyledUserInfo = styled(Card)`
  width: 100%;
  height: max-content;
  padding: 0;
  
  .user-info {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    background: ${props => `url(${props.coverPhoto})`};
    background-position: center;
    height: 220px;
    padding: 8px 32px;
    border-radius: inherit;

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
`;

function UserInfo({user}) {
  const coverPhoto = user.coverPhoto
    || 'https://images.pexels.com/photos/706498/pexels-photo-706498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <StyledUserInfo coverPhoto={coverPhoto}>
      <div className="user-info">
        <Avatar
          src={user.avatar}
          alt={`${user.firstName}'s avatar`}
          width="128px"
          height="128px"
        />
        <h4>{user.fullName}</h4>
      </div>
      <div className="options">
        <button>
          <img src={USER_PLUS_ICON} alt="Add as a friend" />
          Add
        </button>
      </div>
    </StyledUserInfo>
  );
}

export default UserInfo;
