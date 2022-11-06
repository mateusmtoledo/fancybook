import { useContext } from 'react';
import USER_PLUS_ICON from '../img/user-plus.svg';
import USER_X_ICON from '../img/user-x.svg';
import USER_CHECK_ICON from '../img/user-check.svg';
import USER_MINUS_ICON from '../img/user-minus.svg';
import api from '../adapters/api';
import { ToastContext } from '../contexts/ToastContext';
import styled from 'styled-components';

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

export function handleFriendshipError(err, sendNotification) {
  const message =
    typeof err.response.data === 'string'
      ? err.response.data
      : 'Something went wrong';
  sendNotification({ type: 'error', text: message });
}

function FriendshipButtons({ friendshipStatus, targetUserId }) {
  // TODO friendship status refreshing
  const { sendNotification } = useContext(ToastContext);

  if (friendshipStatus === undefined) return null;

  if (friendshipStatus === 'sent') {
    return (
      <ButtonStyled
        onClick={async () => {
          try {
            await api.delete(`/users/${targetUserId}/friends`);
          } catch (err) {
            handleFriendshipError(err, sendNotification);
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
            try {
              await api.delete(`/users/${targetUserId}/friends`);
            } catch (err) {
              handleFriendshipError(err, sendNotification);
            }
          }}
        >
          <img src={USER_X_ICON} alt="Decline friend request" />
          Decline
        </ButtonStyled>
        <ButtonStyled
          onClick={async () => {
            try {
              await api.put(`/users/${targetUserId}/friends`);
            } catch (err) {
              handleFriendshipError(err, sendNotification);
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
          try {
            await api.delete(`/users/${targetUserId}/friends`);
          } catch (err) {
            handleFriendshipError(err, sendNotification);
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
        try {
          await api.post(`/users/${targetUserId}/friends`);
        } catch (err) {
          handleFriendshipError(err, sendNotification);
        }
      }}
    >
      <img src={USER_PLUS_ICON} alt="Add as a friend" />
      Add
    </ButtonStyled>
  );
}

export default FriendshipButtons;
