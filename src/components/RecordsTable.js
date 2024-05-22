import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecords, deleteRecord } from '../api/record';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  Paper, Button, TablePagination, IconButton, TableSortLabel,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterRecord from './Filters/FilterRecord';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AuthContext from '../context/AuthContext';

const RecordTable = () => {
  const { token, logout : handleLogout } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState([]);
  const [filters, setFilters] = useState({
    username: '',
    type: '',
    amount: '',
    user_balance: '',
    operation_response: '',
    date: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const fetchedRecords = await getRecords(token, filters, page, rowsPerPage, order, orderBy);
        setRecords(fetchedRecords.data.records);
        setTotal(fetchedRecords.data.total);
      } catch (error) {
        console.error('Error fetching records:', error);
        if (error.response.data.error_code === 'INVALID_TOKEN') {
          handleLogout();
          navigate('/');
        }
      }
    };

    fetchRecords();
  }, [token, filters, page, rowsPerPage, order, orderBy, handleLogout, navigate]);

  const handleFilterChange = (event, column) => {
    const value = event.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
  };

  const handleCreateRecordClick = () => {
    navigate('/createrecord');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecord(token, id);
      
      setRecords((prevRecords) => {
        let text = ''; 
        let sum = 0;
        
        prevRecords.forEach((row, index, array) => {
          if (row.id === id) {
            text = row.type;
            sum = (row.amount * -1) + row.user_balance;
          } else if (row.type == text) {
            array[index].user_balance = row.amount + sum;
            sum = sum + row.amount;
          }
        });

        const updatedRecords = prevRecords.filter((record) => record.id !== id);
        return updatedRecords;
      });
      setTotal(total - 1);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div>
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="contained" onClick={handleCreateRecordClick}>
          Add credit
        </Button>
        <IconButton onClick={toggleFilters}>
          {showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      {showFilters && (
        <FilterRecord filters={filters} handleFilterChange={handleFilterChange} />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'username'}
                  direction={orderBy === 'username' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'username')}
                >
                  User
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'type'}
                  direction={orderBy === 'type' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'type')}
                >
                  Operation
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'amount'}
                  direction={orderBy === 'amount' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'amount')}
                >
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'user_balance'}
                  direction={orderBy === 'user_balance' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'user_balance')}
                >
                  Balance
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'operation_response'}
                  direction={orderBy === 'operation_response' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'operation_response')}
                >
                  Response
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.username}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.amount}</TableCell>
                <TableCell>{record.user_balance}</TableCell>
                <TableCell>{record.operation_response}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(record.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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

export default RecordTable;
