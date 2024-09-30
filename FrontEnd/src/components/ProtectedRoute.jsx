import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente que protege las rutas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken'); // Obtener el token desde localStorage

  // Si el token no existe, redirigir al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si el token existe, permitir el acceso a la ruta
  return children;
};

export default ProtectedRoute;