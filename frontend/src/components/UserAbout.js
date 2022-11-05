import Skeleton from 'react-loading-skeleton';
import Card from 'src/styles/Card';
import styled from 'styled-components';

const NoBioMessage = styled.p`
  color: var(--color-gray-light);
`;

const UserAboutContainer = styled(Card)`
  h3,
  h4 {
    font-family: 'Outfit', sans-serif;
  }
  h3 {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }
  h4 {
    font-size: 1rem;
    margin-bottom: 4px;
    font-weight: normal;
  }
  p {
    font-size: 0.9rem;
  }
`;

function UserAbout({ bio, userLoading }) {
  return (
    <UserAboutContainer>
      <h3>About</h3>
      <div>
        <h4>Bio</h4>
        {userLoading ? (
          <p>
            <Skeleton count={3} />
          </p>
        ) : bio ? (
          <p>{bio}</p>
        ) : (
          <NoBioMessage>No information provided</NoBioMessage>
        )}
      </div>
    </UserAboutContainer>
  );
}

export default UserAbout;
