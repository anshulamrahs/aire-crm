// File: src/components/Button.js

import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  padding: 10px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 15px;

`;

const Button = ({ onClick, text }) => {
  return <ButtonWrapper onClick={onClick}>{text}</ButtonWrapper>;
};

export default Button;
