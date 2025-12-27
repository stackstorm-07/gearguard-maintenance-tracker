import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/'); 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff' }}>
      <div style={{ width: '400px', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>Login Page</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>Email id</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderBottom: '1px solid #9ca3af', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>Password</label>
            <input type="password" required style={{ width: '100%', padding: '10px', borderBottom: '1px solid #9ca3af', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', background: 'white', cursor: 'pointer', fontWeight: '600' }}>
            Sign in
          </button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
          <span style={{ color: '#2563eb', cursor: 'pointer' }}>Forget Password?</span> | <a href="/signup" style={{ color: '#2563eb', textDecoration: 'none' }}>Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;