import Card from "src/styles/Card";
import styled from "styled-components";

const UserBioContainer = styled(Card)`
  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.4rem;
  }
`;

function UserBio({ bio }) {
  if (!bio) return null;
  return (
    <UserBioContainer>
      <h3>Bio</h3>
      <p>{ bio }</p>
    </UserBioContainer>
  );
}

export default UserBio;
