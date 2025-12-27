import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Ensure this points to your new App.tsx
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);