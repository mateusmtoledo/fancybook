import styled from 'styled-components';
import Footer from './components/Footer';
import { UserContext } from './contexts/UserContext';
import useAuth from './hooks/useAuth';
import { ToastContext } from './contexts/ToastContext';
import useToastNotifications from './hooks/useToastNotifications';
import ToastNotificationList from './components/ToastNotificationList';
import RouteHandler from './components/RouteHandler/RouteHandler';
import { SkeletonTheme } from 'react-loading-skeleton';
import GlobalLoading from './components/GlobalLoading';
import { useState } from 'react';
import { GlobalLoadingContext } from './contexts/GlobalLoadingContext';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
  const { user, setUser, login, logout, userLoading } = useAuth();

  const { notifications, sendNotification } = useToastNotifications();

  const [globalLoading, setGlobalLoading] = useState(false);

  if (userLoading) return <GlobalLoading />;

  return (
    <SkeletonTheme
      baseColor="var(--color-brown)"
      highlightColor="var(--color-brown-light)"
      duration={2.5}
    >
      <GlobalLoadingContext.Provider
        value={{ globalLoading, setGlobalLoading }}
      >
        <UserContext.Provider value={{ user, setUser, login, logout }}>
          <ToastContext.Provider value={{ notifications, sendNotification }}>
            {globalLoading && <GlobalLoading />}
            <ToastNotificationList />
            <Container>
              <RouteHandler />
              <Footer />
            </Container>
          </ToastContext.Provider>
        </UserContext.Provider>
      </GlobalLoadingContext.Provider>
    </SkeletonTheme>
  );
}

export default App;
