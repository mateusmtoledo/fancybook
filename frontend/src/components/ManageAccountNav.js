import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import BADGE_ICON from "../img/badge.svg";
import LOCK_ICON from "../img/lock.svg";

const ManageAccountNavContainer = styled.nav`
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
  gap: 8px;
  margin: 16px 0;
`;

const NavItemContainer = styled.li`
  font-size: 1rem;
  border-radius: 32px;
  padding: 8px 16px;
  background-color: ${(props) => props.isActive ? 'var(--color-brown-dark)' : null};
  img {
    width: 32px;
  }
`;

function NavItem({ uri, icon, itemName }) {
  const { pathname } = useLocation();
  const isActive = pathname === uri;

  return (
    <NavItemContainer isActive={isActive}>
      <StyledLink to={uri}>
        <img src={icon} alt={itemName} />
        <p>{itemName}</p>
      </StyledLink>
    </NavItemContainer>
  )
}

function ManageAccountNav() {
  return (
    <ManageAccountNavContainer>
      <NavList>
        <NavItem
          uri="/manage-account"
          icon={BADGE_ICON}
          itemName="Personal info"
        />
        <NavItem
          uri="/manage-account/security"
          icon={LOCK_ICON}
          itemName="Security"
        />
      </NavList>
    </ManageAccountNavContainer>
  );
}

export default ManageAccountNav;
