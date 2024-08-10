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
import SuccessIcon from '../../reusable/success-icon';

const ForgotPasswordContainer = styled.div`
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

const ForgotPasswordSection = styled.div`
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
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
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

const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({ emailOrPhone: ''});
  const [errors, setErrors] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { executeRequest } = useAxios();

  
  const validateForm = () => {
    const formErrors = {};
    const emailOrPhoneRegex = /^(?:\d{10}|\S+@\S+\.\S+)$/;

    if (!formData.emailOrPhone.match(emailOrPhoneRegex)) {
      formErrors.emailOrPhone = 'Enter a valid email or phone number';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validateForm()){

      try{
        setLoading(true);
        const response = await executeRequest({
          method: 'post',
          url: APIS.sendVerificationCode,
          data: formData,
          headers: { 'Content-Type': 'application/json' },
        });
        if(response != null && response.message != null && response.message != '')
          setPopupVisible(true);
      } catch(error){
        setErrors({...errors, email:error.response.data.error})
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    const email = formData.emailOrPhone;
    navigate('/login/verify-email', {state:{email}});
  };

  return(
    <ForgotPasswordContainer>
      <ForgotPasswordSection>
        <Container>
          {loading && <Loader />}
          {errors.email && <p style={{color: 'red', fontSize: '12px'}}>{errors.email}</p>}
          <Title>Forgot Password ?</Title>
          <Subtitle>Enter your email & instructions will be sent to you!</Subtitle>
          <Form>
              <LabelText>Email</LabelText>
              <Input
                type="text"
                placeholder="Enter your email"
                value={formData.emailOrPhone}
                onChange={(value) => {setFormData({ ...formData, emailOrPhone: value }); setErrors({...errors, emailOrPhone:null})}}
                name="emailOrPhone"
                error={errors.emailOrPhone}
              />
              <Button text="Send Email" onClick={handleSubmit} />
          </Form>
          <Text>Back to <LinkToSignIn href='/login'>Sign In</LinkToSignIn></Text>
        </Container>
      </ForgotPasswordSection>
      <GraphicSection>
        <Image src={ForgetPasswordDesign} />
        <LogoImage src={Logo} />
      </GraphicSection>
      {popupVisible && (
        <PopupOverlay>
          <PopupContainer>
            <PopupTitle>
              <SuccessIcon />
            </PopupTitle>
            <PopupMessage>Please check your email for further instructions.</PopupMessage>
            <PopupButton onClick={handleClosePopup}>Okay got it!</PopupButton>
          </PopupContainer>
        </PopupOverlay>
      )}
    </ForgotPasswordContainer>
  );
};

export default ForgotPasswordForm;
