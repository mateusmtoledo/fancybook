import BADGE_ICON from '../../img/badge.svg';
import LOCK_ICON from '../../img/lock.svg';
import { NavList, NavStyled, NavItem } from 'src/styles/Nav';
import styled from 'styled-components';

const AccountManagementNavList = styled(NavList)`
  padding: 0;
`;

const AccountManagementNavContainer = styled(NavStyled)`
  flex: 1;
  max-width: max-content;

  @media (max-width: 650px) {
    flex: initial;
    max-width: none;
  }
`;

function AccountManagementNav() {
  return (
    <AccountManagementNavContainer>
      <AccountManagementNavList>
        <NavItem to="/account-management">
          <img
            src={BADGE_ICON}
            alt="Personal info"
            width="32px"
            height="32px"
          />
          <p>Personal info</p>
        </NavItem>
        <NavItem to="/account-management/security">
          <img src={LOCK_ICON} alt="Security" width="32px" height="32px" />
          <p>Security</p>
        </NavItem>
      </AccountManagementNavList>
    </AccountManagementNavContainer>
  );
}

export default AccountManagementNav;
