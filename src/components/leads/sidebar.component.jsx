import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getColorFromLetter } from '../../util/colorUtils'; // Adjust the path as needed
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, selectFilters } from '../../redux/features/leads/leadSelectors';
import { setSortOption, setFilterOption, clearFilterOption, clearSortOption } from '../../redux/features/leads/filterSlice';
import useAxios from '../../util/useAxios';
import { APIS } from '../../util/config';
import MiniLoader from '../reusable/miniLoader';
import { sortOptions } from '../../util/constants';

const SidebarContainer = styled.div`
  width: 250px;
  height: 90vh; /* Full height of the viewport */
  background: #fff;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FixedSearchContainer = styled.div`
  padding: 10px;
  background: #fff;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ScrollableContent = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto; /* Enable vertical scrolling */
  @media (max-width: 768px) {
    padding: 10px;
  }

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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
  overflow: hidden; /* Ensure text doesn't overflow */

  input {
    margin-right: 10px;
    flex-shrink: 0; /* Prevent input from shrinking */
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 10px;
  object-fit: cover; /* Ensure the image covers the area without distortion */
  flex-shrink: 0; /* Prevent image from shrinking */
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
  flex-shrink: 0; /* Prevent square from shrinking */
`;

const DescriptionText = styled.span`
  white-space: pre-wrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Show ellipsis when text overflows */
`;


const Sidebar = () => {
  const [query, setQuery] = useState('');
  const sortOption = useSelector(selectSort);
  const dispatch = useDispatch();
  const {executeRequest} = useAxios();
  const [loading, setLoading] = useState(false);
  const [interestedListings, setInterestedListings] = useState(null);
  console.log(sortOption);

  const getInterestedListings = useCallback(async ()=>{
      try{
        setLoading(true);
        const listings = await executeRequest({
          method: 'get',
          url: APIS.interestedListings,
          headers: {'Content-Type': 'application/json'},
        })
        if(listings){
          setInterestedListings(listings)
        }
      } catch(error) {
        if(error.response && error.response.status === 401) {
          console.log("not authorised");
        }
      } finally {
          setLoading(false);
      }
    },[]) 

  useEffect(() => {
    dispatch(clearSortOption());
    dispatch(clearFilterOption());
    getInterestedListings();
  },[getInterestedListings]);
  

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
  };

  const handleSortChange = (e) => {
    const criterion = e.target.name;  // "date", "score", "budget", etc.
    const order = e.target.value;   
    dispatch(setSortOption({ criterion, order }));
  };

  const handleFilterChange = (e) => {
    const filterName = e.target.name;
    const filterValue = e.target.value;
    console.log(filterName,filterValue);
    dispatch(setFilterOption({ filterName, filterValue }));
  };


  return (
    <SidebarContainer>
      <FixedSearchContainer>
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
      </FixedSearchContainer>
      <ScrollableContent>
        <SectionTitle>Sort</SectionTitle>
        <ul style={{ padding: '0px' }}>
          <SectionSubTitle>Date</SectionSubTitle>
          <FilterItem>
            <input
              type="radio"
              name="createdDate"
              value={sortOptions.date.otn}
              onChange={handleSortChange}
              checked={sortOption.criterion === 'createdDate' && sortOption.order === 'asc'}
            />
            Old to New
          </FilterItem>
          <FilterItem>
            <input
              type="radio"
              name="createdDate"
              value={sortOptions.date.nto}
              onChange={handleSortChange}
              checked={sortOption.criterion === 'createdDate' && sortOption.order === 'desc'}
            />
            New to Old
          </FilterItem>

          <SectionSubTitle>Score</SectionSubTitle>
          <FilterItem>
            <input
              type="radio"
              name="score"
              value={sortOptions.score.lth}
              onChange={handleSortChange}
              checked={sortOption.criterion === 'score' && sortOption.order === 'asc'}
            />
            Low to High
          </FilterItem>
          <FilterItem>
            <input
              type="radio"
              name="score"
              value={sortOptions.score.htl}
              onChange={handleSortChange}
              checked={sortOption.criterion === 'score' && sortOption.order === 'desc'}
            />
            High to Low
          </FilterItem>

          <SectionSubTitle>Budget</SectionSubTitle>
          <FilterItem>
            <input
              type="radio"
              name="budget"
              value={sortOptions.budget.lth}
              onChange={handleSortChange}
              checked={sortOption.criterion === 'budget' && sortOption.order === 'asc'}
            />
            Low to High
          </FilterItem>
          <FilterItem>
            <input
              type="radio"
              name="budget"
              value={sortOptions.budget.htl}
              onChange={handleSortChange}
              checked={sortOption.criterion === 'budget' && sortOption.order === 'desc'}
            />
            High to Low
          </FilterItem>
        </ul>
        <SectionTitle>Filter</SectionTitle>
        <SectionSubTitle>Stage</SectionSubTitle>
        <ul style={{ padding: '0px' }}>
          <FilterItem>
            <input type="checkbox" name="stage" value="assigned" onChange={handleFilterChange} />
            Assigned
          </FilterItem>
          <FilterItem>
            <input type="checkbox" name="stage" value="unassigned" onChange={handleFilterChange} />
            Unassigned
          </FilterItem>
          <FilterItem>
            <input type="checkbox" name="stage" value="duplicated leads" onChange={handleFilterChange} />
            Duplicated Leads
          </FilterItem>
          <FilterItem>
            <input type="checkbox" name="stage" value="Qualifications" onChange={handleFilterChange} />
            Qualification Stage
          </FilterItem>
          <FilterItem>
            <input type="checkbox" name="stage" value="Scheduling" onChange={handleFilterChange} />
            Scheduling Stage
          </FilterItem>
          <FilterItem>
            <input type="checkbox" name="stage" value="Offering" onChange={handleFilterChange} />
            Offering Stage
          </FilterItem>
          <FilterItem>
            <input type="checkbox" name="stage" value="Contracted" onChange={handleFilterChange} />
            Contract Stage
          </FilterItem>
          <FilterItem>
            <input type="checkbox" name="stage" value="Close" onChange={handleFilterChange} />
            Deal Won
          </FilterItem>
          <FilterItem>
            <input type="checkbox" name="stage" value="deal lost" onChange={handleFilterChange} />
            Deal Lost
          </FilterItem>
          <FilterItem>
            <input type="checkbox" name="stage" value="others" onChange={handleFilterChange} />
            Others
          </FilterItem>
        </ul>
        <SectionSubTitle>Listing</SectionSubTitle>
        <ul style={{ padding: '0px' }}>
          {
            loading && <MiniLoader />
          }
          {interestedListings && interestedListings.map((listing, index) => (
            <FilterItem key={index}>
              <input
                type="checkbox"
                name="listing"
                value={listing.description}
                onChange={handleFilterChange}
              />
              {listing.image ? (
                <Image src={listing.image} alt={listing.description} />
              ) : (
                <InitialSquare bgColor={getColorFromLetter(listing.description[0])}>
                  {listing.description[0]}
                </InitialSquare>
              )}
              <DescriptionText>{listing.description}</DescriptionText>
            </FilterItem>
          ))}
        </ul>
      </ScrollableContent>
    </SidebarContainer>
  );
};

export default Sidebar;
