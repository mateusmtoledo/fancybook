import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import GlobalFonts from './fonts/fonts';
import GlobalStyles from './styles/GlobalStyles';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <GlobalFonts />

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
