import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Records from './pages/Records';
import Users from './pages/Users';
import Operations from './pages/Operations';
import FormRecord from './pages/FormRecord';
import FormUser from './pages/FormUser';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<Records />} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/operations" element={<ProtectedRoute><Operations /></ProtectedRoute>} />
        <Route path="/createrecord" element={<FormRecord />} />
        <Route path="/createuser" element={<ProtectedRoute><FormUser /></ProtectedRoute>} />
        <Route path="/user/:id" element={<ProtectedRoute><FormUser /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
