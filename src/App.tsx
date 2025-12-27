import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MaintenanceRequestPage from './pages/MaintenanceRequest';
import Login from './pages/Login';
import Signup from './pages/Signup';

// 1. IMPORT YOUR NEW CALENDAR PAGE HERE
import Calendar from './pages/Calendar'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/requests/new" element={<MaintenanceRequestPage />} />
          
          {/* 2. UPDATE THIS LINE TO USE THE COMPONENT */}
          <Route path="/calendar" element={<Calendar />} />
          
          <Route path="/equipment" element={<div>Equipment Page</div>} />
          <Route path="/reporting" element={<div>Reporting Page</div>} />
          <Route path="/teams" element={<div>Teams Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;