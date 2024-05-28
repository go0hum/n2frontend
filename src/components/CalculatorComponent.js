import React, { useState, useContext } from 'react';
import {
  Container, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Box
} from '@mui/material';
import { performOperation } from '../api/calculator';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CalculatorComponent = () => {
  const { token, logout : handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [operation, setOperation] = useState('addition');
  const [result, setResult] = useState(null);

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const result = await performOperation(token, operation, number1, number2);
      setResult(result.data.data);
    } catch (error) {
        if (error.response.data.error_code === 'INVALID_TOKEN') {
            handleLogout();
            navigate('/');
          }
      setResult(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Operation</InputLabel>
            <Select value={operation} onChange={handleOperationChange}>
              <MenuItem value="addition">Addition</MenuItem>
              <MenuItem value="subtraction">Subtraction</MenuItem>
              <MenuItem value="multiplication">Multiplication</MenuItem>
              <MenuItem value="division">Division</MenuItem>
              <MenuItem value="square_root">Square Root</MenuItem>
              <MenuItem value="random_string">Random String</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Number 1"
            type="number"
            fullWidth
            margin="normal"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
            disabled={operation === 'random_string'}
          />
          <TextField
            label="Number 2"
            type="number"
            fullWidth
            margin="normal"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
            disabled={operation === 'square_root' || operation === 'random_string'}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Calculate
          </Button>
        </form>
        {result !== null && (
          <Box my={4}>
            <Typography variant="h5">Result: {result}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CalculatorComponent;
