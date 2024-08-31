import React, { useState, useEffect } from 'react';
import './timepicker.style.css';
import Input from './input.component';
import styled from 'styled-components';
import { FaClock } from 'react-icons/fa'

const ClockIcon = styled(FaClock)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #000;
`;

const CustomTimePicker = ({time, formattedTime, handleScroll, togglePeriod, setFormattedTime}) => {

  useEffect(() => {
    const formatTime = `${time.hour.toString().padStart(2, '0')}:${time.minute
      .toString()
      .padStart(2, '0')}:${time.second.toString().padStart(2, '0')} ${time.period}`;
    setFormattedTime(formatTime);
  }, [time]);


  return (
    <div className="custom-time-picker-container">
      <label htmlFor="selected-time">Selected Time:</label>
      <Input type="text" id="selected-time" value={formattedTime} readOnly={true} />

      <div className="custom-time-picker">
        <div className="time-picker-wrapper">
          {['hour', 'minute', 'second'].map((unit) => (
            <div key={unit} className="time-column">
              <div className="time-value previous" onClick={() => handleScroll(unit, 'down')}>
                {(time[unit] - 1 + (unit === 'hour' ? 12 : 60)) % (unit === 'hour' ? 12 : 60) || 12}
              </div>
              <div className="time-value current">{time[unit]}</div>
              <div className="time-value next" onClick={() => handleScroll(unit, 'up')}>
                {(time[unit] + 1) % (unit === 'hour' ? 12 : 60) || 12}
              </div>
            </div>
          ))}
          <div className="time-column">
            <div className="time-value previous" onClick={togglePeriod}>
              {time.period === 'AM' ? 'PM' : 'AM'}
            </div>
            <div className="time-value current">{time.period}</div>
            <div className="time-value next" onClick={togglePeriod}>
              {time.period === 'AM' ? 'PM' : 'AM'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTimePicker;
