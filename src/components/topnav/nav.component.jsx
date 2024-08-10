import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logos/newlogo.png';

const LogoContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  place-items: center start;
  padding-left: 1rem;
  background-color: #333;
`;

const LogoImage = styled.img`
  width: 45px;
  height: auto;
`;

const MenuIcon = styled.div`
  margin-right: 1rem;
  justify-self: end;
`;

const NavBar = () => {
  return (
    <LogoContainer>
      <LogoImage src={Logo} alt="Logo" />
      <MenuIcon>
        <FontAwesomeIcon
          icon={faBars}
          style={{ fontSize: '2rem', color: 'white' }}
        />
      </MenuIcon>
    </LogoContainer>
  );
};

export default NavBar;
