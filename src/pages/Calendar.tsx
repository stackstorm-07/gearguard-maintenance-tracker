import React, { useState } from 'react';
import { MaintenanceRequest } from '../types';
import RequestModal from '../components/calendar/RequestModal';

// --- MOCK DATA (Backend Ready structure) ---
const MOCK_EVENTS: MaintenanceRequest[] = [
  {
    id: '1', subject: 'Machine Breakdown', createdBy: 'Admin', maintenanceFor: 'Equipment',
    equipmentId: 'CNC-Lathe', category: 'Machinery', requestDate: '2025-12-18',
    type: 'Corrective', teamId: 'Team A', technicianId: 'Mike Ross',
    scheduledDate: '2025-12-28T10:00:00', duration: 2, priority: 'High',
    company: 'GearGuard Inc', stage: 'New Request'
  },
  {
    id: '2', subject: 'Oil Change', createdBy: 'Admin', maintenanceFor: 'Equipment',
    equipmentId: 'Generator', category: 'Utility', requestDate: '2025-12-19',
    type: 'Preventive', teamId: 'Team B', technicianId: 'Sarah J',
    scheduledDate: '2025-12-29T14:30:00', duration: 1.5, priority: 'Medium',
    company: 'GearGuard Inc', stage: 'In Progress'
  },
  {
    id: '3', subject: 'Safety Inspection', createdBy: 'Admin', maintenanceFor: 'Work Center',
    equipmentId: 'Floor A', category: 'Safety', requestDate: '2025-12-20',
    type: 'Preventive', teamId: 'Team A', technicianId: 'Mike Ross',
    scheduledDate: '2025-12-30T09:00:00', duration: 4, priority: 'Low',
    company: 'GearGuard Inc', stage: 'New Request'
  }
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-12-28')); // Set to match mock data week
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);

  // --- HELPER FUNCTIONS ---
  
  // Get the start of the current week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  const startOfWeek = getStartOfWeek(currentDate);
  
  // Generate the 7 days array for the header
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  // Generate 24 hours for the sidebar
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Navigation Logic
  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // MINI CALENDAR LOGIC (For the Sidebar)
  const renderMiniCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} />);
    for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(year, month, i);
        const isToday = d.toDateString() === new Date().toDateString();
        const isSelected = d.toDateString() === currentDate.toDateString();
        days.push(
            <div key={i} 
                onClick={() => setCurrentDate(d)}
                style={{ 
                    width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '50%', fontSize: '12px', cursor: 'pointer',
                    backgroundColor: isSelected ? '#2563eb' : 'transparent',
                    color: isSelected ? 'white' : isToday ? '#2563eb' : '#333',
                    fontWeight: isSelected || isToday ? 'bold' : 'normal'
                }}
            >
                {i}
            </div>
        );
    }
    return days;
  };

  return (
    <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      
      {/* 1. TOP HEADER */}
      <div style={{ 
        padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', 
        justifyContent: 'space-between', alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Maintenance Calendar</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={prevWeek} style={btnStyle}>←</button>
                <button onClick={nextWeek} style={btnStyle}>→</button>
                <button onClick={() => setCurrentDate(new Date())} style={btnStyle}>Today</button>
            </div>
            <span style={{ fontWeight: '600', color: '#4b5563' }}>
                {startOfWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
        </div>
        
        {/* View Switcher Placeholder */}
        <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
            <button style={{ padding: '6px 12px', background: '#f3f4f6', border: 'none', fontWeight: 600 }}>Week</button>
            <button style={{ padding: '6px 12px', background: 'white', border: 'none', color: '#666' }}>Month</button>
            <button style={{ padding: '6px 12px', background: 'white', border: 'none', color: '#666' }}>Day</button>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* A. THE WEEKLY GRID (Left Side - Scrollable) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', borderRight: '1px solid #e5e7eb' }}>
            
            {/* Grid Header (Days) */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', paddingLeft: '50px' }}> {/* 50px offset for time column */}
                {weekDays.map(day => {
                    const isToday = day.toDateString() === new Date().toDateString();
                    return (
                        <div key={day.toString()} style={{ 
                            flex: 1, textAlign: 'center', padding: '10px 0', borderRight: '1px solid #f3f4f6',
                            color: isToday ? '#2563eb' : '#4b5563'
                        }}>
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>{day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</div>
                            <div style={{ fontSize: '20px', fontWeight: isToday ? 'bold' : 'normal' }}>{day.getDate()}</div>
                        </div>
                    );
                })}
            </div>

            {/* Grid Body (Hours & Events) */}
            <div style={{ position: 'relative', flex: 1, minHeight: '1440px' }}> {/* 1440px = 60px height * 24 hours */}
                
                {/* Time Labels Column */}
                <div style={{ position: 'absolute', width: '50px', top: 0, bottom: 0, borderRight: '1px solid #e5e7eb', backgroundColor: '#fff' }}>
                    {hours.map(h => (
                        <div key={h} style={{ 
                            height: '60px', textAlign: 'right', paddingRight: '8px', fontSize: '11px', color: '#9ca3af',
                            transform: 'translateY(-6px)' 
                        }}>
                            {h}:00
                        </div>
                    ))}
                </div>

                {/* Vertical Lines for Days */}
                <div style={{ marginLeft: '50px', display: 'flex', height: '100%' }}>
                    {weekDays.map((_, i) => (
                        <div key={i} style={{ flex: 1, borderRight: '1px solid #f3f4f6', position: 'relative' }}>
                            {/* Horizontal Lines for Hours */}
                            {hours.map(h => (
                                <div key={h} style={{ height: '60px', borderBottom: '1px solid #f9fafb' }} />
                            ))}
                        </div>
                    ))}
                </div>

                {/* THE EVENTS LAYER */}
                {/* We map specific mock events that fall in this week */}
                <div style={{ position: 'absolute', top: 0, left: '50px', right: 0, height: '100%', pointerEvents: 'none' }}>
                    {MOCK_EVENTS.map(ev => {
                        const date = new Date(ev.scheduledDate);
                        // Check if event is in current view
                        if (date >= startOfWeek && date < new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000)) {
                            
                            // Calculate positioning
                            const dayIndex = date.getDay(); // 0-6
                            const startHour = date.getHours() + (date.getMinutes() / 60);
                            const duration = ev.duration;

                            return (
                                <div 
                                    key={ev.id}
                                    onClick={() => setSelectedRequest(ev)}
                                    style={{
                                        position: 'absolute',
                                        left: `${(dayIndex * 100) / 7}%`,
                                        width: `${100 / 7}%`,
                                        top: `${startHour * 60}px`, // 60px per hour
                                        height: `${duration * 60}px`,
                                        padding: '2px',
                                        pointerEvents: 'auto', // Re-enable clicks
                                        zIndex: 10
                                    }}
                                >
                                    <div style={{
                                        backgroundColor: ev.priority === 'High' ? '#fee2e2' : '#dbeafe',
                                        borderLeft: `3px solid ${ev.priority === 'High' ? '#dc2626' : '#2563eb'}`,
                                        height: '100%',
                                        borderRadius: '4px',
                                        padding: '4px 8px',
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                    }}>
                                        <div style={{ fontWeight: 'bold', color: '#333' }}>{ev.subject}</div>
                                        <div style={{ color: '#666' }}>{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

            </div>
        </div>

        {/* B. SIDEBAR (Mini Calendar) */}
        <div style={{ width: '280px', padding: '20px', borderLeft: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ cursor: 'pointer', fontSize: '12px' }}>&lt;</span>
                    <span style={{ cursor: 'pointer', fontSize: '12px' }}>&gt;</span>
                </div>
            </div>
            
            {/* Mini Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', fontSize: '12px', textAlign: 'center', marginBottom: '8px', color: '#9ca3af' }}>
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {renderMiniCalendar()}
            </div>

            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Quick Stats</h4>
                <div style={{ fontSize: '12px', color: '#666', display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span>Scheduled this week:</span>
                    <strong>3</strong>
                </div>
                <div style={{ fontSize: '12px', color: '#666', display: 'flex', justifyContent: 'space-between' }}>
                    <span>High Priority:</span>
                    <strong style={{ color: '#dc2626' }}>1</strong>
                </div>
            </div>
        </div>

      </div>

      {/* 3. MODAL POPUP */}
      {selectedRequest && (
        <RequestModal 
            request={selectedRequest} 
            onClose={() => setSelectedRequest(null)} 
        />
      )}

    </div>
  );
};

// Styles
const btnStyle = {
    background: 'white',
    border: '1px solid #e5e7eb',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#374151',
    fontSize: '14px'
};

export default Calendar;