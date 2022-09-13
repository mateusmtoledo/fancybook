import styled from "styled-components";
import Avatar from "../styles/Avatar";

const StyledSearchResult = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  border-bottom: 1px solid var(--color-gray-dark);
  padding: 12px 0;

  :last-child {
    border-bottom: none;
  }
`;

function SearchResult({ user }) {
  return (
    <StyledSearchResult>
      <Avatar
        src={user.avatar}
        alt={`${user.firstName}'s avatar`}
      />
      <p>{user.fullName}</p>
    </StyledSearchResult>
  );
}

export default SearchResult;
