// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from 'react-router-dom';
import router from './util/routes';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
  }

  * {
    box-sizing: border-box;
  }
`;

root.render(
  <GoogleOAuthProvider clientId="955815544053-psqq65pgnq6l5gphr2r6goqkt6u8qq9v.apps.googleusercontent.com">
      <React.StrictMode>
        <GlobalStyles />
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </React.StrictMode>
  </GoogleOAuthProvider>
);
