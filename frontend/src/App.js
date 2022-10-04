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
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";
import ManageAccount from "./pages/ManageAccount";
import Security from "./components/Security";
import Profile from "./components/Profile";

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

  async function refreshFriends() {
    if(localStorage.getItem('token')) {
      getFriends().then((data) => setFriends(data));
    }
  }

  const login = useCallback(async () => {
    if(localStorage.getItem('token')) {
      try {
        setLoading(true);
        const response = await api.get('/login');
        setUser(response.data.user);
        await refreshFriends();
      } catch(err) {
        localStorage.removeItem('token');
        setUser(null);
        console.log(err);
      }
      setLoading(false);
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
    <UserContext.Provider value={{ user, setUser, login, logout, friends, refreshFriends }}>
      {
        loading
        ? <Loading window />
        : null
      }
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
                    <Route index element={<Profile />} />
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
    </UserContext.Provider>
  );
}

export default App;
