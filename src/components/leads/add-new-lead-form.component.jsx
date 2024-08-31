// src/components/forms/AddNewLeadForm.js
import React, { useState } from 'react';
import Input from '../reusable/input.component';
import styled from 'styled-components';
import { useScrollTrigger } from '@mui/material';
import MiniLoader from '../reusable/miniLoader';

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


const AddNewLeadForm = ({setErrors, setFormData, errors, formData, loading, data}) => {

  return (
    <RegisterSection>
        <FormContainer>
        {loading && <MiniLoader />}
            <LabelText>Name</LabelText>
            <Input
                label="Name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(value) => {setFormData({ ...formData, name: value });setErrors({...errors, name:''})}}
                name="name"
                error={errors.name}
              />
            <LabelText>Contact</LabelText>
            <Input 
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.contact}
              onChange={(value) => {setFormData({ ...formData, contact: value });setErrors({...errors, contact:''})}}
              name="name"
              error={errors.contact}
            />
            <LabelText>Email</LabelText>
            <Input 
              label="Email" 
              type="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={(value) => {setFormData({ ...formData, email: value });setErrors({...errors, email:''})}}
              name="email"
              error={errors.email}  
            />
            <LabelText>Source</LabelText>
            <Input 
              label="Source" 
              type="text" 
              placeholder="Enter source" 
              value={formData.source}
              onChange={(value) => {setFormData({ ...formData, source: value });setErrors({...errors, source:''})}}
              name="source"
              error={errors.source}   
            />
            <LabelText>City</LabelText>
            <Input 
              label="City" 
              type="text" 
              placeholder="Enter your city" 
              value={formData.city}
              onChange={(value) => {setFormData({ ...formData, city: value });setErrors({...errors, city:''})}}
              name="city"
              error={errors.city} 
            />
            <LabelText>Address</LabelText>
            <Input 
              label="Address" 
              type="text" 
              placeholder="Enter your address" 
              value={formData.address}
              onChange={(value) => {setFormData({ ...formData, address: value });setErrors({...errors, address:''})}}
              name="address"
              error={errors.address} 
            />
            <LabelText>Budget</LabelText>
            <Input 
              label="Budget" 
              type="text" 
              placeholder="Enter your budget" 
              value={formData.budget}
              onChange={(value) => {setFormData({ ...formData, budget: value });setErrors({...errors, budget:''})}}
              name="email"
              error={errors.budget} 
            />
            <LabelText>Profession</LabelText>
            <Input 
              label="Profession" 
              type="text" 
              placeholder="Enter your profession" 
              value={formData.profession}
              onChange={(value) => {setFormData({ ...formData, profession: value });setErrors({...errors, profession:''})}}
              name="email"
              error={errors.profession} 
            />
        </FormContainer>
    </RegisterSection>
  );
};

export default AddNewLeadForm;
