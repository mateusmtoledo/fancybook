import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import { UserContext } from "./contexts/UserContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import GoogleAuth from "./components/GoogleAuth";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";
import ManageAccount from "./pages/ManageAccount";
import Security from "./components/Security";
import PersonalInfo from "./components/PersonalInfo";
import ToastNotificationList from "./components/ToastNotificationList";
import { ToastContext } from "./contexts/ToastContext";
import useAuth from "./hooks/useAuth";
import useToastNotifications from "./hooks/useToastNotifications";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
  const {
    user,
    setUser,
    friends,
    refreshFriends,
    login,
    logout,
  } = useAuth();

  const {
    notifications,
    sendNotification,
  } = useToastNotifications();

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, friends, refreshFriends }}>
      <ToastContext.Provider value={{ notifications, sendNotification }}>
        <ToastNotificationList />
        <Container>
          <BrowserRouter>
            {user && <Header />}
            <Routes>
              {
                user
                ? <>
                    <Route index element={<Home friends={friends} />} />
                    <Route path="/user/:userId" element={<UserProfile />} />
                    <Route path="/manage-account" element={<ManageAccount />}>
                      <Route index element={<PersonalInfo />} />
                      <Route path="security" element={<Security />} />
                    </Route>
                  </>
                : <>
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/googleauth" element={<GoogleAuth />} />
                    <Route path="*" element={<Login />} />
                  </>
              }
            </Routes>
          </BrowserRouter>
          <Footer />
        </Container>
      </ToastContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
