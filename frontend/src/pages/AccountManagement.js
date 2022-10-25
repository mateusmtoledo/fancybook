import Main from "../styles/Main";
import AccountManagementNav from "../components/AccountManagement/AccountManagementNav";
import { Outlet } from "react-router-dom";
import { AccountManagementContainer } from "../styles/AccountManagement";
import styled from "styled-components";
import { useState } from "react";
import GlobalLoading from "src/components/GlobalLoading";

const AccountManagementMain = styled(Main)`
  max-width: 840px;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

function AccountManagement() {
  const [loading, setLoading] = useState(false);

  return (
    <AccountManagementMain>
      {loading && <GlobalLoading />}
      <AccountManagementNav />
      <AccountManagementContainer>
        <Outlet context={{ setLoading }} />
      </AccountManagementContainer>
    </AccountManagementMain>
  );
}

export default AccountManagement;
