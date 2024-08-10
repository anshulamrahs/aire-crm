// src/components/sidebar/Sidebar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { getColorFromLetter } from '../../util/colorUtils'; // Adjust the path as needed
import { FaSearch, FaTimes } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 20px;
  background: #fff;
  padding-bottom: 60px;
  overflow-y: auto; /* Enable vertical scrolling */
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }

  /* Custom scrollbar styling */
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

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 8px 8px 30px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  color: #ccc;
`;

const ClearIcon = styled(FaTimes)`
  position: absolute;
  right: 10px;
  color: #ccc;
  cursor: pointer;
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
`;

const SectionSubTitle = styled.h5`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const FilterItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  input {
    margin-right: 10px;
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 10px;
`;

const InitialSquare = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  margin-right: 10px;
`;

const Sidebar = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
  };

  const listings = [
    { name: 'The Acceptance Society', image: 'https://via.placeholder.com/30' },
    { name: 'Virginia Tilth', image: '' },
    { name: 'Fantastic Frozen', image: '' },
    { name: 'Winfred Mitchell', image: '' },
    { name: 'Stephanie Hunt', image: 'https://via.placeholder.com/30' },
  ];

  return (
    <SidebarContainer>
      <SearchInputContainer>
        <SearchIcon />
        <SearchInput 
          type="text" 
          placeholder="Search..." 
          value={query} 
          onChange={handleInputChange} 
        />
        <ClearIcon onClick={clearSearch} />
      </SearchInputContainer>
      <SectionTitle>Sort</SectionTitle>
      <ul style={{ padding: '0px' }}>
        <SectionSubTitle>Alphabetically</SectionSubTitle>
        <FilterItem>
          <input type="radio" name="sort" value="alphabetically" />
          A-Z
        </FilterItem>
        <FilterItem>
          <input type="radio" name="sort" value="new-to-old" />
          Z-A
        </FilterItem>
        <SectionSubTitle>Date</SectionSubTitle>
        <FilterItem>
          <input type="radio" name="sort" value="old-to-new" />
          Old to New
        </FilterItem>
        <FilterItem>
          <input type="radio" name="sort" value="new-to-old" />
          New to Old
        </FilterItem>
        <SectionSubTitle>Budget</SectionSubTitle>
        <FilterItem>
          <input type="radio" name="sort" value="high-to-low" />
          High to Low
        </FilterItem>
        <FilterItem>
          <input type="radio" name="sort" value="low-to-high" />
          Low to High
        </FilterItem>
        <SectionSubTitle>Score</SectionSubTitle>
        <FilterItem>
          <input type="radio" name="sort" value="high-to-low" />
          High to Low
        </FilterItem>
        <FilterItem>
          <input type="radio" name="sort" value="low-to-high" />
          Low to High
        </FilterItem>
      </ul>

      <SectionTitle>Filter</SectionTitle>
      <SectionSubTitle>Stage</SectionSubTitle>
      <ul style={{ padding: '0px' }}>
        <FilterItem>
          <input type="checkbox" name="filter" value="assigned" />
          Assigned
        </FilterItem>
        <FilterItem>
          <input type="checkbox" name="filter" value="unassigned" />
          Unassigned
        </FilterItem>
        <FilterItem>
          <input type="checkbox" name="filter" value="duplicated-leads" />
          Duplicated Leads
        </FilterItem>
        <FilterItem>
          <input type="checkbox" name="filter" value="qualification-stage" />
          Qualification Stage
        </FilterItem>
        <FilterItem>
          <input type="checkbox" name="filter" value="scheduling-stage" />
          Scheduling Stage
        </FilterItem>
        <FilterItem>
          <input type="checkbox" name="filter" value="offering-stage" />
          Offering Stage
        </FilterItem>
        <FilterItem>
          <input type="checkbox" name="filter" value="contract-stage" />
          Contract Stage
        </FilterItem>
        <FilterItem>
          <input type="checkbox" name="filter" value="deal-won" />
          Deal Won
        </FilterItem>
        <FilterItem>
          <input type="checkbox" name="filter" value="deal-lost" />
          Deal Lost
        </FilterItem>
        <FilterItem>
          <input type="checkbox" name="filter" value="others" />
          Others
        </FilterItem>
      </ul>
      <SectionSubTitle>Listing</SectionSubTitle>
      <ul style={{ padding: '0px' }}>
        {listings.map((listing, index) => (
          <FilterItem key={index}>
            <input type="checkbox" name="filter" value={listing.name.toLowerCase().replace(/\s+/g, '-')} />
            {listing.image ? (
              <Image src={listing.image} alt={listing.name} />
            ) : (
              <InitialSquare bgColor={getColorFromLetter(listing.name[0])}>
                {listing.name[0]}
              </InitialSquare>
            )}
            {listing.name}
          </FilterItem>
        ))}
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;
