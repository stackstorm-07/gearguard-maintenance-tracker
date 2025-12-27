// src/components/dashboard/StatCard.tsx
import React from 'react';

interface StatProps {
  label: string;
  value: number;
  color: string;
  textColor: string;
}

const StatCard: React.FC<StatProps> = ({ label, value, color, textColor }) => {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderTop: `4px solid ${textColor}`
    }}>
      <h3 style={{ fontSize: '32px', margin: '0', color: textColor }}>{value}</h3>
      <p style={{ margin: '5px 0 0 0', color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>{label}</p>
    </div>
  );
};

export default StatCard;