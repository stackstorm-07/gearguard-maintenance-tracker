// src/components/maintenance/MaintenanceTeamCard.tsx

import React from 'react';
import { MaintenanceRequest } from './mt';

interface MaintenanceTeamCardProps {
  request: MaintenanceRequest;
}

const MaintenanceTeamCard: React.FC<MaintenanceTeamCardProps> = ({ request }) => {
  return (
    <div className="maintenance-card">
      <h2>{request.subject}</h2>
      <p><strong>Equipment:</strong> {request.equipment}</p>
      <p><strong>Team:</strong> {request.teamName}</p>
      <p><strong>Technician:</strong> {request.technician}</p>
      <p><strong>Request Type:</strong> {request.requestType}</p>
      <p><strong>Scheduled Date:</strong> {request.scheduledDate}</p>
      <p><strong>Duration:</strong> {request.duration}</p>
    </div>
  );
};

export default MaintenanceTeamCard;
