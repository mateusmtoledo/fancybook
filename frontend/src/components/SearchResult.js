import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar";

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

function SearchResult({ user }) {
  return (
    <StyledSearchResult>
      <Link to={`/user/${user._id}`}>
        <Avatar
          user={user}
        />
        <p>{user.fullName}</p>
      </Link>
    </StyledSearchResult>
  );
}

export default SearchResult;
