import React from 'react';
import { Container, CssBaseline  } from '@mui/material';
import AddUser from '../components/AddUser';
import EditUser from '../components/EditUser';
import  Nav  from '../components/Nav';
import { useParams } from 'react-router-dom';

const Users = () => {
  
  const { id } = useParams();

  return (
    <Container>
      <CssBaseline />
      <Nav />
      { id ? <EditUser id={id} /> : <AddUser /> } 
    </Container>
  );
};

export default Users;
