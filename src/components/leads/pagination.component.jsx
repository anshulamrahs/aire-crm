// components/Pagination.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 98%;
  margin-left: 15px;
  margin-right: 15px;
  padding: 20px;
`;

const PageButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PageButton = styled.button`
  border: none;
  background-color: ${({ active }) => (active ? '#e7e7e7' : '#fff')};
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#e7e7e7' : '#f1f1f1')};
  }
`;

const InfoText = styled.span`
  font-size: 14px;
`;

const Pagination = () => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <PaginationContainer>
      <InfoText>showing 1 to 10 of 10 entries</InfoText>
      <PageButtonContainer>
        <PageButton onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1}>
          <FaAngleLeft />
        </PageButton>
        {[1, 2, 3, 4, 5].map((page) => (
          <PageButton
            key={page}
            active={page === activePage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        ))}
        <PageButton onClick={() => handlePageChange(activePage + 1)} disabled={activePage === 5}>
          <FaAngleRight />
        </PageButton>
      </PageButtonContainer>
    </PaginationContainer>
  );
};

export default Pagination;
