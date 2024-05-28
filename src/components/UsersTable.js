import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../api/user';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  Paper, Button, TablePagination, IconButton, TableSortLabel, Box
} from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import EditIcon from '@mui/icons-material/Edit';
import FilterUser from './Filters/FilterUser';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AuthContext from '../context/AuthContext';

const UsersTable = () => {
    const { token, logout : handleLogout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState([]);
  const [filters, setFilters] = useState({
    username: '',
    status: ''
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
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers(token, filters, page, rowsPerPage, order, orderBy);
        setUsers(fetchedUsers.data.users);
        setTotal(fetchedUsers.data.total);
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error.response.data.error_code === 'INVALID_TOKEN') {
            handleLogout();
            navigate('/');
        }
      }
    };

    fetchUsers();
  }, [token, filters, page, rowsPerPage, order, orderBy, handleLogout, navigate]);

  const handleFilterChange = (event, column) => {
    const value = event.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
  };

  const handleCreateRecordClick = () => {
    navigate('/createuser');
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
      await deleteUser(token, id);
      setUsers((prevUsers) => {
        const updatedRecords = prevUsers.map((row) => {
            if (row.id === id) {
              return { ...row, status: 0 };
            } else {
              return row;
            }
        });
        return updatedRecords;
      });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/user/${id}`);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <>
    <div>
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="contained" onClick={handleCreateRecordClick}>
          Add User
        </Button>
        <IconButton onClick={toggleFilters}>
          {showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      {showFilters && (
        <FilterUser filters={filters} handleFilterChange={handleFilterChange} />
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
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                    {user.status === 1 ? "Active" : "Inactive"}    
                </TableCell>
                <TableCell>
                    <IconButton onClick={() => handleEdit(user.id)}>
                    <EditIcon />
                  </IconButton>
                  {user.status === 1 &&
                      <IconButton onClick={() => handleDelete(user.id)}>
                        <PersonOffIcon />
                      </IconButton>
                    }
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
    </>
  );
};

export default UsersTable;
