import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import CalculatorComponent from '../components/CalculatorComponent';
import  Nav  from '../components/Nav';
import '../pages/styles.css';

const Calculator = () => {

  return (
    <Container>
      <CssBaseline />
      <Nav />
      <div className="title-container">
        <Typography variant="h4" component="h1"  className='titulo'>
          Calculator
        </Typography>
      </div>
      <CalculatorComponent />
    </Container>
  );
};

export default Calculator;
