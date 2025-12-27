// src/components/maintenance/MaintenanceRequestList.tsx

import React from 'react';
import { MaintenanceRequest } from './mt';
import MaintenanceTeamCard from './mtc';

interface MaintenanceRequestListProps {
  maintenanceRequests: MaintenanceRequest[];
}

const MaintenanceRequestList: React.FC<MaintenanceRequestListProps> = ({ maintenanceRequests }) => {
  return (
    <div>
      {maintenanceRequests.map((request) => (
        <MaintenanceTeamCard key={request.id} request={request} />
      ))}
    </div>
  );
};

export default MaintenanceRequestList;
