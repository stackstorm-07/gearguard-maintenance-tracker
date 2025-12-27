import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff' }}>
      <div style={{ width: '400px', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>Sign Up Page</h2>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Name</label>
            <input type="text" required style={{ width: '100%', padding: '8px', borderBottom: '1px solid #9ca3af', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Email id</label>
            <input type="email" required style={{ width: '100%', padding: '8px', borderBottom: '1px solid #9ca3af', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password</label>
            <input type="password" required style={{ width: '100%', padding: '8px', borderBottom: '1px solid #9ca3af', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Re-Enter password</label>
            <input type="password" required style={{ width: '100%', padding: '8px', borderBottom: '1px solid #9ca3af', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', background: 'white', cursor: 'pointer', fontWeight: '600' }}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;