import Main from "../styles/Main";
import AccountManagementNav from "../components/AccountManagement/AccountManagementNav";
import { Outlet } from "react-router-dom";
import { AccountManagementContainer } from "../styles/AccountManagement";
import styled from "styled-components";

const AccountManagementMain = styled(Main)`
  max-width: 840px;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

function AccountManagement() {
  return (
    <AccountManagementMain>
      <AccountManagementNav />
      <AccountManagementContainer>
        <Outlet />
      </AccountManagementContainer>
    </AccountManagementMain>
  );
}

export default AccountManagement;
