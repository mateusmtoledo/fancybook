import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import api from "../adapters/api";
import SEARCH_ICON from "../img/search.svg";
import SearchResultsList from "./SearchResultsList";

const StyledSearchBar = styled.div`
  background-color: var(--color-brown-light);
  height: min-content;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  flex: 0 1 300px;
  max-width: 300px;
  position: relative;
  z-index: 1;

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

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: var(--color-gray);
  }
`;

function SearchBar() {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  useEffect(() => {
    setSearchLoading(true);
    setSearchResults([]);
    if (input) {
      const timer = setTimeout(async () => {
        const response = await api.get(`/users?search=${input}`);
        const { users } = response.data;
        setSearchResults(users);
        setSearchLoading(false);
      }, 1000);
      return (() => clearTimeout(timer));
    }
  }, [input]);
  
  const searchBar = useRef(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  useEffect(() => {
    function handleClickOut(event) {
      const path = event.composedPath();
      if(!path.includes(searchBar.current)) {
        setResultsVisible(false);
      }
    }
    document.addEventListener('click', handleClickOut);
    return () => document.removeEventListener('click', handleClickOut);
  }, []);

  return (
    <StyledSearchBar ref={searchBar}>
      <label htmlFor="search">
        <img alt="Search" src={SEARCH_ICON} width="20px" height="20px" />
      </label>
      <input
        type="text"
        placeholder="Search"
        id="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
        onFocus={() => setResultsVisible(true)}
      />
      {
        resultsVisible && input
        ? <SearchResultsList
            searchResults={searchResults}
            searchLoading={searchLoading}
            setResultsVisible={setResultsVisible}
          />
        : null
      }
    </StyledSearchBar>
  );
}

export default SearchBar;
