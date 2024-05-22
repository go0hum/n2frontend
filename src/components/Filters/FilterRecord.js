// src/components/FilterSection.js
import React from 'react';
import { Box, TextField } from '@mui/material';

const FilterRecord = ({ filters, handleFilterChange }) => {
  return (
    <Box mb={2} display="flex" gap={2} flexWrap="wrap">
      <TextField
        label="Filter by Username"
        variant="outlined"
        value={filters.username}
        onChange={(e) => handleFilterChange(e, 'username')}
      />
      <TextField
        label="Filter by Operation"
        variant="outlined"
        value={filters.type}
        onChange={(e) => handleFilterChange(e, 'type')}
      />
      <TextField
        label="Filter by Amount"
        variant="outlined"
        value={filters.amount}
        onChange={(e) => handleFilterChange(e, 'amount')}
      />
      <TextField
        label="Filter by Balance"
        variant="outlined"
        value={filters.user_balance}
        onChange={(e) => handleFilterChange(e, 'user_balance')}
      />
      <TextField
        label="Filter by Response"
        variant="outlined"
        value={filters.operation_response}
        onChange={(e) => handleFilterChange(e, 'operation_response')}
      />
      <TextField
        label="Filter by Date"
        variant="outlined"
        value={filters.date}
        onChange={(e) => handleFilterChange(e, 'date')}
      />
    </Box>
  );
};

export default FilterRecord;
