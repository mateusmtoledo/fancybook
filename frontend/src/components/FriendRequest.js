import styled from "styled-components";
import api from "../adapters/api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Avatar from "./Avatar";
import Card from "src/styles/Card";
import { ButtonsContainer, CancelButton, SubmitButton } from "src/styles/AccountManagement";
import { handleFriendshipError } from "./FriendshipButtons";
import { ToastContext } from "src/contexts/ToastContext";
import { Link } from "react-router-dom";

const FriendRequestContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0 12px;
  overflow: hidden;
  gap: 8px;

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  > a {
    padding: 0;
  }

  > * {
    padding: 0 12px;
  }
`;

const FriendRequestAvatar = styled(Avatar)`
  border-radius: 0;
  width: 100%;
  height: min-content;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

function FriendRequest({ friendRequest, refreshPosts }) {
  const { refreshFriends } = useContext(UserContext);
  const { sendNotification } = useContext(ToastContext);

  return (
    <FriendRequestContainer>
      <Link to={`/user/${friendRequest._id}`}>
        <FriendRequestAvatar user={friendRequest} />
      </Link>
      <p>
        <Link to={`/user/${friendRequest._id}`}>
          {friendRequest.fullName}
        </Link>
      </p>
      <ButtonsContainer column>
        <SubmitButton onClick={
          async () => {
            try {
              await api
                .put(`/users/${friendRequest._id.toString()}/friends`)
            } catch (err) {
              handleFriendshipError(err, sendNotification);
            }
            refreshFriends();
          }
        }>
          ACCEPT
        </SubmitButton>
        <CancelButton onClick={
          async () => {
            try {
              await api
                .delete(`/users/${friendRequest._id.toString()}/friends`)
            } catch (err) {
              handleFriendshipError(err, sendNotification);
            }
            refreshFriends();
          }
        }>
          DECLINE
        </CancelButton>
      </ButtonsContainer>
    </FriendRequestContainer>
  );
}

export default FriendRequest;
