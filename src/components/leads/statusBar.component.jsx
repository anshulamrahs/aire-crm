import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

const StatusBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StatusStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
`;

const StatusCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border: 2px solid black;
  margin-bottom: 10px;
  position: relative;
`;

const StatusIndicator = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid black;
  position: absolute;
`;

const StatusLabel = styled.div`
  font-size: 14px;
  color: black;
`;

const StatusLine = styled.div`
  position: absolute;
  top: 12px;
  left: 64%;
  height: calc(100% - 50px);
  width: 135px;
  background-image: ${(props) => `repeating-linear-gradient(to right, ${props.lineColor}, ${props.lineColor} 4px, transparent 3px, transparent 7px)`};
`;

const steps = [
  { label: 'Qualifications', backgroundColor: '#D8C9E7', lineColor: 'linear-gradient(to right, #D8C9E7, #E3D8EE)', active: true },
  { label: 'Scheduling', backgroundColor: '#F5D1D8', lineColor: 'linear-gradient(to right, #F5D1D8, #F4D8DD)', active: false },
  { label: 'Offering', backgroundColor: '#CCE3E4', lineColor: 'linear-gradient(to right, #CCE3E4, #CFE9EA)', active: false },
  { label: 'Contracted', backgroundColor: '#D8E9B6', lineColor: 'linear-gradient(to right, #D8E9B6, #E2EBC5)', active: false },
  { label: 'Close', backgroundColor: '#E2EBC5', lineColor: 'linear-gradient(to right, #E2EBC5, #F4F6E7)', active: false },
];

const StatusBar = () => {
  return (
    <StatusBarContainer>
      {steps.map((step, index) => (
        <StatusStep key={index}>
          {index < steps.length - 1 && (
            <StatusLine lineColor={step.backgroundColor} />
          )}
          <StatusCircle backgroundColor={step.backgroundColor}>
            <StatusIndicator active={step.active} />
            {step.active ? <FaCheck /> : null}
          </StatusCircle>
          <StatusLabel>{step.label}</StatusLabel>
        </StatusStep>
      ))}
    </StatusBarContainer>
  );
};

export default StatusBar;
