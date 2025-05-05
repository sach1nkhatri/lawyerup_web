import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/pages/LandingPage';
import AuthForm from './components/LoginSignup';
import Dashboard from './pages/Dashboard'; // ✅ import your Dashboard page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthForm />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ FIXED */}
            </Routes>
        </Router>
    );
}

export default App;
