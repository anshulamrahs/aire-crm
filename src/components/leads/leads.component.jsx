import React from 'react';
import styled from 'styled-components';
import Sidebar from '../leads/sidebar.component';
import LeadTable from './leads-table.component';
import SearchBar from './searchbar-action-buttons.component';
import Pagination from './pagination.component';

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeadHeading = styled.h2`
    display: flex;
    color: balck;
    padding: 10px 20px;
`;


const Leads = () => (
    <MainContainer>
        <Sidebar />
        <div>
            <LeadHeading>Leads</LeadHeading>
            <SearchBar />
            <LeadTable />
            <Pagination />
        </div>
    </MainContainer>
    
);

export default Leads;
