// src/components/FilterSection.js
import React from 'react';
import { Box, TextField } from '@mui/material';

const FilterOperation = ({ filters, handleFilterChange }) => {
  return (
    <Box mb={2} display="flex" gap={2} flexWrap="wrap">
      <TextField label="Filter by Type" variant="outlined" value={filters.type} onChange={(e) => handleFilterChange(e, 'type')} />
      <TextField label="Filter by Cost" variant="outlined" value={filters.cost} onChange={(e) => handleFilterChange(e, 'cost')} />
    </Box>
  );
};

export default FilterOperation;
