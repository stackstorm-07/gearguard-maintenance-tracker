import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext'; // <--- IMPORT THIS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* <--- WRAP EVERYTHING HERE */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);