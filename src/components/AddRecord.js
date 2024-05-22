import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { createRecord } from '../api/record';
import AuthContext from '../context/AuthContext';

const CreateRecord = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    credit: '',
    type: 1
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
      if (!userId && !token) {
        console.error('No token or user ID found');
        return;
      }

      const recordData = {
        credit: formValues.credit,
        type: formValues.type,
        user: userId
      };

      await createRecord(token, recordData);
      navigate('/records');
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  return (
    <div>
        <h2>Add Record</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Credit"
            name="credit"
            value={formValues.credit}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <InputLabel id="type-label">Operation</InputLabel>
          <Select
            name="type"
            labelId="type-label"
            value={formValues.type}
            label="Operation"
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          >
            <MenuItem value={1}>Addition</MenuItem>
            <MenuItem value={2}>Subtraction</MenuItem>
            <MenuItem value={3}>Multiplication</MenuItem>
            <MenuItem value={4}>Division</MenuItem>
            <MenuItem value={5}>Square Root</MenuItem>
            <MenuItem value={6}>Random String</MenuItem>
          </Select>
            <Button onClick={() => navigate('/records')}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
        </form>
    </div>
  );
};

export default CreateRecord;
