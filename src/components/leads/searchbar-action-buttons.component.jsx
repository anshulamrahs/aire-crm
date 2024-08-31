// src/components/searchbar/SearchBar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaWhatsapp, FaEnvelope, FaShareAlt, FaTrash, FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import Popup from '../reusable/popup.component';
import AddNewLeadForm from '../leads/add-new-lead-form.component';
import useAxios from '../../util/useAxios';
import { APIS } from '../../util/config';
import { usePopup } from '../reusable/contextPopup.component';

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-left: 15px;
  margin-right: 15px;
  width: 98%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 32%;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 8px 8px 30px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  color: #ccc;
`;

const ClearIcon = styled(FaTimes)`
  position: absolute;
  right: 10px;
  color: #ccc;
  cursor: pointer;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  background-color: #fff;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  color: black;
  border-radius: 5px;
  background-color: #fff;
  &:hover {
    background-color: #e7e7e7;
  }
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const AddButton = styled(Button)`
  background-color: black;
  color: white;
  border-radius: 10px;
  width: 130px;
  &:hover {
    background-color: #e7e7e7;
  }
`;

const SearchBar = () => {
  const { isPopup, togglePopup } = usePopup();
  const [query, setQuery] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { executeRequest } = useAxios();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null)
  const [formData, setFormData] = useState({name:'', email:'', contact:'', source:'', city: '', address:'', budget:'', profession:''});
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    let formErros = {};
  
    // Validate Name
    if (!formData.name.trim()) {
      formErros.name = 'Name is required';
    }
  
    // Validate Contact (Phone Number)
    const phoneRegex = /^[0-9]{10}$/; // Adjust the regex based on your phone number format requirements
    if (!formData.contact.trim()) {
      formErros.contact = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contact)) {
      formErros.contact = 'Enter a valid 10-digit contact number';
    }
  
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      formErros.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      formErros.email = 'Enter a valid email address';
    }
  
    // Validate Source
    if (!formData.source.trim()) {
      formErros.source = 'Source is required';
    }
  
    // Validate City
    if (!formData.city.trim()) {
      formErros.city = 'City is required';
    }
  
    // Validate Address
    if (!formData.address.trim()) {
      formErros.address = 'Address is required';
    }
  
    // Validate Budget
    if (!formData.budget.trim()) {
      formErros.budget = 'Budget is required';
    }
  
    // Validate Profession
    if (!formData.profession.trim()) {
      formErros.profession = 'Profession is required';
    }
    setErrors(formErros);
    return Object.keys(formErros).length === 0;
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const addNewLead = async () => {
    if(validateForm(formData)){
      try {
        setLoading(true);
        setData(null);
        const response = await executeRequest({
          method: 'post',
          url: APIS.addNewLead,
          data: formData
        })
        if(response.leadId) {
          setData(response.message);
          setFormData({name:'', email:'', contact:'', source:'', city: '', address:'', budget:'', profession:''});
        }
      } catch(error) {
        setErrors({...errors, newLeadError:error.response.data.error})
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <SearchBarContainer>
        <SearchInputContainer>
          <SearchIcon />
          <SearchInput 
            type="text" 
            placeholder="Search leads" 
            value={query} 
            onChange={handleInputChange} 
          />
          <ClearIcon onClick={clearSearch} />
        </SearchInputContainer>
        <ActionButtons>
          <Button><FaWhatsapp style={{marginRight: '5px'}} /> WhatsApp</Button>
          <Button><FaEnvelope style={{marginRight: '5px'}} /> Email</Button>
          <Button><FaShareAlt style={{marginRight: '5px'}} /> Share</Button>
          <Button><FaTrash style={{marginRight: '5px'}} /> Delete</Button>
        </ActionButtons>
        <ActionButtons>
          <AddButton onClick={handlePopupOpen}><FaPlus style={{marginRight: '5px'}} /> Add New Lead</AddButton>
        </ActionButtons>
      </SearchBarContainer>
      {isPopupOpen && (
        <Popup
          title="Add New Lead"
          onClose={handlePopupClose}
          onCancel={handlePopupClose}
          buttonText="Create Lead"
          subTitle="Property Details"
          onAddNewLead={addNewLead}
          validateForm={validateForm}
          errors={errors}
          data={data}
        >
          <AddNewLeadForm 
          errors={errors}
          formData={formData}
          setErrors={setErrors}
          setFormData={setFormData}
          loading={loading}          
          />
        </Popup>
      )}
    </>
  );
};

export default SearchBar;
