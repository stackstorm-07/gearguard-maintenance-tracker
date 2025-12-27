import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MaintenanceRequestPage from './pages/MaintenanceRequest';
import Calendar from './pages/Calendar';
import EquipmentPage from './pages/Equipment';
import TeamsPage from './pages/Teams';
import ReportingPage from './pages/Reporting';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* DIRECT ACCESS TO LAYOUT (No PrivateRoute) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="requests/new" element={<MaintenanceRequestPage />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="equipment" element={<EquipmentPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="reporting" element={<ReportingPage />} />
        </Route>

        {/* Catch-all redirects to Dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;