// src/components/maintenance/MaintenanceRequestForm.tsx

import React, { useState } from 'react';
import { MaintenanceRequest } from './mt';

interface MaintenanceRequestFormProps {
  onAdd: (request: MaintenanceRequest) => void;
}

const MaintenanceRequestForm: React.FC<MaintenanceRequestFormProps> = ({ onAdd }) => {
  const [request, setRequest] = useState<MaintenanceRequest>({
    id: '',
    teamName: '',
    technician: '',
    subject: '',
    equipment: '',
    scheduledDate: '',
    duration: '',
    requestType: 'Corrective',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Update the state using the previous state (prev), correctly typed
    setRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(request);
    // Reset the form
    setRequest({
      id: '',
      teamName: '',
      technician: '',
      subject: '',
      equipment: '',
      scheduledDate: '',
      duration: '',
      requestType: 'Corrective',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={request.subject}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="equipment"
        placeholder="Equipment"
        value={request.equipment}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="scheduledDate"
        value={request.scheduledDate}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration"
        value={request.duration}
        onChange={handleChange}
        required
      />
      <select
        name="requestType"
        value={request.requestType}
        onChange={handleChange}
      >
        <option value="Corrective">Corrective (Unplanned Repair)</option>
        <option value="Preventive">Preventive (Planned Maintenance)</option>
      </select>
      <input
        type="text"
        name="teamName"
        placeholder="Team Name"
        value={request.teamName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="technician"
        placeholder="Technician Name"
        value={request.technician}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Maintenance Request</button>
    </form>
  );
};

export default MaintenanceRequestForm;
