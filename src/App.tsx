import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/pages/LandingPage';
// import other pages when ready (e.g., About, Contact, Dashboard)

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* Add more routes here */}
        </Routes>
      </Router>
  );
}

export default App;
