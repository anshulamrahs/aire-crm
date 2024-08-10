// components/LeadActions.js
import React from 'react';
import styled from 'styled-components';

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const LeadActions = () => {
  return (
    <ActionsContainer>
      <ActionButton>WhatsApp</ActionButton>
      <ActionButton>Email</ActionButton>
      <ActionButton>Share</ActionButton>
      <ActionButton>Delete</ActionButton>
    </ActionsContainer>
  );
};

export default LeadActions;
