import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styled from 'styled-components';
import useAxios from '../../util/useAxios';
import { APIS } from '../../util/config';
import GoogleSignIn from '../Google-Signin/googleSignin';
import LoginDesign from '../../assets/Designs/LoginDesign.png';
import Logo from '../../assets/logos/Logo.png';
import Input from '../reusable/input.component';
import Button from '../reusable/button.component';
import Loader from '../reusable/loader.component';

const LoginContainer = styled.div`
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

const LoginSection = styled.div`
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

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #fff;

  @media (max-width: 768px) {
    max-width: 100%;
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
  margin: 0 0 20px;
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

const Link = styled.a`
  color: #000;
  display: inline;
  margin-bottom: 15px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
`;

const ContinueWith = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Text = styled.div`
  font-size: 14px;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const TextWithLink = styled.div`
  color: #000;
  text-align: center;
  margin-bottom: 15px;
  font-weight: normal;
  display: inline;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 15px;
`;

const LabelText = styled.label`
  font-weight:bold;
  margin-bottom: 5px;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { executeRequest } = useAxios();
  const navigate = useNavigate();
  
  const validateForm = () => {
    let formErrors = {};
    const emailOrPhoneRegex = /^(?:\d{10}|\S+@\S+\.\S+)$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!formData.emailOrPhone.match(emailOrPhoneRegex)) {
      formErrors.emailOrPhone = 'Enter a valid email or phone number';
    }else if (!formData.password.match(passwordRegex)) {
      formErrors.password = 'Password must be at least 8 characters, include one uppercase letter, one number, and one special character';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await executeRequest({
          method: 'post',
          url: APIS.LOGIN_USER,
          data: formData,
          headers: { 'Content-Type': 'application/json' },
        });
        if(response){
          localStorage.setItem('token', response);
        }
        setLoading(false);
        navigate('/home');
      } catch (error) {
        console.log(error)
        setErrors({...errors, loginError : error.response.data.error})
        setLoading(false);
        console.log(errors.loginError);
      }

    }
  };

  return (
    <LoginContainer>
      <LoginSection>
        <FormContainer>
          {loading && <Loader />}
          {errors.loginError && <p style={{color: 'red', fontSize: '12px', padding: '20px'}}>{errors.loginError}</p>}
          <Container>
            <Title>Hey, Hello 👋</Title>
            <Subtitle>Enter the information you entered while registering.</Subtitle>
            <Form onSubmit={handleSubmit}>
            <LabelText>Email</LabelText>
              <Input
                type="text"
                placeholder="Enter your email"
                value={formData.emailOrPhone}
                onChange={(value) => {setFormData({ ...formData, emailOrPhone: value });setErrors({})}}
                name="emailOrPhone"
                error={errors.emailOrPhone}
              />
              <LabelText>Password</LabelText>
              <Input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(value) => {setFormData({ ...formData, password: value });setErrors({})}}
                name="password"
                error={errors.password}
                togglePasswordVisibility={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />
              <Link href='/login/forgot-password' style={{textAlign: 'right'}}><span style={{fontWeight: 'bold'}}>Forgot Password?</span></Link>
              <Button text="Sign In" onClick={handleSubmit} />
              <Text>Or continue with</Text>
            </Form>
            <ContinueWith>
              <SocialButton>Google</SocialButton>
              <SocialButton>Apple</SocialButton>
            </ContinueWith>
            <div style={{textAlign: 'center'}}>
              <TextWithLink href="/register">Don't have an account? </TextWithLink> <Link href="/register"> Sign Up </Link>
            </div>
          </Container>
        </FormContainer>
      </LoginSection>
      <GraphicSection>
        <Image src={LoginDesign} />

        <LogoImage src={Logo} />
      </GraphicSection>
    </LoginContainer>
  );
};

export default Login;
