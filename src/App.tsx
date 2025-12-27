import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MaintenanceRequestPage from './pages/MaintenanceRequest';
import Login from './pages/Login'; // Assuming you kept the previous login file
import Signup from './pages/Signup'; // Assuming you kept the previous signup file

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/requests/new" element={<MaintenanceRequestPage />} />
          {/* Placeholders for other pages */}
          <Route path="/calendar" element={<div>Calendar Page</div>} />
          <Route path="/equipment" element={<div>Equipment Page</div>} />
          <Route path="/reporting" element={<div>Reporting Page</div>} />
          <Route path="/teams" element={<div>Teams Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;