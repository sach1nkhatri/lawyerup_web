import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AuthForm from './components/LoginSignup';
import Dashboard from './pages/Dashboard';
import PricingPlans from './components/PricingPlans';
import CheckoutPage from './pages/CheckoutPage';
import PrivateRoute from './routes/privateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthForm />} />

                {/* ✅ Allow nested routing under dashboard */}
                <Route path="/dashboard/*" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />

                <Route path="/pricing" element={<PricingPlans />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
        </Router>
    );
}

export default App;
