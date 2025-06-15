import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../src/utils/css/toast.css';

import LandingPage from './landing_page/components/LandingPage';
import AuthForm from './auth/components/LoginSignup';
import Dashboard from './dashboard/component/Dashboard';
import PricingPlans from './landing_page/components/PricingPlans';
import CheckoutPage from './landing_page/components/CheckoutPage';
import PrivateRoute from './routes/privateRoute';
import PlansPricing from './landing_page/components/PricingPlans'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<AuthForm />} />
                    <Route path="/dashboard/*" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/pricing" element={<PricingPlans />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/settings/pricing" element={<PlansPricing />} />
                </Routes>
            </Router>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

export default App;
