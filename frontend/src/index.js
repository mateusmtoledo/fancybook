import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalFonts from './fonts/fonts';
import GlobalStyles from './styles/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <GlobalFonts />
    <App />
  </React.StrictMode>
);
