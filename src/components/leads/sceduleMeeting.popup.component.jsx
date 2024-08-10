import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import {isBefore, isToday } from 'date-fns'
import CustomTimePicker from '../reusable/timepicker.component';



const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  max-height: 90%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const PopupTitle = styled.h2`
  margin: 0;
`;

const CloseIcon = styled(FaTimes)`
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 10px; /* For space to show scrollbar */
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  padding-right: 30px;
  position: relative;
`;

const CalendarIcon = styled(FaCalendarAlt)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #000;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: black;
  &:hover {
    background-color: #333;
  }
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  &:hover {
    background-color: #e7e7e7;
  }
`;

const ScheduleMeetingPopup = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState({ hour: '06', minute: '28', second: '55', period: 'PM' });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setTime({ ...time, [name]: value });
  };

  return (
    <PopupOverlay>
      <PopupContainer>
        <PopupHeader>
          <PopupTitle>Schedule Meeting</PopupTitle>
          <CloseIcon onClick={onClose} />
        </PopupHeader>
        <Form>
          <FormGroup>
            <Label>Select Activity</Label>
            <Select>
              <option>Call</option>
              <option>Follow Up</option>
              <option>Visit</option>
              <option>Meeting</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Select Date</Label>
            <div style={{ position: 'relative' }}>
              <Input
                type="text"
                value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                readOnly
                onClick={() => document.getElementById('daypicker').focus()}
              />
              <CalendarIcon />
            </div>
            <DayPicker
              id="daypicker"
              selected={selectedDate}
              onDayClick={handleDateChange}
              disabled={date => isBefore(date, new Date()) && !isToday(date)}
              modifiers={{
                selected: selectedDate,
              }}
              modifiersStyles={{
                selected: {
                  color: '#000',
                },
                today: {
                  color: '#000',
                  fontWeight: 'bold',
                },
              }}

              styles={{
                day_button: {border: 'none'}
              }}
            />
          </FormGroup>
          <FormGroup>
            <CustomTimePicker />
          </FormGroup>
        </Form>
        <ButtonContainer>
        <Button type="submit">Submit</Button>
        <CancelButton type="button" onClick={onClose}>
            Cancel
        </CancelButton>
        </ButtonContainer>
      </PopupContainer>
      <style>
        {
            `
                .rdp-chevron {
                    fill: black !important;
                }
            `
        }
      </style>
    </PopupOverlay>
  );
};

export default ScheduleMeetingPopup;
