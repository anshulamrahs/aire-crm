// File: src/components/Input.js

import React from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputWrapper = styled.div`
  position: relative;
  height: fit-content;
  margin-bottom: 5px;
  `;
  
  const InputField = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: ${(props) => (props.type === 'password' ? '40px' : '10px')};
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 10px;

  `;

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-bottom: 15px;
  `;

const IconWrapper = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Input = ({ type, placeholder, value, onChange, name, error, togglePasswordVisibility, showPassword, readOnly }) => {
  return (
    <>
      <InputWrapper>
        <InputField
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name={name}
          readOnly = {readOnly}
        />
        {type === 'password' && (
          <IconWrapper onClick={togglePasswordVisibility}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </IconWrapper>
        )}
      </InputWrapper>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default Input;
