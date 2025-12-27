import React, { createContext, useContext, useState } from 'react';
import { User } from 'firebase/auth';

interface AuthContextType {
  currentUser: any; // Using 'any' for quick mock
  loading: boolean;
}

// MOCK USER DATA
const MOCK_USER = {
  uid: 'test-admin-123',
  displayName: 'Test Admin',
  email: 'admin@gearguard.com'
};

const AuthContext = createContext<AuthContextType>({ currentUser: MOCK_USER, loading: false });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always return the mock user, no loading
  return (
    <AuthContext.Provider value={{ currentUser: MOCK_USER, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};