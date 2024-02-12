import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

function ProtectedRoute({ element, ...rest }) {
  const { authenticated } = useAuth();

  return authenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
