import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../reusable/input.component';
import Button from '../reusable/button.component';
import Loader from '../reusable/loader.component';
import Logo from '../../assets/logos/Logo.png';
import RegisterDesign from '../../assets/Designs/RegisterDesign.png';
import countryCodes from '../../util/countrycodes.json';
import Select from '../reusable/select';
import useAxios from '../../util/useAxios';
import { APIS } from '../../util/config';


const RegisterContainer = styled.div`
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

const RegisterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
  background-color: #fff;
  overflow: hidden; /* Prevent scrolling of the entire section */

  @media (max-width: 768px) {
    padding: 1rem;
    order: 2;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 530px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto; /* Enable scrolling within the form container */
  max-height: 100vh; /* Set a max height for the form */
  
  &::-webkit-scrollbar {
    width: 5px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background: black; /* Color of the scrollbar */
    border-radius: 10px; /* Rounded corners of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #fff; /* Background color of the scrollbar track */
  }
`;

const GraphicSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  overflow-y: hidden;
  height: 100%;

  @media (max-width: 768px) {
    order: 1;
    height: 50vh;
  }
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

const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
  height: 40px;

  & > * {
    border: none;
    outline: none;
    height: 100%;
  }

  & > div {
    flex: 0 0 20%;
    padding: 0 10px;
    border-right: 2px solid #ddd;
  }

  & > input {
    flex: 1;
    padding: 0 10px;
  }
`;

const Text = styled.p`
  color: #000;
  text-align: left;
  margin-bottom: 25px;
  margin-top: 0px;
  font-weight: bold;
  font-size: 12px;
  display: inline-block;
`;

const TextWithLink = styled.div`
  color: #000;
  text-align: center;
  margin-bottom: 15px;
  font-weight: normal;
  display: inline;
`;

const LabelText = styled.label`
  font-weight:bold;
  margin-bottom: 5px;
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-bottom: 15px;
`;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', contact: '', countryCode:'+91' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(null);

  const { executeRequest } = useAxios();

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const contactRegex = /^\+\d{1,3}\d{9,}$/;
    const contactWithCountryCode = formData.countryCode + formData.contact;
    if (formData.name.trim() === '') {
      formErrors.name = 'Name is required';
    }
    if (!formData.email.match(emailRegex)) {
      formErrors.email = 'Enter a valid email';
    }
    if (!formData.password.match(passwordRegex)) {
      formErrors.password = 'Password must be at least 8 characters, include one uppercase letter, one number, and one special character';
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    if (!contactWithCountryCode.match(contactRegex)) {
      formErrors.contact = 'Enter a valid contact number with country code';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await executeRequest({
          method: 'post',
          url: APIS.REGISTER_USER,
          data: formData,
          headers: { 'Content-Type': 'application/json' },
        });
        setData(response.message);
        setFormData({
          name: '',
          email: '',
          newPassword: '',
          confirmPassword: '',
          contact: '',
        }); 
      } catch(error) {
        setErrors({...errors, registerError:error.response.data.error});
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <RegisterContainer>
      <RegisterSection>
        {loading && <Loader />}
        {errors.registerError && <p style={{color: 'red', fontSize: '12px', padding: '20px'}}>{errors.registerError}</p>}
        {data && <p style={{color: '#4CAF50', fontSize: '12px', padding: '20px'}}>{data}</p>}
        <Container>
          <Title>Hey, Hello 👋</Title>
          <Subtitle>create an acoount to start using AIRE.</Subtitle>
          <Form onSubmit={handleSubmit}>
            <LabelText htmlFor="name">Name</LabelText>
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(value) => {setFormData({ ...formData, name: value }); setErrors({...errors,name:null})}}
              name="name"
              error={errors.name}
            />
            <LabelText htmlFor="email">Email</LabelText>
            <Input
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(value) => {setFormData({ ...formData, email: value }); setErrors({...errors,email:null})}}
              name="email"
              error={errors.email}
            />
            <LabelText htmlFor="password">Password</LabelText>
            <Input
              type="password"
              placeholder="New Password"
              value={formData.password}
              onChange={(value) => {setFormData({ ...formData, password: value }); setErrors({...errors, password:null})}}
              name="password"
              error={errors.password}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />
            <LabelText htmlFor="confirmPassword">Confirm Password</LabelText>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(value) => {setFormData({ ...formData, confirmPassword: value }); setErrors({...errors, confirmPassword:null})}}
              name="confirmPassword"
              error={errors.confirmPassword}
            />
            <LabelText htmlFor="contact">Contact</LabelText>
            <ContactWrapper>
              <div>
                <Select
                  options={countryCodes}
                  value={formData.countryCode}
                  onChange={(value) => {setFormData({ ...formData, countryCode: value })}}
                  name="countryCode"
                  error={errors.countryCode}
                />
              </div>
              <input
              type="text"
              placeholder="Contact"
              value={formData.contact}
              onChange={(e) => {setFormData({ ...formData, contact: e.target.value }); setErrors({...errors,contact:null})}}
              name="contact"
              
              />
            </ContactWrapper>
            {errors.contact && <Error>{errors.contact}</Error> }
            <Text>Create a strong password. Must be at least 8 character.</Text>
            <Button text="Register" onClick={handleSubmit} />
          </Form>
          <div style={{textAlign: 'center'}}>
            <TextWithLink>Already have an account?</TextWithLink> <Link href="/login">Sign In</Link>
          </div>
        </Container>
      </RegisterSection>
      <GraphicSection>
        <Image src={RegisterDesign} />
        <LogoImage src={Logo} />
      </GraphicSection>
    </RegisterContainer>
  );
};

export default Register;
