import React, { useState } from 'react';
import styled from 'styled-components';
import { FaWhatsapp, FaEnvelope, FaComment } from 'react-icons/fa';
import RadialProgressBar from '../progress-bar/radial-progress';
import ScheduleMeetingPopup from './sceduleMeeting.popup.component';
import { useSelector } from 'react-redux';
import { selectLeadDetails } from '../../redux/features/leads/leadSelectors';

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e7e7e7;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  font-size: 24px;
`;

const AddButton = styled(Button)`
  background-color: black;
  color: white;
  border-radius: 10px;
  width: fit-content;
  font-size: 14px;
  &:hover {
    background-color: #e7e7e7;
  }
`;

const ScheduleMeetingButton = ({leadId}) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const leadDetails = useSelector(selectLeadDetails);

  const handleOpenPopup = ()=> {
    setIsOpenPopup(true);
  };

  const handleClosePopup = ()=> {
    setIsOpenPopup(false)
  };
  return (
    <>
      <ActionButtons>
        <Button><FaWhatsapp fill='#4e4c4c' /></Button>
        <Button><FaEnvelope fill='#4e4c4c' /></Button>
        <Button><FaComment fill='#4e4c4c' /></Button>
        <AddButton onClick={handleOpenPopup}>Schedule Meeting</AddButton>
        <RadialProgressBar percentage={leadDetails ? leadDetails.score : 0} />
      </ActionButtons>
      {
        isOpenPopup && <ScheduleMeetingPopup leadId={leadId} onClose={handleClosePopup} />
      }
    </>
  );
};

export default ScheduleMeetingButton;
