import React from 'react';

interface StatProps {
  label: string;
  value: number;
  color: string;
  textColor: string;
}

const StatCard: React.FC<StatProps> = ({ label, value, textColor }) => {
  return (
    <div style={{ 
      backgroundColor: 'var(--card-bg)', // Uses theme card background
      padding: '20px', 
      borderRadius: 'var(--radius)', 
      border: '1px solid var(--border)', // Adds border for definition
      boxShadow: 'var(--shadow)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderTop: `4px solid ${textColor}`,
      transition: 'background 0.3s ease, color 0.3s ease' // Smooth transition
    }}>
      <h3 style={{ fontSize: '32px', margin: '0', color: 'var(--text)' }}>{value}</h3>
      <p style={{ margin: '5px 0 0 0', color: 'var(--subtext)', fontSize: '14px', fontWeight: '500' }}>{label}</p>
    </div>
  );
};

export default StatCard;