import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const NavStyled = styled.nav`
  flex: 0 0.7 250px;
  min-width: 150px;

  @media (max-width: 650px) {
    flex: 0 0 max-content;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 16px 8px;
  gap: 8px;

  @media (max-width: 650px) {
    padding: 8px;
    padding-bottom: 0;
    flex-direction: row;
  }
`;

export const NavLink = styled(Link)`
  padding: 8px;
  display: flex;
  gap: 8px;
  font-size: 1.2rem;
  font-family: 'Outfit', sans-serif;
  align-items: center;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 650px) {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 400px) {
    p {
      display: none;
    }
  }
`;

export const NavItemContainer = styled.li`
  overflow: hidden;
  border-radius: 8px;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--color-brown-dark)' : null};
  &:hover {
    background-color: #ffffff1a;
  }

  @media (max-width: 650px) {
    flex: 1;
  }
`;

export function NavItem({ to, children, ...props }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <NavItemContainer isActive={isActive} {...props}>
      <NavLink to={to}>{children}</NavLink>
    </NavItemContainer>
  );
}
