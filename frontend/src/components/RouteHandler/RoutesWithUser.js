import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import AccountManaement from "../../pages/AccountManagement";
import UserProfile from "../../pages/UserProfile";
import Header from "../Header/Header";
import PersonalInfo from "../AccountManagement/PersonalInfo";
import Security from "../AccountManagement/Security";

function RoutesWithUser() {


  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/manage-account" element={<AccountManaement />}>
          <Route index element={<PersonalInfo />} />
          <Route path="security" element={<Security />} />
        </Route>
      </Routes>
    </>
  )
}

export default RoutesWithUser;
