import React from 'react';
import { Container, CssBaseline  } from '@mui/material';
import AddRecord from '../components/AddRecord';
import  Nav  from '../components/Nav';

const Users = () => {

  return (
    <Container>
      <CssBaseline />
      <Nav />
      <AddRecord /> 
    </Container>
  );
};

export default Users;
