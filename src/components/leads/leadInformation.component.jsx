import React from 'react';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaGlobe, FaRupeeSign, FaStickyNote } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectLeadDetails } from '../../redux/features/leads/leadSelectors';

const LeadInfoContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 67vh;
`;

const LeadInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const IconContainer = styled.div`
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e7e7e7;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const IconStyle = {
  fontSize: '24px',
  color: '#A9A9A9',
  stroke: '#A9A9A9',
  strokeWidth: '1',
};

const LeadInfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeadInformation = () => {
  const leadDetails = useSelector(selectLeadDetails);
  return (
    <LeadInfoContainer>
      <LeadInfoItem>
        <IconContainer>
          <FaPhone style={IconStyle} />
        </IconContainer>
        <LeadInfoText>
          <div>Contact No</div>
          <div>{leadDetails ? leadDetails.contact : 'Does not Exist'}</div>
        </LeadInfoText>
      </LeadInfoItem>
      <LeadInfoItem>
        <IconContainer>
          <FaEnvelope style={IconStyle} />
        </IconContainer>
        <LeadInfoText>
          <div>Email</div>
          <div>{leadDetails ? leadDetails.email : 'Does not Exist'}</div>
        </LeadInfoText>
      </LeadInfoItem>
      <LeadInfoItem>
        <IconContainer>
          <FaGlobe style={IconStyle} />
        </IconContainer>
        <LeadInfoText>
          <div>Source</div>
          <div>{leadDetails ? leadDetails.source : 'Does not Exist'}</div>
        </LeadInfoText>
      </LeadInfoItem>
      <LeadInfoItem>
        <IconContainer>
          <FaRupeeSign style={IconStyle} />
        </IconContainer>
        <LeadInfoText>
          <div>Budget</div>
          <div>{leadDetails ? leadDetails.budget : 'Does not Exist'}</div>
        </LeadInfoText>
      </LeadInfoItem>
      <LeadInfoItem>
        <IconContainer>
          <FaStickyNote style={IconStyle} />
        </IconContainer>
        <LeadInfoText>
          <div>Notes</div>
          <div>{leadDetails ? leadDetails.notes : 'Does not Exist'}</div>
        </LeadInfoText>
      </LeadInfoItem>
    </LeadInfoContainer>
  );
};

export default LeadInformation;
