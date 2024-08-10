// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 1rem;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <p>&copy; 2024 My App. All Rights Reserved.</p>
      </FooterContainer>
      {/* <App /> */}
    </>
  );
};

export default Footer;
