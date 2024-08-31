import React, { useState } from 'react';
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
  font-weight: bold;
  font-size: 12px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  margin: 10px 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: 5px 0;
`;

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

const AssignNewTask = ({formData, errors, handleChange, leadId}) => {

  return (
    <RegisterSection>
      <FormContainer>
        <LabelText>Task Owner</LabelText>
        <Select name="taskOwner" value={formData.taskOwner} onChange={handleChange}>
          <option value={formData.taskOwner}>{formData.taskOwner}</option>
          <option value="Akshit">Akshit</option>
          <option value="Kirat">Kirat</option>
          <option value="Garry">Garry</option>
          <option value="Criston">Criston</option>
        </Select>
        {errors.taskOwner && <ErrorText>{errors.taskOwner}</ErrorText>}

        <LabelText>Lead</LabelText>
        <Input
          label="Lead"
          type="text"
          name="lead"
          value={leadId}
          placeholder="Enter your Lead"
          readOnly={true}
        />
        {errors.lead && <ErrorText>{errors.lead}</ErrorText>}

        <LabelText>Listing</LabelText>
        <>
          <InputWrapper>
            <InputField 
              label="Listing"
              type="text"
              name="listing"
              value={formData.listing}
              placeholder="Enter your listing"
              onChange={handleChange}
            />
          </InputWrapper>
        </>
        {errors.listing && <ErrorText>{errors.listing}</ErrorText>}

        <LabelText>Task</LabelText>
        <Select name="task" value={formData.task} onChange={handleChange}>
          <option value="">Select Task</option>
          <option value="Call">Call</option>
          <option value="Follow Up">Follow Up</option>
          <option value="Visit">Visit</option>
          <option value="Meeting">Meeting</option>
        </Select>
        {errors.task && <ErrorText>{errors.task}</ErrorText>}

        <LabelText>Message</LabelText>
        <>
          <InputWrapper>
            <InputField 
              label="Message"
              type="text"
              name="message"
              value={formData.message}
              placeholder="Enter your message"
              onChange={handleChange}
            />
          </InputWrapper>
        </>
        {errors.message && <ErrorText>{errors.message}</ErrorText>}

        <LabelText>Deadline Date</LabelText>
        <>
          <InputWrapper>
            <InputField
              label="Deadline Date"
              type="date"
              name="deadlineDate"
              value={formData.deadlineDate}
              placeholder="Enter deadline date"
              onChange={handleChange}
            />
          </InputWrapper>
        </>
        {errors.deadlineDate && <ErrorText>{errors.deadlineDate}</ErrorText>}

        <LabelText>Priority</LabelText>
        <Select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
        {errors.priority && <ErrorText>{errors.priority}</ErrorText>}

        <LabelText>Status</LabelText>
        <Select name="status" value={formData.status} onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Delayed completion">Delayed completion</option>
          <option value="Pending">Pending</option>
        </Select>
        {errors.status && <ErrorText>{errors.status}</ErrorText>}
      </FormContainer>
    </RegisterSection>
  );
};

export default AssignNewTask;
