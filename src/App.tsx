import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import MaintenanceRequestsList from "./pages/MaintenanceRequestsList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected app layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />

          {/* Maintenance */}
          <Route path="/requests" element={<MaintenanceRequestsList />} />
          <Route path="/requests/new" element={<MaintenanceRequest />} />

          {/* Other modules (placeholders) */}
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
