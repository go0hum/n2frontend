// src/components/Welcome.js
import React from 'react';
import { Typography } from '@mui/material';
import  Nav  from './Nav';
import '../pages/styles.css';

const Welcome = ({ username }) => {
  return (
    <div>
      <Nav />
      <div className="title-container">
        <Typography variant="h4" component="h1" className='titulo'>
          Welcome, {username}!
        </Typography>
      </div>
    </div>
  );
};

export default Welcome;
