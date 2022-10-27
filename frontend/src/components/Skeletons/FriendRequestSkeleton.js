import Skeleton from "react-loading-skeleton";
import { Button, ButtonsContainer } from "src/styles/AccountManagement";
import Card from "src/styles/Card";
import styled from "styled-components";

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

const AvatarSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: 0;
`;

const ButtonSkeleton = styled(Button.withComponent('div'))`
  padding: 0;
  display: flex;
  width: 100%;
  height: 36px;

  > * {
    flex: 1;
  }
`;

function FriendRequestSkeleton() {
  return (
    <FriendRequestContainer>
      <AvatarSkeleton>
        <Skeleton
          height="100%"
          borderRadius="0"
          style={{
            bottom: '2px',
          }}
        />
        </AvatarSkeleton>
      <p><Skeleton width="120px" height="20px" /></p>
      <ButtonsContainer column>
        <ButtonSkeleton>
          <Skeleton width="100%" height="100%" />
        </ButtonSkeleton>
        <ButtonSkeleton>
          <Skeleton width="100%" height="100%" />
        </ButtonSkeleton>
      </ButtonsContainer>
    </FriendRequestContainer>
  );
}

export default FriendRequestSkeleton;
