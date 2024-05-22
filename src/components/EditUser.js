import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../api/user';
import { TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import AuthContext from '../context/AuthContext';

const EditUser = () => {
    const { token } = useContext(AuthContext);
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [, setUser] = useState({});
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    status: 1
  }); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(token, id); 
        setUser(userData.data.users); 
        setFormValues(userData.data.users);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser(); 
  }, [id, token]); 

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
      await updateUser(token, id, formValues); 
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formValues.username || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formValues.password || ''}
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
    </div>
  );
};

export default EditUser;
