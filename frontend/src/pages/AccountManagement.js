import Main from "../styles/Main";
import AccountManagementNav from "../components/AccountManagement/AccountManagementNav";
import { Outlet } from "react-router-dom";
import { AccountManagementContainer } from "../styles/AccountManagement";

function AccountManagement() {
  return (
    <Main maxWidth="840px">
      <AccountManagementNav />
      <AccountManagementContainer>
        <Outlet />
      </AccountManagementContainer>
    </Main>
  );
}

export default AccountManagement;
