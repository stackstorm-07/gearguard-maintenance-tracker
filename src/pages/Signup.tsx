import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { auth, db } from '../firebase'; // Ensure these are imported correctly

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    // Simple regex check
    if (formData.password.length < 6) {
        return setError('Password should be at least 6 characters');
    }

    setLoading(true);
    console.log("1. Signup Started");

    try {
      // 1. Create User in Auth
      console.log("2. Creating Auth User...");
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log("3. Auth Success. User ID:", user.uid);

      // 2. Update Profile Name
      await updateProfile(user, { displayName: formData.name });

      // 3. Create Firestore Document
      console.log("4. Writing to Database...");
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        role: 'Portal User',
        company: 'My Company',
        createdAt: new Date().toISOString()
      });
      console.log("5. Database Write Success!");

      alert("Account created! Redirecting...");
      navigate('/'); 

    } catch (err: any) {
      console.error("❌ Signup Error:", err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff' }}>
      <div style={{ width: '400px', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>Sign Up</h2>
        
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '20px' }}>
             <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>Name</label>
             <input name="name" type="text" onChange={handleChange} required style={{ width: '100%', padding: '10px', borderBottom: '1px solid #9ca3af', border: 'none',  outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
             <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>Email</label>
             <input name="email" type="email" onChange={handleChange} required style={{ width: '100%', padding: '10px', border: 'none', borderBottom: '1px solid #9ca3af', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
             <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>Password</label>
             <input name="password" type="password" onChange={handleChange} required style={{ width: '100%', padding: '10px', border: 'none', borderBottom: '1px solid #9ca3af', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '30px' }}>
             <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>Confirm Password</label>
             <input name="confirmPassword" type="password" onChange={handleChange} required style={{ width: '100%', padding: '10px', border: 'none', borderBottom: '1px solid #9ca3af', outline: 'none' }} />
             {error && <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</div>}
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', background: 'white', cursor: 'pointer', fontWeight: '600' }}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
           Already have an account? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;