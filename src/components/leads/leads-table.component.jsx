// src/components/leadtable/LeadTable.js
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { dummyData } from '../../util/dummyData';
import { getColorFromLetter } from '../../util/colorUtils';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, selectFilters, selectPage, selectLeadsCollection } from '../../redux/features/leads/leadSelectors';
import useAxios from '../../util/useAxios';
import { APIS } from '../../util/config';
import { setPage, setTotalLeads, setTotalPages, setLeadsCollection, clearFilterOption, clearSortOption, clearLeadsCollection } from '../../redux/features/leads/filterSlice';
import { Link } from 'react-router-dom';
import MiniLoader from '../reusable/miniLoader';
import { usePopup } from '../reusable/contextPopup.component';
import Popup from '../reusable/popup.component';
import AddNewLeadForm from './add-new-lead-form.component';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: #fff;
  font-size: 14px;
  padding-bottom: 20px;
  height: 67vh;
  overflow-y: hidden;
  padding-left: 15px;
  padding-right: 15px;
`;

const TableWrapper = styled.div`
  height: 67vh;
  overflow-y: auto;
  overflow-x: hidden; /* Prevent horizontal scrolling */
  padding-bottom: 50px;
  margin-top: 10px;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f9f9f9;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #e7e7e7;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f5f5;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e7e7e7;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const InitialCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  margin-right: 10px;
`;

const ActionContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ActionButton = styled.div`
  cursor: pointer;
  padding: 5px;
  text-align: center;
`;

const ActionMenu = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 100px;
  text-align: left;
  padding: 5px 5px;
`;

const ActionItem = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TableLoader = styled.div`
   border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #000;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LeadTable = () => {
  const { isPopup, togglePopup } = usePopup();
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [visiblePopup, setVisiblePopup] = useState(null);
  const sort = useSelector(selectSort);
  const filter = useSelector(selectFilters);
  const pageNo = useSelector(selectPage);
  const { criterion:sortBy, order } = sort;
  const { stage, listing } = filter;
  const leadsCollection = useSelector(selectLeadsCollection);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);
  
  
  const { executeRequest } = useAxios();

  const fetchLeads = async () => {
    try{
      setLoading(true);
      let filterParams = '';
        if (Object.values(filter).some(item => item.length > 0)) {
          filterParams = Object.entries(filter)
            .map(([key, values]) =>
              values.map(value => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')
            )
            .join('&');
        }
      console.log(filterParams);
      let url = `http://localhost:3000/leads/getLeads?sortBy=${sortBy}&order=${order}&page=${pageNo}`;
      if(filterParams){
        url += `&${filterParams}`
      }
      const response = await executeRequest({
        method: 'get',
        url: url,
      })
      const { leadsCollection, page, totalLeads, totalPages } = response;
      dispatch(setLeadsCollection({ leadsCollection }));
      dispatch(setPage({ page }));
      dispatch(setTotalLeads({ totalLeads }));
      dispatch(setTotalPages({ totalPages }));
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    console.log('useEffect called with dependencies:', filter, sort, pageNo);
    fetchLeads();
    return () => dispatch(clearLeadsCollection());
  },[filter.stage.length,filter.listing.length,sortBy,order,pageNo])



  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedLeads(leadsCollection.map((lead) => lead.email));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (email) => {
    if (selectedLeads.includes(email)) {
      setSelectedLeads(selectedLeads.filter((selectedEmail) => selectedEmail !== email));
    } else {
      setSelectedLeads([...selectedLeads, email]);
    }
  };

  const isSelected = (email) => selectedLeads.includes(email);

  const handleActionClick = (index) => {
    if (visiblePopup === index) {
      setVisiblePopup(null); // Close the popup if it's already open
    } else {
      setVisiblePopup(index); // Open the popup for the clicked item
    }
  };

  const handleEditPopup = async () => {
    if(validateForm(formData)){
      try {
        setLoading(true);
        setErrors({});
        const response = await executeRequest({
          method: 'post',
          url:APIS.updateLead,
          data: formData
        })
        console.log(response);
      } catch (error) {
        setErrors({...errors, registerError:error.response.data.message})
      } finally {
        setLoading(false);
      }
    }
    
  }

  const popupData = (lead)=> {
    setFormData ({ 
      name:lead.name ? lead.name : '', 
      email:lead.email ? lead.email : '', 
      contact:lead.contact ? lead.contact : '', 
      source:lead.source ? lead.source : '', 
      city: lead.city ? lead.city : '', 
      address:lead.address ? lead.address : '', 
      budget:lead.budget ? lead.budget : '', 
      profession:lead.profession ? lead.profession : '',
      _id: lead._id ? lead._id : '' 
    });
  }

  const handlePopupClose = () => {
    togglePopup();
  }

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
    if (!formData.budget) {
      formErros.budget = 'Budget is required';
    }
  
    // Validate Profession
    if (!formData.profession.trim()) {
      formErros.profession = 'Profession is required';
    }
    setErrors(formErros);
    return Object.keys(formErros).length === 0;
  };

  return (
    <>
      <TableContainer>
        <TableWrapper>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedLeads.length === leadsCollection.length}
                    />
                </TableHeaderCell>
                <TableHeaderCell>Lead Name</TableHeaderCell>
                <TableHeaderCell>Email Id</TableHeaderCell>
                <TableHeaderCell>Contact Number</TableHeaderCell>
                <TableHeaderCell>Source</TableHeaderCell>
                <TableHeaderCell>Budget</TableHeaderCell>
                <TableHeaderCell>Stage</TableHeaderCell>
                <TableHeaderCell>Score</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHeader>
              <TableBody>
                {loading ?? <LoaderContainer><TableLoader /></LoaderContainer>}
                {!loading && leadsCollection.map((lead, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSelected(lead.email)}
                        onChange={() => handleSelectLead(lead.email)}
                      />
                    </TableCell>
                    <TableCell>
                      <ImageContainer>
                        {lead.image ? (
                          <Image src={lead.image} alt={lead.name} />
                        ) : (
                          <InitialCircle bgColor={getColorFromLetter(lead.name[0])}>
                            {lead.name[0]}
                          </InitialCircle>
                        )}
                        <Link style={{textDecoration: 'none', color:'black'}} to={`leadInfo/${lead._id}`}>{lead.name}</Link>
                      </ImageContainer>
                    </TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.contact}</TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>{lead.budget}</TableCell>
                    <TableCell>{lead.stage}</TableCell>
                    <TableCell>{lead.score}</TableCell>
                    <TableCell>
                      <ActionContainer>
                        <ActionButton onClick={() => handleActionClick(index)}>...</ActionButton>
                        {visiblePopup === index && (
                          <ActionMenu>
                            <ActionItem onClick={() => {togglePopup(); popupData(lead);}}>Edit</ActionItem>
                            <ActionItem>Delete</ActionItem>
                          </ActionMenu>
                        )}
                      </ActionContainer>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </TableWrapper>
      </TableContainer>
      {isPopup && (
        <Popup
          title="Update Lead"
          onClose={handlePopupClose}
          onCancel={handlePopupClose}
          buttonText="Update Lead"
          subTitle="Property Details"
          onAddNewLead={handleEditPopup}
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

export default LeadTable;
