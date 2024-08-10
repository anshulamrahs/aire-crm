import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const InputBox = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

const VerificationInput = ({ length, onComplete }) => {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (e, idx) => {
    const newValue = e.target.value;
    if (/^\d$/.test(newValue) || newValue === '') {
      const newValues = [...values];
      newValues[idx] = newValue;
      setValues(newValues);

      // Focus next input
      if (newValue && idx < length - 1) {
        inputRefs.current[idx + 1].focus();
      }

      // If all inputs are filled, call onComplete
      if (newValues.every(value => value !== '')) {
        onComplete(newValues.join(''));
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && values[idx] === '' && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  return (
    <InputContainer>
      {values.map((value, idx) => (
        <InputBox
          key={idx}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          ref={el => (inputRefs.current[idx] = el)}
        />
      ))}
    </InputContainer>
  );
};

export default VerificationInput;