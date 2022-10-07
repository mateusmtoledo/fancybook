import styled from "styled-components";
import Loading from "./Loading";
import SearchResult from "./SearchResult";
import USER_ICON from "../img/user.svg";

const StyledSearchResultsList = styled.div`
  position: absolute;
  top: 50%;
  background-color: var(--color-brown-light);
  z-index: -1;
  padding: 28px 16px 12px;
  width: 100%;
  left: 0;
  border-radius: 0 0 16px 16px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 14px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  min-height: 48px;

  .results-type {
    display: flex;
    gap: 4px;
    font-family: 'Outfit', sans-serif;
    align-items: center;
    color: var(--color-orange);
    margin-bottom: 8px;

    h3 {
      font-weight: 300;
    }
  }

  .results-list {
    display: flex;
    flex-direction: column;
  }
`;

function SearchResultsList({ searchResults, searchLoading }) {
  return (
    <StyledSearchResultsList>
      {
        searchLoading
        ? <Loading transparent />
        : searchResults.length
        ? <>
            <div className="results-type">
              <img src={USER_ICON} alt="Users" />
              <h3>Users</h3>
            </div>
            <div className="results-list">
              {
                searchResults.map((user) =>
                  <SearchResult key={user._id} user={user} />
                )
              }
            </div>
          </>
        : <p>No results found</p>
      }
    </StyledSearchResultsList>
  );
}

export default SearchResultsList;
