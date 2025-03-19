import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import FullInterviewsPage from './pages/FullInterviewsPage';
import FastTrackPage from './pages/FastTrackPage';
import ExpertsPage from './pages/ExpertsPage';
import CommunityPage from './pages/CommunityPage';
import ResumePage from './pages/ResumePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ConductConnectionPage from './pages/ConductConnectionPage';
import EmailPopup from './components/EmailPopup';
import Footer from './components/Footer';

export default function App() {
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem('hasSubscribed');
    if (!hasSubscribed) {
      setShowEmailPopup(true);
    }
  }, []);

  const handleStayInLoop = () => {
    setShowEmailPopup(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <Navigation onStayInLoop={handleStayInLoop} />
        <main className="md:pl-64 pt-16 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/conduct-connection" element={<ConductConnectionPage />} />
            <Route path="/interviews" element={<FullInterviewsPage />} />
            <Route path="/fast-track" element={<FastTrackPage />} />
            <Route path="/experts" element={<ExpertsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
        </main>
        <Footer onStayInLoop={handleStayInLoop} />
        {showEmailPopup && <EmailPopup onClose={() => setShowEmailPopup(false)} />}
      </div>
    </Router>
  );
}