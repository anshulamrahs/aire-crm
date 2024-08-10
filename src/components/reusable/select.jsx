import React from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
  margin-bottom: 15px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  border: 1px solid #fff;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const Select = ({ options, value, onChange, name, error }) => (
  <SelectWrapper>
    <StyledSelect value={value} onChange={(e) => onChange(e.target.value)} name={name}>
      {options.map((option) => (
        <option key={option.code} value={option.dial_code}>
          {option.dial_code}
        </option>
      ))}
    </StyledSelect>
    {error && <ErrorText>{error}</ErrorText>}
  </SelectWrapper>
);

export default Select;
