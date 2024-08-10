// src/components/leadtable/LeadTable.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { data } from '../../util/dummyData';

const TableContainer = styled.div`
  width: 98%;
  overflow-x: auto;
  background-color: #fff;
  font-size: 14px;
  padding-bottom: 60px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #fff;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e7e7e7;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fff;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e7e7e7;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const InitialCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  margin-right: 10px;
`;

const ActionContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ActionButton = styled.div`
  cursor: pointer;
  padding: 5px;
`;

const ActionMenu = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 100px;
  text-align: left;
  padding: 5px 5px;
`;

const ActionItem = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TaskTable = () => {
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [visiblePopup, setVisiblePopup] = useState(null);


  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedLeads(data.map((task) => task.taskOwner));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (owner) => {
    if (selectedLeads.includes(owner)) {
      setSelectedLeads(selectedLeads.filter((selectedOwner) => selectedOwner !== owner));
    } else {
      setSelectedLeads([...selectedLeads, owner]);
    }
  };

  const isSelected = (owner) => selectedLeads.includes(owner);

  const handleActionClick = (index) => {
    if (visiblePopup === index) {
      setVisiblePopup(null); // Close the popup if it's already open
    } else {
      setVisiblePopup(index); // Open the popup for the clicked item
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedLeads.length === data.length}
              />
            </TableHeaderCell>
            <TableHeaderCell>Task Owner</TableHeaderCell>
            <TableHeaderCell>Listing</TableHeaderCell>
            <TableHeaderCell>Task</TableHeaderCell>
            <TableHeaderCell>Due Date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Priority</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((task, index) => (
            <TableRow key={index}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={isSelected(task.taskOwner)}
                  onChange={() => handleSelectLead(task.taskOwner)}
                />
              </TableCell>
              <TableCell>
                {task.taskOwner}
              </TableCell>
              <TableCell>{task.listing}</TableCell>
              <TableCell>{task.task}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                <ActionContainer>
                  <ActionButton onClick={() => handleActionClick(index)}>...</ActionButton>
                  {visiblePopup === index && (
                    <ActionMenu>
                      <ActionItem>Edit</ActionItem>
                      <ActionItem>Delete</ActionItem>
                    </ActionMenu>
                  )}
                </ActionContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
