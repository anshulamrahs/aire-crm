// components/Header.js
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: #000;
    padding: 8px 12px;
    border-radius: 4px;

    &.active {
      background-color: black;
      color: white;
      border-radius: 10px;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Logo</Logo>
      <NavLinks>
        <NavLink exact to="/" activeClassName="active">Dashboard</NavLink>
        <NavLink to="/leads" activeClassName="active">Leads</NavLink>
        <NavLink to="/analysis" activeClassName="active">Analysis</NavLink>
        <NavLink to="/budget" activeClassName="active">Budget</NavLink>
        <NavLink to="/team-member" activeClassName="active">Team Member</NavLink>
        <NavLink to="/listing" activeClassName="active">Listing</NavLink>
        <NavLink to="/automation" activeClassName="active">Automation</NavLink>
        <NavLink to="/content" activeClassName="active">Content</NavLink>
      </NavLinks>
      <UserInfo>
        <UserAvatar />
        <span>Krat Chadha</span>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
