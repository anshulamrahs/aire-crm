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


const AddNewLeadForm = () => {
  return (
    <RegisterSection>
        <FormContainer>
            <LabelText>Name</LabelText>
            <Input label="Name" type="text" placeholder="Enter your name" />
            <LabelText>Contact</LabelText>
            <Input label="Phone Number" type="tel" placeholder="Enter your phone number" />
            <LabelText>Email</LabelText>
            <Input label="Email" type="email" placeholder="Enter your email" />
            <LabelText>Source</LabelText>
            <Input label="Source" type="text" placeholder="Enter source" />
            <LabelText>City</LabelText>
            <Input label="City" type="text" placeholder="Enter your city" />
            <LabelText>Address</LabelText>
            <Input label="Address" type="text" placeholder="Enter your address" />
            <LabelText>Budget</LabelText>
            <Input label="Budget" type="text" placeholder="Enter your budget" />
            <LabelText>Profession</LabelText>
            <Input label="Profession" type="text" placeholder="Enter your profession" />
        </FormContainer>
    </RegisterSection>
  );
};

export default AddNewLeadForm;
