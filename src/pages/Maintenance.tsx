import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Maintenance.css'; 

interface MaintenanceRequest {
  id: string;
  teamName: string;
  technician: string;
  subject: string;
  equipment: string;
  scheduledDate: string;
  duration: string;
  requestType: 'Corrective' | 'Preventive';
}

const Maintenance = (): JSX.Element => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newEquipment, setNewEquipment] = useState('');
  const [newRequestType, setNewRequestType] = useState<'Corrective' | 'Preventive'>('Corrective');
  const [newTeamName, setNewTeamName] = useState('');
  const [newTechnician, setNewTechnician] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newScheduledDate, setNewScheduledDate] = useState('');

  const handleAddRequest = () => {
    const newRequest: MaintenanceRequest = {
      id: Math.random().toString(36).substr(2, 9),
      teamName: newTeamName,
      technician: newTechnician,
      subject: newTitle,
      equipment: newEquipment,
      scheduledDate: newScheduledDate,
      duration: newDuration,
      requestType: newRequestType,
    };

    setRequests([...requests, newRequest]);
    resetForm();
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const resetForm = () => {
    setNewTitle('');
    setNewEquipment('');
    setNewRequestType('Corrective');
    setNewTeamName('');
    setNewTechnician('');
    setNewDuration('');
    setNewScheduledDate('');
    setModalOpen(false);
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'subject':
        setNewTitle(value);
        break;
      case 'equipment':
        setNewEquipment(value);
        break;
      case 'requestType':
        setNewRequestType(value as 'Corrective' | 'Preventive');
        break;
      case 'teamName':
        setNewTeamName(value);
        break;
      case 'technician':
        setNewTechnician(value);
        break;
      case 'duration':
        setNewDuration(value);
        break;
      case 'scheduledDate':
        setNewScheduledDate(value);
        break;
      default:
        break;
    }
  };

  return (
    <section className="maintenance-section">

      <div className="hero-section">
        <h1 className="page-title">Maintenance Requests</h1>
        <p className="subtitle">
          Corrective and preventive maintenance workflow.
        </p>
      </div>

      <div className="form-container">
        <h2 className="form-title">Schedule a Maintenance Request</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddRequest();
          }}
        >
          <div className="form-row">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={newTitle}
              onChange={handleModalChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="equipment"
              placeholder="Equipment"
              value={newEquipment}
              onChange={handleModalChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="date"
              name="scheduledDate"
              value={newScheduledDate}
              onChange={handleModalChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={newDuration}
              onChange={handleModalChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <select
              name="requestType"
              value={newRequestType}
              onChange={handleModalChange}
              className="form-input"
            >
              <option value="Corrective">Corrective (Unplanned Repair)</option>
              <option value="Preventive">Preventive (Planned Maintenance)</option>
            </select>
          </div>

          <div className="form-row">
            <input
              type="text"
              name="teamName"
              placeholder="Team Name"
              value={newTeamName}
              onChange={handleModalChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="technician"
              placeholder="Technician Name"
              value={newTechnician}
              onChange={handleModalChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="cta-button">
            Add Maintenance Request
          </button>
        </form>
      </div>

      <div className="maintenance-requests">
        <h2>Maintenance Requests</h2>
        <div className="requests-list">
          {requests.map((request) => (
            <div className="request-card" key={request.id}>
              <h3>{request.subject}</h3>
              <p><strong>Team:</strong> {request.teamName}</p>
              <p><strong>Technician:</strong> {request.technician}</p>
              <p><strong>Scheduled Date:</strong> {request.scheduledDate}</p>
              <p><strong>Type:</strong> {request.requestType}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="calendar-container">
        <h2>Calendar</h2>
        <Calendar onClickDay={handleDateClick} />
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Scheduled Maintenance</h3>
            <p><strong>Subject:</strong> {newTitle}</p>
            <p><strong>Equipment:</strong> {newEquipment}</p>
            <p><strong>Team:</strong> {newTeamName}</p>
            <p><strong>Technician:</strong> {newTechnician}</p>
            <p><strong>Scheduled Date:</strong> {newScheduledDate}</p>
            <p><strong>Duration:</strong> {newDuration}</p>
            <p><strong>Type:</strong> {newRequestType}</p>
            <button onClick={resetForm} className="cta-button">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Maintenance;
