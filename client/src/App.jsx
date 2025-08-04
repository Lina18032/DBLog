import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/login';
import Home from './home';
import PrivateRoute from './components/privateRoute';
import Tab from './components/Tab';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Servers from './components/Servers';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Layout />}>
          <Route path="home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/servers" element={<PrivateRoute><Servers /></PrivateRoute>} />
          <Route path="db/:dbName" element={<PrivateRoute><Tab /></PrivateRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
