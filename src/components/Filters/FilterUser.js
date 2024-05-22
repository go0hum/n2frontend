// src/components/FilterSection.js
import React from 'react';
import { Box, TextField } from '@mui/material';

const FilteUser = ({ filters, handleFilterChange }) => {
  return (
    <Box mb={2} display="flex" gap={2} flexWrap="wrap">
      <TextField label="Filter by Username" variant="outlined" value={filters.username} onChange={(e) => handleFilterChange(e, 'username')} />
      <TextField label="Filter by Status" variant="outlined" value={filters.status} onChange={(e) => handleFilterChange(e, 'status')} />
    </Box>
  );
};

export default FilteUser;
