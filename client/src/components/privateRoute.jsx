
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('http://localhost:5000/check-auth', {
        credentials: 'include',
      });
      setIsAuthenticated(res.ok);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return null; 
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
