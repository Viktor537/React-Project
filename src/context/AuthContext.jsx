import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    setLoadingAuth(false);
  }, []);

  const login = async (email, password) => {
    return Promise.reject(new Error("Login functionality not implemented yet."));
  };

  const register = async (email, password) => {
    return Promise.reject(new Error("Register functionality not implemented yet."));
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loadingAuth,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};