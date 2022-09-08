import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import { UserContext } from "./contexts/UserContext";
import api from "./adapters/api";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import SignUp from "./pages/SignUp";
import GoogleAuth from "./components/GoogleAuth";

async function getFriends() {
  const response = await api.get('/users/me/friends');
  return response.data;
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState({});
  const [loading, setLoading] = useState(false);

  async function getAndSetFriends() {
    getFriends().then((data) => setFriends(data));
  }

  const login = useCallback(async () => {
    if(localStorage.getItem('token')) {
      try {
        setLoading(true);
        const response = await api.get('/login');
        setUser(response.data.user);
        setLoading(false);
      } catch(err) {
        localStorage.removeItem('token');
        setUser(null);
        setLoading(false);
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
    getAndSetFriends();
  }, [login]);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {
        loading
        ? <Loading window />
        : null
      }
      <Container>
        <BrowserRouter>
          <Routes>
            {
              user
              ? <>
                  <Route index element={<Home friends={friends} />} />
                </>
              : <>
                  <Route index element={<Login />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/googleauth" element={<GoogleAuth />} />
                </>
            }
          </Routes>
        </BrowserRouter>
        <Footer />
      </Container>
    </UserContext.Provider>
  );
}

export default App;
