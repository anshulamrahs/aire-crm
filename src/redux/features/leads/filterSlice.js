// src/redux/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortOption: {
    criterion: 'date',
    order: 'asc',
  }, // Example: { name: 'alphabetically', order: 'ascending' }
  filterOption: {
    stage:[],
    listing: [],
  }, // Example: { stage: ['assigned', 'unassigned'], listing: ['Virginia Tilth', 'Fantastic Frozen'] }
  page: 1,
  limit: 25,
  totalLeads:0,
  totalPages:1,
  leadsCollection:[],
  leadDetails: {},
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortOption: (state, action) => {
      const { criterion, order } = action.payload;
      state.sortOption.criterion = criterion;
      state.sortOption.order = order;
    },
    setFilterOption: (state, action) => {
      const { filterName, filterValue } = action.payload;
      const currentValues = state.filterOption[filterName] || [];
      
      // Check if the filter value is already selected
      if (currentValues.includes(filterValue)) {
        // If selected, remove it
        state.filterOption[filterName] = currentValues.filter(value => value !== filterValue);
      } else {
        // If not selected, add it
        state.filterOption[filterName] = [...currentValues, filterValue];
      }
    },
    clearSortOption: (state) => {
      state.sortOption = {
        criterion: 'date',
        order: 'asc',
      };
    },
    clearFilterOption: (state) => {
      state.filterOption = {
        stage:[],
        listing: [],
      };
    },
    setTotalPages : (state, action) => {
      const { totalPages } = action.payload;
      state.totalPages = totalPages;
    },
    clearTotalPages : (state) => {
      state.totalPages = 0;
    },
    setPage : (state, action) => {
      const { page } = action.payload;
      state.page = page;
    },
    clearPage : (state) => {
      state.page = 1;
    },
    setTotalLeads : (state, action) => {
      const { totalLeads } = action.payload;
      state.totalLeads = totalLeads;
    },
    clearTotalLeads : (state) => {
      state.totalLeads = 0;
    },
    setLeadsCollection : (state, action) => {
      const { leadsCollection } = action.payload;
      state.leadsCollection = leadsCollection;
    },
    clearLeadsCollection : (state) => {
      state.leadsCollection = [];
    },
    setLeadDetails : (state,action) => {
      const { response } = action.payload;
      state.leadDetails = response;
    },
    clearLeadDetails : (state) => {
      state.leadDetails = {};
    }
  },
});

export const { 
  setSortOption,
  setFilterOption, 
  clearSortOption, 
  clearFilterOption, 
  setPage, 
  setTotalPages, 
  setTotalLeads, 
  setLeadsCollection,
  clearPage,
  clearLeadsCollection,
  clearTotalLeads,
  clearTotalPages,
  setLeadDetails,
  clearLeadDetails
 } = filterSlice.actions;

export default filterSlice.reducer;
