import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import FANCYBOOK_LOGO from '../../img/logo48.png';

const StyledHeader = styled.header`
  background-color: var(--color-brown-dark);
  box-shadow: var(--shadow-card);
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  min-height: 56px;

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
    img {
      display: block;
    }
  }
`;

function Header() {
  return (
    <StyledHeader>
      <div>
        <Link to="/">
          <h1 className="desktop">fancybook</h1>
          <img
            height="39px"
            width="39px"
            className="mobile"
            src={FANCYBOOK_LOGO}
            alt="fancybook"
          />
        </Link>
        <SearchBar />
      </div>
      <div className="right-side">
        <UserMenu />
      </div>
    </StyledHeader>
  );
}

export default Header;
