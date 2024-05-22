// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { username } = useContext(AuthContext);

    if (username !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
