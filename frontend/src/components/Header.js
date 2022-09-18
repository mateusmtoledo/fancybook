import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import Avatar from "./Avatar";
import USERS_ICON from "../img/users.svg";
import SearchBar from "./SearchBar";

const StyledHeader = styled.header`
  background-color: var(--color-brown-dark);
  box-shadow: var(--shadow-card);
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

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

    &.mobile {
      color: var(--color-white);
      background-color: var(--color-orange);
      border-radius: 32px;
      width: 39px;
      height: 39px;
      text-align: center;
    }
  }

  button.mobile {
    background: none;
    border: none;
    cursor: pointer;

    img {
      display: block;
    }
  }
`;

function Header() {
  const {user} = useContext(UserContext);

  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <h1 className="desktop">fancybook</h1>
          <h1 title="fancybook" className="mobile">f</h1>
        </Link>
        <SearchBar />
      </div>
      <div className="right-side">
        <button className="mobile">
          <img
            alt="Friend requests"
            src={USERS_ICON}
            width="28px"
            height="28px"
          />
        </button>
        <Avatar user={user} size="36px" />
      </div>
    </StyledHeader>
  );
}

export default Header;
