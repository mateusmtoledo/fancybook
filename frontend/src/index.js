import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalFonts from './fonts/fonts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalFonts />
    <App />
  </React.StrictMode>
);
