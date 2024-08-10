// File: src/components/Loader.js

import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const Loader = () => {
  return <LoaderWrapper>Loading...</LoaderWrapper>;
};

export default Loader;
