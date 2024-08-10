// components/LeadRow.js
import React from 'react';
import styled from 'styled-components';
import LeadActions from './lead-actions.component';

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
`;

const LeadRow = ({ lead }) => {
  return (
    <TableRow>
      <TableCell><input type="checkbox" /></TableCell>
      <TableCell>{lead.name}</TableCell>
      <TableCell>{lead.email}</TableCell>
      <TableCell>{lead.contactNumber}</TableCell>
      <TableCell>{lead.source}</TableCell>
      <TableCell>{lead.stage}</TableCell>
      <TableCell>{lead.score}</TableCell>
      <TableCell><LeadActions /></TableCell>
    </TableRow>
  );
};

export default LeadRow;
