import styled from 'styled-components';
import { ReactComponent as BADGE_ICON } from '../../img/badge.svg';
import { ReactComponent as LOCK_ICON } from '../../img/lock.svg';
import NavItem from './NavItem';

const AccountManagementNavContainer = styled.nav`
  height: max-content;
  display: flex;
  flex: 0 0 max-content;
  flex-direction: column;
  gap: 32px;
  font-family: 'Outfit', sans-serif;
  h2 {
    text-align: center;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 650px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

function AccountManagementNav() {
  return (
    <AccountManagementNavContainer>
      <NavList>
        <NavItem
          uri="/account-management"
          IconComponent={BADGE_ICON}
          itemName="Personal info"
        />
        <NavItem
          uri="/account-management/security"
          IconComponent={LOCK_ICON}
          itemName="Security"
        />
      </NavList>
    </AccountManagementNavContainer>
  );
}

export default AccountManagementNav;
