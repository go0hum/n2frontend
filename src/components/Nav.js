// src/components/Welcome.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AuthContext from '../context/AuthContext';

const Nav = () => {
    const { username, logout : handleLogout } = useContext(AuthContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const LogOut = () => {
        handleLogout();
        navigate('/');
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'Home', link: '/' },
        { text: 'Records', link: '/records' },
        { text: 'Calculator', link: '/calculator' },
    ];

    if (username === 'admin') {
        menuItems.push(
            { text: 'Users', link: '/users' },
            { text: 'Operations', link: '/operations' }
        );
    }

    const list = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index} component={Link} to={item.link}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                <ListItem button onClick={LogOut}>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        API
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                    >
                        {list()}
                    </Drawer>
                    <div style={{ display: { xs: 'none', md: 'flex' } }}>
                        {menuItems.map((item, index) => (
                            <Button color="inherit" key={index} component={Link} to={item.link}>
                                {item.text}
                            </Button>
                        ))}
                        <Button color="inherit" onClick={LogOut}>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Nav;