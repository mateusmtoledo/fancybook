import styled from "styled-components";
import Avatar from "./Avatar";
import Card from "../styles/Card";
import FriendshipButtons from "./FriendshipButtons";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import AvatarInput from "./AvatarInput";

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

    & > *:first-child {
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
  const { user: currentUser } = useContext(UserContext);

  return (
    <StyledUserInfo coverPhoto={user.coverPhoto}>
      <div className="user-info">
        {
          user._id === currentUser._id
            ? <AvatarInput
                size="128px"
              />
            : <Avatar
                size="128px"
                user={user}
              />
        }
        <h4>{user.fullName}</h4>
      </div>
      <div className="options">
        <FriendshipButtons targetUser={user} />
      </div>
    </StyledUserInfo>
  );
}

export default UserInfo;
