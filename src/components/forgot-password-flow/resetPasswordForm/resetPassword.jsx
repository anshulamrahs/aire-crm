import React, { useState } from 'react';
import useAxios from '../../../util/useAxios'; // Adjust path as per your project structure
import { APIS } from '../../../util/config'; // Adjust backend endpoint
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ForgetPasswordDesign from '../../../assets/Designs/ForgotPasswordDesign.png';
import Logo from '../../../assets/logos/Logo.png';
import Input from '../../reusable/input.component';
import Button from '../../reusable/button.component';

const ResetPasswordContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    overflow: auto;
  }
`;

const ResetPasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 1rem;
    order: 2;
  }
`;

const GraphicSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    order: 1;
    height: 50vh;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const LogoImage = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;

  @media (max-width: 768px) {
    width: 80px;
    top: 10px;
    right: 10px;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 540px;
  padding: 20px;
  border-radius: 8px;
`;
const Title = styled.h1`
  text-align: left;
  margin: 0 0 15px;
  font-size: 24px;
`;

const Subtitle = styled.p`
  text-align: left;
  margin: 0 0 20px;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const LinkToSignIn = styled.a`
  color: #000;
  margin-bottom: 30px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
`;

const LabelText = styled.label`
  font-weight:bold;
  margin-bottom: 5px;
`;

const Text = styled.div`
  font-size: 12px;
  text-align: left;
  margin-top: 0px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({ newPassword:'',confirmPassword:''});
  const [errors, setErrors] = useState({});
  const [showNewPassword, setNewPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  const validateForm = () => {
    let formErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!(formData.newPassword.match(passwordRegex))) {
      formErrors.newPassword = 'Password must be at least 8 characters, include one uppercase letter, one number, and one special character';
    }else if (formData.newPassword !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    console.log(formErrors);
    setErrors(formErrors);
    console.log(errors);
    console.log(Object.keys(formErrors).length === 0);
    return Object.keys(formErrors).length === 0;
  }

  const resetPassword = (e) => {
    e.preventDefault();
    if(validateForm()){
      navigate('/login')
    }
  };

  return(
    <ResetPasswordContainer>
      <ResetPasswordSection>
        <Container>
          <Title>Setup New Password</Title>
          <Subtitle>Have you already reset the password ?<LinkToSignIn href='/login'> Sign In</LinkToSignIn> </Subtitle>
          <Form>
          <LabelText>Password</LabelText>
              <Input
                type="password"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(value) => {setFormData({ ...formData, newPassword: value });setErrors({})}}
                name="newPassword"
                error={errors.newPassword}
                togglePasswordVisibility={() => setNewPassword(!showNewPassword)}
                showPassword={showNewPassword}
              />
          <LabelText>Confirm Password</LabelText>
            <Input
              type="password"
              placeholder="Enter confirm password"
              value={formData.confirmPassword}
              onChange={(value) => {setFormData({ ...formData, confirmPassword: value });setErrors({})}}
              name="confirmPassword"
              error={errors.confirmPassword}
              togglePasswordVisibility={() => setConfirmPassword(!showConfirmPassword)}
              showPassword={showConfirmPassword}
            />
            <Text>Create a strong password. Must be at least 8 character.</Text>
            <Button type="submit" onClick={(e) => resetPassword(e)} text='Create' />
          </Form>
        </Container>
      </ResetPasswordSection>
      <GraphicSection>
        <Image src={ForgetPasswordDesign} />
        <LogoImage src={Logo} />
      </GraphicSection>
    </ResetPasswordContainer>
  );
};

export default ResetPasswordForm;
