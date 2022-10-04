import Main from "../styles/Main";
import ManageAccountNav from "../components/ManageAccountNav";
import { Outlet } from "react-router-dom";
import { ManageAccountContainer } from "../styles/ManageAccount";

function ManageAccount() {
  return (
    <Main maxWidth="840px">
      <ManageAccountNav />
      <ManageAccountContainer>
        <Outlet />
      </ManageAccountContainer>
    </Main>
  );
}

export default ManageAccount;
