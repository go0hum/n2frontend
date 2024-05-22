// src/components/Welcome.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AuthContext from '../context/AuthContext';

const Nav = () => {
    const { username, logout : handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const LogOut = () => {
        handleLogout();
        navigate('/');
      }

    return (
        <>
        <AppBar position="static" sx={{ width: '100%' }}>
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                API
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/records">Records</Button>
            {  username === 'admin' && (
                        <>
                            <Button color="inherit" component={Link} to="/users">Users</Button>
                            <Button color="inherit" component={Link} to="/operations">Operations</Button>
                        </>
            )}
            <Button color="inherit" onClick={LogOut}>Logout</Button>
            </Toolbar>
        </AppBar>
        </>
    );
};

export default Nav;