import React, { useContext  } from 'react';
import Login from '../components/Login';
import Welcome from '../components/Welcome';
import { Container, CssBaseline } from '@mui/material';
import AuthContext from '../context/AuthContext';

const Home = () => {
    const { token, username, logout : handleLogout } = useContext(AuthContext);

  return (
    <Container>
      <CssBaseline />
      {token ? <Welcome username={username} onLogout={handleLogout} /> : <Login />}
    </Container>
  );
};

export default Home;
