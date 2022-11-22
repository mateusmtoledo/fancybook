import styled from 'styled-components';
import api from '../../adapters/api';
import Avatar from '../UserDisplayInfo/Avatar';
import Card from 'src/styles/Card';
import {
  ButtonsContainer,
  CancelButton,
  SubmitButton,
} from 'src/styles/AccountManagement';
import { handleFriendshipError } from '../UserProfile/FriendshipButtons';
import { Link } from 'react-router-dom';

const FriendRequestContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 12px;
  overflow: hidden;
  gap: 8px;

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  > a {
    padding: 0;
  }

  > * {
    padding: 0 12px;
  }
`;

const FriendRequestAvatar = styled(Avatar)`
  width: 100%;
  border-radius: 0;
  aspect-ratio: 1 / 1;
  height: min-content;
`;

const AvatarContainer = styled(Link)`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  img {
    display: block;
  }
`;

function FriendRequest({ friendRequest, removeRequestFromArray }) {
  return (
    <FriendRequestContainer>
      <AvatarContainer to={`/user/${friendRequest._id}`}>
        <FriendRequestAvatar user={friendRequest} />
      </AvatarContainer>
      <p>
        <Link to={`/user/${friendRequest._id}`}>{friendRequest.fullName}</Link>
      </p>
      <ButtonsContainer column>
        <SubmitButton
          onClick={async () => {
            try {
              await api.put(`/users/${friendRequest._id.toString()}/friends`);
              removeRequestFromArray();
            } catch (err) {
              handleFriendshipError();
            }
          }}
        >
          ACCEPT
        </SubmitButton>
        <CancelButton
          onClick={async () => {
            try {
              await api.delete(
                `/users/${friendRequest._id.toString()}/friends`,
              );
              removeRequestFromArray();
            } catch (err) {
              handleFriendshipError();
            }
          }}
        >
          DECLINE
        </CancelButton>
      </ButtonsContainer>
    </FriendRequestContainer>
  );
}

export default FriendRequest;
