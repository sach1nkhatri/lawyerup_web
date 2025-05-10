import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import AuthForm from './components/LoginSignup';
import Dashboard from './pages/Dashboard';
import PricingPlans from './components/PricingPlans';
import CheckoutPage from './pages/CheckoutPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pricing" element={<PricingPlans />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
        </Router>
    );
}

export default App;
