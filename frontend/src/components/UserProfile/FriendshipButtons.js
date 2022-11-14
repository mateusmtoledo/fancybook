import { useContext } from 'react';
import USER_PLUS_ICON from '../../img/user-plus.svg';
import USER_X_ICON from '../../img/user-x.svg';
import USER_CHECK_ICON from '../../img/user-check.svg';
import USER_MINUS_ICON from '../../img/user-minus.svg';
import api from '../../adapters/api';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { UserContext } from 'src/contexts/UserContext';

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  font-size: 1.2rem;
  font-family: 'Outfit', sans-serif;
  background-color: var(--color-orange);
  border-radius: 8px;
`;

export function handleFriendshipError() {
  // TODO implement better solution for pagination and for synchronizing data
  window.location.reload(false);
}

function FriendshipButtons({
  friendshipStatus,
  setFriendshipStatus,
  targetUserId,
  setFriends,
  setFriendCount,
}) {
  const { user } = useContext(UserContext);

  if (friendshipStatus === 'loading') {
    return <Skeleton width={110} height={32} borderRadius={8} />;
  }

  if (friendshipStatus === undefined) return null;

  if (friendshipStatus === 'sent') {
    return (
      <ButtonStyled
        onClick={async () => {
          setFriendshipStatus('loading');
          try {
            await api.delete(`/users/${targetUserId}/friends`);
            setFriendshipStatus(null);
          } catch (err) {
            handleFriendshipError(err);
          }
        }}
      >
        <img src={USER_X_ICON} alt="Cancel friend request" />
        Cancel
      </ButtonStyled>
    );
  }
  if (friendshipStatus === 'pending') {
    return (
      <>
        <ButtonStyled
          onClick={async () => {
            setFriendshipStatus('loading');
            try {
              await api.delete(`/users/${targetUserId}/friends`);
              setFriendshipStatus(null);
            } catch (err) {
              handleFriendshipError(err);
            }
          }}
        >
          <img src={USER_X_ICON} alt="Decline friend request" />
          Decline
        </ButtonStyled>
        <ButtonStyled
          onClick={async () => {
            setFriendshipStatus('loading');
            try {
              await api.put(`/users/${targetUserId}/friends`);
              setFriendshipStatus('friends');
              setFriends((previous) => [user, ...previous]);
              setFriendCount((previous) => previous + 1);
            } catch (err) {
              handleFriendshipError(err);
            }
          }}
        >
          <img src={USER_CHECK_ICON} alt="Accept friend request" />
          Accept
        </ButtonStyled>
      </>
    );
  }
  if (friendshipStatus === 'friends') {
    return (
      <ButtonStyled
        onClick={async () => {
          setFriendshipStatus('loading');
          try {
            await api.delete(`/users/${targetUserId}/friends`);
            setFriendshipStatus(null);
            setFriends((previous) =>
              previous.filter((friend) => friend._id !== user._id),
            );
            setFriendCount((previous) => previous - 1);
          } catch (err) {
            handleFriendshipError(err);
          }
        }}
      >
        <img src={USER_MINUS_ICON} alt="Remove friend" />
        Remove
      </ButtonStyled>
    );
  }
  return (
    <ButtonStyled
      onClick={async () => {
        setFriendshipStatus('loading');
        try {
          await api.post(`/users/${targetUserId}/friends`);
          setFriendshipStatus('sent');
        } catch (err) {
          handleFriendshipError(err);
        }
      }}
    >
      <img src={USER_PLUS_ICON} alt="Add as a friend" />
      Add
    </ButtonStyled>
  );
}

export default FriendshipButtons;
