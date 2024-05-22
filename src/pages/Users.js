import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import UsersTable from '../components/UsersTable';
import  Nav  from '../components/Nav';
import '../pages/styles.css';

const Users = () => {

  return (
    <Container>
      <CssBaseline />
      <Nav />
      <div className="title-container">
        <Typography variant="h4" component="h1"  className='titulo'>
          Users
        </Typography>
      </div>
      <UsersTable />
    </Container>
  );
};

export default Users;
