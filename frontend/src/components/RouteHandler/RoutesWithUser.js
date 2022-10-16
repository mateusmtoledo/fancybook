import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import ManageAccount from "../../pages/ManageAccount";
import UserProfile from "../../pages/UserProfile";
import Header from "../Header";
import PersonalInfo from "../PersonalInfo";
import Security from "../Security";

function RoutesWithUser() {


  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/manage-account" element={<ManageAccount />}>
          <Route index element={<PersonalInfo />} />
          <Route path="security" element={<Security />} />
        </Route>
      </Routes>
    </>
  )
}

export default RoutesWithUser;
