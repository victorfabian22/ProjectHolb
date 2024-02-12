import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Componente proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false); // Estado de autenticación
  const [user, setUser] = useState(null); // Estado del usuario

  // Función para iniciar sesión (puedes adaptarla según tu lógica de autenticación)
  const login = () => {
    console.log("logeo exitoso")
    setAuthenticated(true);
    
  };

  // Función para cerrar sesión
  const logout = () => {
    console.log("logout exitoso")
    setAuthenticated(false);
    localStorage.removeItem('token');
  };

  // Valor del contexto de autenticación
  const authContextValue = {
    authenticated,
    user,
    login,
    logout,
    setUser, 
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
