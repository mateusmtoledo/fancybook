import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import GoogleAuth from "../GoogleAuth";
import SignUp from "../../pages/SignUp";

function RoutesWithoutUser() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/googleauth" element={<GoogleAuth />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default RoutesWithoutUser;
