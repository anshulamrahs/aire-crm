// src/components/forms/AddNewLeadForm.js
import React from 'react';
import Input from '../reusable/input.component';
import styled from 'styled-components';

const RegisterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 1rem;
    order: 2;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LabelText = styled.label`
  font-weight:bold;
  font-size: 12px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  margin: 10px 0px;
  -webkit-appearance: none;  /* Remove default arrow */
  -moz-appearance: none; /* Firefox */
  appearance: none; /* Remove default arrow in most browsers */
  background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center;
`;


const AssignNewTask = () => {
  return (
    <RegisterSection>
        <FormContainer>
            <LabelText>Task Owner</LabelText>
            <Select>
              <option>Akshit</option>
              <option>Kirat</option>
              <option>Garry</option>
              <option>Criston</option>
            </Select>
            <LabelText>Lead</LabelText>
            <Input label="Lead" type="text" placeholder="Enter your Lead" />
            <LabelText>Listing</LabelText>
            <Input label="Listing" type="text" placeholder="Enter your listing" />
            <LabelText>Task</LabelText>
            <Select>
              <option>Call</option>
              <option>Follow Up</option>
              <option>Visit</option>
              <option>Meeting</option>
            </Select>
            <LabelText>Message</LabelText>
            <Input label="Message" type="text" placeholder="Enter your message" />
            <LabelText>Deadline Date</LabelText>
            <Input label="Address" type="date" placeholder="Enter deadline date" />
            <LabelText>Priority</LabelText>
            <Select>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Select>
            <LabelText>Status</LabelText>
            <Select>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Delayed completion</option>
              <option>Pending</option>
            </Select>
        </FormContainer>
    </RegisterSection>
  );
};

export default AssignNewTask;
