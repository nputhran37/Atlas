import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ReportItemPage from './pages/ReportItemPage';
import './index.css';
import './extra.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/report-lost" element={<ReportItemPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
