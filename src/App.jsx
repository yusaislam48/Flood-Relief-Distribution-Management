import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import OrganizationDashboard from './pages/OrganizationDashboard';
import RegistrationPage from './pages/RegistrationPage';
import FloodAreaManagement from './pages/FloodAreaManagement';
import RequestManagement from './pages/RequestManagement';
import TrackingMap from './pages/TrackingMap';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('flood_relief_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Save user to localStorage when user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('flood_relief_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('flood_relief_user');
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('flood_relief_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Flood Relief Management System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navbar user={user} onLogout={handleLogout} />}
      
      <main className={user ? 'pt-16' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <RegistrationPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              user ? (
                user.role === 'admin' ? <AdminDashboard user={user} /> : <OrganizationDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          <Route 
            path="/flood-areas" 
            element={
              user && user.role === 'admin' ? (
                <FloodAreaManagement user={user} />
              ) : (
                <Navigate to="/dashboard" />
              )
            } 
          />
          
          <Route 
            path="/requests" 
            element={
              user && user.role === 'admin' ? (
                <RequestManagement user={user} />
              ) : (
                <Navigate to="/dashboard" />
              )
            } 
          />
          
          <Route 
            path="/tracking" 
            element={
              user ? <TrackingMap user={user} /> : <Navigate to="/login" />
            } 
          />
          
          {/* Default redirect */}
          <Route 
            path="/" 
            element={<Navigate to={user ? "/dashboard" : "/login"} />} 
          />
          
          {/* 404 */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600">Page not found</p>
                </div>
              </div>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;