import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";

function RoutesWithoutUser() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default RoutesWithoutUser;
