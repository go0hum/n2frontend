import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { createUser } from '../api/user';
import AuthContext from '../context/AuthContext';

const AddUser = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    status: 1
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const recordData = {
        username: formValues.username,
        password: formValues.password,
        status: formValues.status
      };

      await createUser(token, recordData);
      navigate('/users');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            name="status"
            labelId="status-label"
            value={formValues.status}
            label="Operation"
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          >
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>
          </Select>
          <Button onClick={() => navigate('/users')}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </form>
      </>
  );
};

export default AddUser;
