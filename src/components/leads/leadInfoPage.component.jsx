import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileSection from './profileSection.component';
import LeadInformation from './leadInformation.component';
import StatusBar from './statusBar.component';
import ActivityLog from './activityLog.component';
import ScheduleMeetingButton from './scheduleMeeting.component';
import { Link, useParams } from 'react-router-dom';
import useAxios from '../../util/useAxios';
import { APIS } from '../../util/config';
import { useDispatch } from 'react-redux';
import { setLeadDetails } from '../../redux/features/leads/filterSlice';
import { PopupProvider } from '../reusable/contextPopup.component';

const LeadInfoPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1500px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  margin-right: 20px;
  width: 20%;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const RightColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const LeadInfoPage = () => {
  const { leadId } = useParams();
  const [leadDetails, setLead] = useState(null);
  const { executeRequest } = useAxios();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchLeadDetails = useCallback(async()=>{
    try {
      setLoading(true);
      const response = await executeRequest({
        method: 'post',
        url: APIS.getLeadDetails,
        data: {
          leadId: leadId
        }
      })
      setLead(response)
      dispatch(setLeadDetails({ response }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  },[leadId]) 

    
  useEffect(()=>{
    fetchLeadDetails();
  },[fetchLeadDetails])
  return (
    <LeadInfoPageContainer>
      <ContentContainer>
        <h2 style={{marginBottom: '0px'}}>Leads</h2>
        <span style={{textDecoration: 'none', color:'black', marginBottom:'10px'}}><Link style={{textDecoration:'none', color:'black'}} to={'/leads'}>leads</Link>/Lead Information</span>
        <Header>
          <ProfileSection />
          <ScheduleMeetingButton leadId={leadId} />
        </Header>
        <MainContent>
          <LeftColumn>
            <LeadInformation />
          </LeftColumn>
          <RightColumn>
          <PopupProvider>
              <StatusBar />
          </PopupProvider>
            <ActivityLog leadId={leadId} />
          </RightColumn>
        </MainContent>
      </ContentContainer>
    </LeadInfoPageContainer>
  );
};

export default LeadInfoPage;
