import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../styles/Avatar";

const StyledSearchResult = styled.div`
  border-bottom: 1px solid var(--color-gray-dark);
  padding: 12px 0;

  :last-child {
    border-bottom: none;
  }

  a {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

function SearchResult({ user, setResultsVisible }) {
  return (
    <StyledSearchResult>
      <Link to={`/user/${user._id}`} onClick={() => setResultsVisible(false)}>
        <Avatar
          src={user.avatar}
          alt={`${user.firstName}'s avatar`}
        />
        <p>{user.fullName}</p>
      </Link>
    </StyledSearchResult>
  );
}

export default SearchResult;
