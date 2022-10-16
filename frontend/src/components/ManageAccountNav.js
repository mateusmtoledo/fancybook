import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BADGE_ICON } from "../img/badge.svg";
import { ReactComponent as LOCK_ICON } from "../img/lock.svg";

const ManageAccountNavContainer = styled.nav`
  height: max-content;
  display: flex;
  flex: 0 0 max-content;
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
`;

const NavItemContainer = styled.li`
  font-size: 1rem;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: ${(props) => props.isActive ? 'var(--color-brown-dark)' : null};
  color: ${(props) => props.isActive ? 'var(--color-orange)' : 'var(--color-white)'};
  svg {
    fill: ${(props) => props.isActive ? 'var(--color-orange)' : 'var(--color-white)'};
    width: 30px;
    height: auto;
  }
`;

function NavItem({ uri, IconComponent, itemName }) {
  const { pathname } = useLocation();
  const isActive = pathname === uri;

  return (
    <NavItemContainer isActive={isActive}>
      <StyledLink to={uri}>
        <IconComponent viewBox="0 0 48 48" />
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
          IconComponent={BADGE_ICON}
          itemName="Personal info"
        />
        <NavItem
          uri="/manage-account/security"
          IconComponent={LOCK_ICON}
          itemName="Security"
        />
      </NavList>
    </ManageAccountNavContainer>
  );
}

export default ManageAccountNav;
