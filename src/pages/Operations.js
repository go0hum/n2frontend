import React from 'react';
import { Typography, Container, CssBaseline  } from '@mui/material';
import OperationsTable from '../components/OperationsTable';
import  Nav  from '../components/Nav';
import './styles.css';

const Operations = () => {

  return (
    <Container>
      <CssBaseline />
      <Nav />
      <div className="title-container">
        <Typography variant="h4" component="h1"  className='titulo'>
            Operations
        </Typography>
      </div>
      <OperationsTable />
    </Container>
  );
};

export default Operations;
