import Avatar from "src/components/Avatar";
import styled from "styled-components";

export const FriendAvatar = styled(Avatar)`
  border-radius: 8px;
  width: 100%;
  height: min-content;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export const FriendContainer = styled.div`
  p {
    font-size: 0.9rem;
    font-weight: 500;
    text-overflow: ellipsis;
    height: 1.2em;
    overflow: hidden;
    white-space: nowrap;
  }

  @media (max-width: 650px) {
    width: 96px;
  }
`;
