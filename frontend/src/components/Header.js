import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import SEARCH_ICON from "../img/search.svg";
import Avatar from "../styles/Avatar";

const StyledHeader = styled.header`
  background-color: var(--color-brown-dark);
  box-shadow: var(--shadow-card);
  padding: 8px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
  }
  > div {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  h1 {
    font-size: 2rem;
    color: var(--color-orange);
    font-family: 'Cabin', sans-serif;
    font-weight: 700;
  }
`;

const SearchBar = styled.div`
  background-color: var(--color-brown-light);
  height: min-content;
  border-radius: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  flex: 1 0 auto;
  max-width: 300px;

  img {
    display: block;
  }
  input {
    background: none;
    border: none;
    font-size: 1rem;
    width: 100%;
    color: var(--color-gray-light);
  }
  input:focus-visible {
    outline: none;
  }
  input::placeholder {
    color: var(--color-gray);
  }
`;

function Header() {
  const {user} = useContext(UserContext);

  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <h1>fancybook</h1>
        </Link>
        <SearchBar>
          <label htmlFor="search">
            <img alt="Search" src={SEARCH_ICON} width="20px" height="20px" />
          </label>
          <input type="text" placeholder="Search on Fancybook" id="search" />
        </SearchBar>
      </div>
      <div>
        <Avatar alt="User avatar" src={user.avatar} width="36px" height="36px" />
      </div>
    </StyledHeader>
  );
}

export default Header;
