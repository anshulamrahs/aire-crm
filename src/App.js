// src/App.js
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './components/topnav/nav.component';
import Header from './components/topnav/functional.nav.component';
import Footer from './components/footer/footer.component';


const AppContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;




function App() {
  const [isLandingPage, setIsLandingPage] = useState(null);
  const [isAuthPage, setIsAuthPage] = useState(null);
  const location = useLocation();
  const authRoutes = [
    '/register',
    '/login',
    '/login/forgot-password',
    '/login/verify-email',
    '/login/reset-password'
  ]
  useEffect(() => {
    setIsLandingPage(location.pathname === '/');

    // Check if current route matches any of the authRoutes, considering dynamic segments
    const isAuth = authRoutes.some(route => {
      const routeRegex = new RegExp(`^${route.replace(/:[^\s/]+/g, '([\\w-]+)')}$`);
      return routeRegex.test(location.pathname);
    });
    console.log(location.pathname);
    setIsAuthPage(isAuth);
  }, [location.pathname]);
  console.log(isAuthPage,isLandingPage)
  return (
    <AppContainer>
      {isLandingPage ? <NavBar /> : isAuthPage ? '' : <Header />}
      <Outlet />
      { isAuthPage ? '' : <Footer /> }
    </AppContainer>
  );
}

export default App;
