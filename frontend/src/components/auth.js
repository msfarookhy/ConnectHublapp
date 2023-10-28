import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// hook to access the authentication
export const useAuth = () => useContext(AuthContext);

// to manage the authentication state
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to set the authentication status
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
