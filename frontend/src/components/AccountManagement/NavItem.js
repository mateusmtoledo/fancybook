import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const NavItemContainer = styled.li`
  font-size: 1rem;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: ${(props) =>
    props.isActive ? 'var(--color-brown-dark)' : null};
  color: ${(props) =>
    props.isActive ? 'var(--color-orange)' : 'var(--color-white)'};
  svg {
    fill: ${(props) =>
      props.isActive ? 'var(--color-orange)' : 'var(--color-white)'};
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
  );
}

export default NavItem;
