import React, { useState, useEffect, useContext } from 'react';
import { getOperations } from '../api/operation';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  Paper, TablePagination, IconButton, TableSortLabel, Box
} from '@mui/material';
import FilterOperation from './Filters/FilterOperation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const { token, logout : handleLogout } = useContext(AuthContext);
  const [operations, setOperations] = useState([]);
  const [total, setTotal] = useState([]);
  const [filters, setFilters] = useState({
    username: '',
    type: '',
    amount: '',
    user_balance: '',
    operation_response: '',
    date: ''
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const fetchedOperations = await getOperations(token, filters, page, rowsPerPage, order, orderBy);
        setOperations(fetchedOperations.data.operations);
        setTotal(fetchedOperations.data.total);
      } catch (error) {
        console.error('Error fetching operations:', error);
        if (error.response.data.error_code === 'INVALID_TOKEN') {
            handleLogout();
            navigate('/');
        }
      }
    };

    fetchOperations();
  }, [token, filters, page, rowsPerPage, order, orderBy, handleLogout, navigate]);

  const handleFilterChange = (event, column) => {
    const value = event.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div>
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <IconButton onClick={toggleFilters}>
          {showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      {showFilters && (
        <FilterOperation filters={filters} handleFilterChange={handleFilterChange} />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'type'}
                  direction={orderBy === 'type' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'type')}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'cost'}
                  direction={orderBy === 'cost' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'cost')}
                >
                  Cost
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operations.map((operation) => (
              <TableRow key={operation.id}>
                <TableCell>{operation.type}</TableCell>
                <TableCell>{operation.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UsersTable;
