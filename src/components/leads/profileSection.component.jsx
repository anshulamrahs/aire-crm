import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectLeadDetails } from '../../redux/features/leads/leadSelectors';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 10px;
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.h2`
  margin: 0;
`;

const ProfileTitle = styled.p`
  margin: 0;
  color: gray;
`;

const ProfileSection = () => {
  const lead = useSelector(selectLeadDetails);
  return (
    <ProfileContainer>
      <ProfileImage src="https://via.placeholder.com/100" alt="Profile" />
      <ProfileDetails>
        <ProfileName>{lead ? lead.name : ''}</ProfileName>
        <ProfileTitle>{lead ? lead.notes : ''}</ProfileTitle>
      </ProfileDetails>
    </ProfileContainer>
  );
};


export default ProfileSection;
