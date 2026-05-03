import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ReportItemPage from './pages/ReportItemPage';
import ReportFoundPage from './pages/ReportFoundPage';
import BrowseItemsPage from './pages/BrowseItemsPage';
import './index.css';
import './extra.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/browse" element={<BrowseItemsPage />} />
          <Route path="/report-lost" element={<ReportItemPage />} />
          <Route path="/report-found" element={<ReportFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
