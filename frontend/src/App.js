import styled from "styled-components";
import Footer from "./components/Footer";
import { UserContext } from "./contexts/UserContext";
import useAuth from "./hooks/useAuth";
import { ToastContext } from "./contexts/ToastContext";
import useToastNotifications from "./hooks/useToastNotifications";
import ToastNotificationList from "./components/ToastNotificationList";
import RouteHandler from "./components/RouteHandler/RouteHandler";

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
          <RouteHandler />
          <Footer />
        </Container>
      </ToastContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
