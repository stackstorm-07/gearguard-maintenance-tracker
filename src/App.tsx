import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MaintenanceRequestPage from './pages/MaintenanceRequest';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Calendar from './pages/Calendar';

// 1. IMPORT THE NEW PAGE
import EquipmentPage from './pages/Equipment'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/requests/new" element={<MaintenanceRequestPage />} />
          <Route path="/calendar" element={<Calendar />} />
          
          {/* 2. UPDATE THIS LINE TO USE THE REAL COMPONENT */}
          <Route path="/equipment" element={<EquipmentPage />} />
          
          <Route path="/reporting" element={<div>Reporting Page (Coming Soon)</div>} />
          <Route path="/teams" element={<div>Teams Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;