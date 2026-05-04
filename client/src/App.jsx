import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import ReportItemPage from './pages/ReportItemPage';
import ReportFoundPage from './pages/ReportFoundPage';
import BrowseItemsPage from './pages/BrowseItemsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ItemDetailPage from './pages/ItemDetailPage';
import './index.css';
import './extra.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/browse" element={<BrowseItemsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/report-lost" element={
            <ProtectedRoute>
              <ReportItemPage />
            </ProtectedRoute>
          } />
          <Route path="/report-found" element={
            <ProtectedRoute>
              <ReportFoundPage />
            </ProtectedRoute>
          } />
          <Route path="/item/:id" element={<ItemDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
