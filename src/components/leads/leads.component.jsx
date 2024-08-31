import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../leads/sidebar.component';
import LeadTable from './leads-table.component';
import SearchBar from './searchbar-action-buttons.component';
import Pagination from './pagination.component';
import { useDispatch } from 'react-redux';
import { clearFilterOption, clearSortOption, clearLeadsCollection, clearPage, clearTotalLeads, clearTotalPages } from '../../redux/features/leads/filterSlice';
import { PopupProvider } from '../reusable/contextPopup.component';

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  overflow: hidden;
`;

const LeadHeading = styled.h2`
    display: flex;
    color: balck;
    padding: 10px 20px;
    margin: 0;
`;

const Leads = () =>{
    const dispatch = useDispatch();

    const cleanup = useCallback(()=>{
        dispatch(clearLeadsCollection());
        dispatch(clearPage());
        dispatch(clearTotalLeads());
        dispatch(clearTotalPages());
    },[dispatch])

    useEffect(()=>{
        return cleanup;
    },[cleanup])

    return (
        <MainContainer>
            <Sidebar />
            <div>
                <LeadHeading>Leads</LeadHeading>
                    <SearchBar />
                <PopupProvider>
                    <LeadTable />
                </PopupProvider>
                <Pagination />
            </div>
        </MainContainer>
        
    );
} 

export default Leads;
