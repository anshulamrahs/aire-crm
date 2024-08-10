// src/components/Popup.js
import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

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
  `;
  
  const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 95%;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const PopupTitle = styled.h2`
  margin: 0;
`;

const CloseIcon = styled(FaTimes)`
  cursor: pointer;
`;

const PopupContent = styled.div`
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

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: flex-start;
  gap: 3rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: black;
  color: white;
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

const PopupSubHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SubText = styled.p`
   color: rgb(141 141 141);
   margin-bottom: 0px;
   font-size: 14px;

`;

const Popup = ({ title, children, onClose, onCancel, buttonText, subTitle }) => {
  return (
    <PopupOverlay>
      <PopupContainer>
        <PopupHeader>
          <PopupTitle>{title}</PopupTitle>
          <CloseIcon style={{borderRadius: '50%', border:'2px solid black'}} onClick={onClose} />
        </PopupHeader>
        {subTitle && (
            <PopupSubHeader>
                <SubText>
                    {subTitle}
                </SubText>
            </PopupSubHeader>
        )}
        <PopupContent>{children}</PopupContent>
        <ButtonContainer>
            <Button type="button">{buttonText}</Button>
            <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
        </ButtonContainer>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default Popup;
