import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../styles/Card";
import BADGE_ICON from "../img/badge.svg";
import LOCK_ICON from "../img/lock.svg";

const ManageAccountNavContainer = styled(Card)`
  padding: 32px;
  flex: 1 0 256px;
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: 'Outfit', sans-serif;
  h2 {
    text-align: center;
  }

  @media (max-width: 750px) {
    // TODO responsive design
    display: none;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavItem = styled.li`
  font-size: 1rem;
  img {
    width: 32px;
  }
`;

function ManageAccountNav() {
  return (
    <ManageAccountNavContainer as="nav">
      <h2>Manage Account</h2>
      <NavList>
        <NavItem>
          <StyledLink to="/manage-account">
            <img src={BADGE_ICON} alt="Profile" />
            <p>Profile</p>
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/manage-account/security">
            <img src={LOCK_ICON} alt="Security" />
            <p>Security</p>
          </StyledLink>
        </NavItem>
      </NavList>
    </ManageAccountNavContainer>
  );
}

export default ManageAccountNav;
