import React, { useState } from 'react';
import '../css/PricingPlans.css';
import tick from '../assets/tick.png';
import no from '../assets/no.png';

const PricingPlans = () => {
    const [isYearly, setIsYearly] = useState(true);

    const pricing = {
        monthly: {
            basic: 'NPR.200/month',
            premium: 'NPR.500/month',
        },
        yearly: {
            basic: 'NPR.1000/-',
            premium: 'NPR.5000/-',
        }
    };

    return (
        <section className="pricing-section" id="pricing">
            <h2 className="pricing-title">Plans & Pricing</h2>

            <div className={`toggle-wrapper ${isYearly ? 'yearly' : ''}`}>
                <button
                    className={!isYearly ? 'active-toggle' : ''}
                    onClick={() => setIsYearly(false)}
                >
                    Monthly
                </button>
                <button
                    className={isYearly ? 'active-toggle' : ''}
                    onClick={() => setIsYearly(true)}
                >
                    Yearly
                </button>
            </div>

            <div className="plans-grid">
                {/* FREE PLAN */}
                <div className="plan-card">
                    <h3>Free Trail</h3>
                    <p className="price-label">No need to pay</p>
                    <ul>
                        <li><img src={tick} alt="✔" /> Access to Constitution, Civil Code, Criminal Code, and more</li>
                        <li><img src={tick} alt="✔" /> 500 words per day or 10 chat bot interactions</li>
                        <li><img src={tick} alt="✔" /> Includes legal news and articles</li>
                        <li><img src={tick} alt="✔" /> Lawyer Booking and Appointment</li>
                        <li><img src={no} alt="✖" /> No 24/7 tech Support</li>
                    </ul>
                    <button className="choose-btn">Choose Plan</button>
                </div>

                {/* BASIC PLAN */}
                <div className="plan-card">
                    <h3>Basic Plan</h3>
                    <p className="price-label">{isYearly ? pricing.yearly.basic : pricing.monthly.basic}</p>
                    <ul>
                        <li><img src={tick} alt="✔" /> Everything in Free Plan +</li>
                        <li><img src={tick} alt="✔" /> Unlimited AI chat access with smarter legal responses</li>
                        <li><img src={tick} alt="✔" /> Includes legal news and articles</li>
                        <li><img src={tick} alt="✔" /> Lawyer Booking and Appointment</li>
                        <li><img src={tick} alt="✔" /> Great for students, citizens, and regular users</li>
                        <li><img src={no} alt="✖" /> No 24/7 tech Support</li>
                    </ul>
                    <button className="choose-btn">Choose Plan</button>
                </div>

                {/* PREMIUM PLAN */}
                <div className="plan-card">
                    <h3>Premium Plan</h3>
                    <p className="price-label">{isYearly ? pricing.yearly.premium : pricing.monthly.premium}</p>
                    <ul>
                        <li><img src={tick} alt="✔" /> Everything in Basic Plan +</li>
                        <li><img src={tick} alt="✔" /> Advanced legal reasoning and law document analysis</li>
                        <li><img src={tick} alt="✔" /> Tools for lawyers, researchers, and professionals</li>
                        <li><img src={tick} alt="✔" /> Best For lawyers & LawForms</li>
                        <li><img src={tick} alt="✔" /> 24/7 Tech Support</li>
                    </ul>
                    <button className="choose-btn">Choose Plan</button>
                </div>
            </div>
        </section>
    );
};

export default PricingPlans;
