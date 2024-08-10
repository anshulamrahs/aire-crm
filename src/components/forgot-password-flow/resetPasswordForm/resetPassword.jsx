import React, { useState } from 'react';
import useAxios from '../../../util/useAxios'; // Adjust path as per your project structure
import { APIS } from '../../../util/config'; // Adjust backend endpoint
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ForgetPasswordDesign from '../../../assets/Designs/ForgotPasswordDesign.png';
import Logo from '../../../assets/logos/Logo.png';
import Input from '../../reusable/input.component';
import Button from '../../reusable/button.component';
import Loader from '../../reusable/loader.component';
import { useLocation } from 'react-router-dom';
import SuccessIcon from '../../reusable/success-icon';

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

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const PopupTitle = styled.h2`
  font-size: 1.5rem;
  color: #000;
  margin-bottom: 1rem;
`;

const PopupMessage = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const PopupButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  width: 500px;

  &:hover {
    background-color: #333;
  }
`;

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({ newPassword:'',confirmPassword:''});
  const [errors, setErrors] = useState({});
  const [showNewPassword, setNewPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { executeRequest } = useAxios();
  const location = useLocation();
  
  const validateForm = () => {
    let formErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!(formData.newPassword.match(passwordRegex))) {
      formErrors.newPassword = 'Password must be at least 8 characters, include one uppercase letter, one number, and one special character';
    }else if (formData.newPassword !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }

  const resetPassword = async (e) => {
    e.preventDefault();
    if(validateForm()){
      try {
        setLoading(true);
        const newPassword = formData.newPassword;
        const email = location.state.email;
        const response = await executeRequest({
          method: 'POST',
          url: APIS.resetPassword,
          data: {newPassword, email },
          headers: { 'Content-Type': 'application/json' },
        })
        if(response != null && response.message != null && response.message != ''){
          setShowPopup(true);
        }
      } catch(error) {
        setErrors({...errors, reset:error.response.data.error})
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClosePopup = () => {
      setShowPopup(false);
      navigate('/login');
  }

  return(
    <>
      <ResetPasswordContainer>
        <ResetPasswordSection>
          <Container>
            {loading && <Loader />}
            {errors.reset && <p style={{color: 'red', fontSize: '12px'}}>{errors.reset}</p>}
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
      {showPopup && (
        <PopupOverlay>
          <PopupContainer>
            <PopupTitle>
              <SuccessIcon />
            </PopupTitle>
            <PopupMessage>Password has been reset successfully , please login with new password</PopupMessage>
            <PopupButton onClick={handleClosePopup}>Back To Login</PopupButton>
          </PopupContainer>
        </PopupOverlay>
      )}
    </>
  );
};

export default ResetPasswordForm;
