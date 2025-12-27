import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EquipmentPage from './pages/Equipment';
import TeamsPage from './pages/Teams';
import PrivateRoute from './components/PrivateRoute'; // <--- Security

// ... (other imports)

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Area */}
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          {/* Add other protected routes here */}
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};
export default App;