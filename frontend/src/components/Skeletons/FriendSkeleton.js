import Skeleton from 'react-loading-skeleton';
import { FriendContainer } from 'src/styles/Friend';
import styled from 'styled-components';

const AvatarSkeleton = styled(Skeleton)`
  border-radius: 8px;
  width: 100%;
  height: min-content;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

function FriendSkeleton({ friend }) {
  return (
    <div>
      <FriendContainer>
        <AvatarSkeleton />
        <p>
          <Skeleton />
        </p>
      </FriendContainer>
    </div>
  );
}

export default FriendSkeleton;
