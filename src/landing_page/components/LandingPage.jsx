import React from 'react';
import Header from './Header';
import WelcomeSection from './WelcomeSection';
import AboutUs from './AboutUs';
import OurServices from './OurServices';
import Plans from './PricingPlans';
import Footer from './Footer';
const LandingPage = () => {
    return (
        <>
            <Header />
            <WelcomeSection />
            <AboutUs />
            <OurServices />
            <Plans/>
            <Footer />
        </>
    );
};

export default LandingPage;
