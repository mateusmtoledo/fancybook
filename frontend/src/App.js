import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import { UserContext } from "./contexts/UserContext";
import api from "./adapters/api";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Main = styled.main`
  padding: 4px;
  flex: 1;
  display: flex;
  max-width: 1064px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  column-gap: 105px;
  row-gap: 16px;

  @media(max-width: 950px) {
    flex-direction: column;
    max-width: 345px;
  }
`;

function App() {
  const [user, setUser] = useState(null);

  const login = useCallback(async () => {
    if(localStorage.getItem('token')) {
      try {
        const response = await api.get('/login');
        setUser(response.data.user);
      } catch(err) {
        localStorage.removeItem('token');
        setUser(null);
        console.log(err);
      }
    }
  }, []);

  const logout = useCallback(() => {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    login();
  }, [login]);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <Container>
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </Container>
    </UserContext.Provider>
  );
}

export default App;
