import React, { useState, useEffect } from 'react';
import { requestService } from '../services/requestService';
import { MaintenanceRequest } from '../types';

const Calendar = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 1. Fetch Requests
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await requestService.getAll();
        setRequests(data);
      } catch (error) {
        console.error("Error loading calendar:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Calendar Helper: Get Days of Current Week
  const getDaysOfWeek = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    start.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getDaysOfWeek(currentDate);

  // 3. Helper: Find requests for a specific date
  const getRequestsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return requests.filter(req => 
      (req.scheduledDate && req.scheduledDate.startsWith(dateString)) || 
      req.requestDate === dateString
    );
  };

  if (loading) return <div style={{ padding: '24px' }}>Loading Schedule...</div>;

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#fff' }}>
      
      {/* Sidebar (Mini Calendar) */}
      <div style={{ width: '250px', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <button style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', marginBottom: '20px', cursor: 'pointer' }}>
          + Add
        </button>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '10px' }}>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        {/* Simple Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
             <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))}>Prev</button>
             <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))}>Next</button>
        </div>
      </div>

      {/* Main Calendar Grid */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header Row (Days) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e5e7eb' }}>
          {weekDays.map((day, index) => (
            <div key={index} style={{ padding: '15px', textAlign: 'center', borderRight: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginTop: '4px' }}>
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Body (Events) */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: '#f9fafb' }}>
          {weekDays.map((day, index) => {
            const daysRequests = getRequestsForDate(day);
            return (
              <div key={index} style={{ borderRight: '1px solid #e5e7eb', padding: '10px', minHeight: '100px' }}>
                {daysRequests.map(req => (
                  <div key={req.id} style={{ 
                    backgroundColor: 'white', borderLeft: `4px solid ${req.priority === 'High' ? '#ef4444' : '#3b82f6'}`,
                    padding: '8px', marginBottom: '8px', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '12px'
                  }}>
                    <div style={{ fontWeight: '600', color: '#1f2937' }}>{req.equipmentId}</div>
                    <div style={{ color: '#6b7280', marginTop: '2px' }}>{req.technicianId}</div>
                    <div style={{ marginTop: '4px', fontSize: '10px', color: '#9ca3af' }}>{req.stage}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;