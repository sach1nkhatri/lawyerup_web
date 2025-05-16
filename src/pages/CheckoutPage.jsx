import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import khaltiLogo from '../assets/khalti-logo.png';
import esewaLogo from '../assets/esewa.png';
import visaLogo from '../assets/visa.png';
import imeLogo from '../assets/imelogo.png'
import '../css/CheckoutPage.css';

const CheckoutPage = () => {
    const location = useLocation();
    const { planName, planPrice, planDuration } = location.state || {
        planName: 'Unknown Plan',
        planPrice: 'N/A',
        planDuration: '',
    };

    const [selectedMethod, setSelectedMethod] = useState(null);

    const confirmPayment = () => {
        if (!selectedMethod) return;
        alert(`✅ Payment Successful!\n\nPlan: ${planName}\nDuration: ${planDuration}\nPrice: ${planPrice}\nMethod: ${selectedMethod}`);
    };

    const renderPaymentForm = () => {
        if (selectedMethod === 'Khalti' || selectedMethod === 'eSewa' || selectedMethod === 'IME') {
            return (
                <div className={`wallet-form ${selectedMethod}`}>
                    <h3>Pay via {selectedMethod} Wallet</h3>
                    <label>Mobile Number</label>
                    <input type="text" placeholder="98******" />
                    <label>Password / PIN</label>
                    <input type="password" placeholder="****" />
                    <label>OTP</label>
                    <input type="text" placeholder="Enter OTP sent to +977" />
                    <button className="pay-now">Pay Rs. {planPrice}</button>
                    <p className="extra-link">Forgot {selectedMethod} Password?</p>
                    <p className="extra-link">Set {selectedMethod} Password</p>
                </div>
            );
        }

        if (selectedMethod === 'Visa') {
            return (
                <div className="card-form">
                    <h3>Pay with VISA Card</h3>
                    <label>Card Number</label>
                    <input type="text" placeholder="**** **** **** 1234" />
                    <label>Expiry</label>
                    <input type="text" placeholder="MM/YY" />
                    <label>CVV</label>
                    <input type="text" placeholder="123" />
                    <button className="pay-now">Pay Rs. {planPrice}</button>
                </div>
            );
        }

        return <div className="select-message">Select a payment method to proceed.</div>;
    };

    return (
        <div className="checkout-wrapper">
            {/* Left Column: Plan Summary */}
            <div className="checkout-left">
                <h2>Your Plan</h2>
                <div className="plan-box">
                    <h3>{planName}</h3>
                    <p>{planDuration} • {planPrice}</p>
                    <ul>
                        <li>✔ Full access to legal tools</li>
                        <li>✔ Unlimited chatbot queries</li>
                        <li>✔ Lawyer search & booking</li>
                        <li>✔ Legal news & articles</li>
                    </ul>
                </div>
            </div>

            {/* Center Column: Method Selection */}
            <div className="checkout-center">
                <h2>Confirm Your Payment</h2>
                <div className="method-section">
                    <h4>Select Payment Method</h4>
                    <div className="method-options">
                        <div
                            className={`method-tile ${selectedMethod === 'Khalti' ? 'active' : ''}`}
                            onClick={() => setSelectedMethod('Khalti')}
                        >
                            <img src={khaltiLogo} alt="Khalti"/>
                            <span>Khalti</span>
                        </div>
                        <div
                            className={`method-tile ${selectedMethod === 'eSewa' ? 'active' : ''}`}
                            onClick={() => setSelectedMethod('eSewa')}
                        >
                            <img src={esewaLogo} alt="eSewa"/>
                            <span>eSewa</span>
                        </div>
                        <div
                            className={`method-tile ${selectedMethod === 'Visa' ? 'active' : ''}`}
                            onClick={() => setSelectedMethod('Visa')}
                        >
                            <img src={visaLogo} alt="Visa"/>
                            <span>VISA</span>
                        </div>
                        <div
                            className={`method-tile ${selectedMethod === 'imepay' ? 'active' : ''}`}
                            onClick={() => setSelectedMethod('IME')}
                        >
                            <img src={imeLogo} alt="IME"/>
                            <span>IME pay</span>
                        </div>
                    </div>
                    <button
                        className={`confirm-btn ${selectedMethod ? '' : 'disabled'}`}
                        onClick={confirmPayment}
                        disabled={!selectedMethod}
                    >
                        Confirm & Pay
                    </button>
                </div>
            </div>

            {/* Right Column: Dynamic Form */}
            <div className="checkout-right">
                {renderPaymentForm()}
            </div>
        </div>
    );
};

export default CheckoutPage;
