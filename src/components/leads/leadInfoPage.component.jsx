import React from 'react';
import styled from 'styled-components';
import ProfileSection from './profileSection.component';
import LeadInformation from './leadInformation.component';
import StatusBar from './statusBar.component';
import ActivityLog from './activityLog.component';
import ScheduleMeetingButton from './scheduleMeeting.component';

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
  width: 25%;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const RightColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const LeadInfoPage = () => {
  return (
    <LeadInfoPageContainer>
      <ContentContainer>
        <Header>
          <ProfileSection />
          <ScheduleMeetingButton />
        </Header>
        <MainContent>
          <LeftColumn>
            <LeadInformation />
          </LeftColumn>
          <RightColumn>
            <StatusBar />
            <ActivityLog />
          </RightColumn>
        </MainContent>
      </ContentContainer>
    </LeadInfoPageContainer>
  );
};

export default LeadInfoPage;
