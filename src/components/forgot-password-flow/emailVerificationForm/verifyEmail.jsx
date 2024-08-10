import React, { useState } from 'react';
import useAxios from '../../../util/useAxios'; // Adjust path as per your project structure
import { APIS } from '../../../util/config'; // Adjust backend endpoint
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '../../../assets/logos/Logo.png';
import VerifyEmailDesign from '../../../assets/Designs/VerifyEmailDesign.png';
import styled from 'styled-components';
import VerificationInput from '../../verification-input/verification-input.component';

const VerifyEmailContainer = styled.div`
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

const VerifyEmailSection = styled.div`
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
  max-width: 400px;
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

const LinkToSignIn = styled.a`
  color: #000;
  margin-bottom: 30px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
`;

const Text = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 10px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    background-color: #333;
  }
  width: 360px;
`;




const VerifyEmailForm = () => {

  const [code, setCode] = useState('')
  const navigate = useNavigate();

  const handleComplete = (code) => {
    setCode(code);
  }

  const sendVerifyToken = () => {
    if(code != null || code !== '') {
      navigate('/login/reset-password');
    }
      
  }

  return (
    <VerifyEmailContainer>
      <VerifyEmailSection>
        <Container>
          <Title>Verification code</Title>
          <Subtitle>We have sent an OTP to your email address</Subtitle>
          <VerificationInput length={4} onComplete={handleComplete} />
          <Button onClick={sendVerifyToken}>Verify</Button>
          <Text>Back to <LinkToSignIn href='/login'>Sign In</LinkToSignIn></Text>
        </Container>
      </VerifyEmailSection>
      <GraphicSection>
        <Image src={VerifyEmailDesign} />
        <LogoImage src={Logo} />
      </GraphicSection>
    </VerifyEmailContainer>
  )
};

export default VerifyEmailForm;
