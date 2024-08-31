// components/Pagination.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/features/leads/filterSlice';
import { selectLimit, selectPage, selectTotalLeads, selectTotalPages } from '../../redux/features/leads/leadSelectors';

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
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const totalLeads = useSelector(selectTotalLeads);
  const limit = useSelector(selectLimit);
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    setActivePage(page);
    dispatch(setPage({ page }));
  };

  const getEntriesRange = (pageNo, limit, totalLeads) => {
    // Calculate the start index for the current page
    const startIndex = (pageNo - 1) * limit + 1;
  
    // Calculate the end index for the current page
    const endIndex = Math.min(pageNo * limit, totalLeads);
  
    // Return the range as a string
    return `Showing ${startIndex} to ${endIndex} of ${totalLeads} entries`;
  }

  return (
    <PaginationContainer>
      <InfoText>{getEntriesRange(page,limit,totalLeads)}</InfoText>
      <PageButtonContainer>
        <PageButton onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1}>
          <FaAngleLeft />
        </PageButton>
        {pagesArray.map((page) => (
          <PageButton
            key={page}
            active={page === activePage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        ))}
        <PageButton onClick={() => handlePageChange(activePage + 1)} disabled={activePage === pagesArray.length}>
          <FaAngleRight />
        </PageButton>
      </PageButtonContainer>
    </PaginationContainer>
  );
};

export default Pagination;
