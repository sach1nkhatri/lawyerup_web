import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useManualPayment from '../hooks/useManualPayment';
import khaltiLogo from '../../../app/assets/khalti-logo.png';
import esewaLogo from '../../../app/assets/esewa.png';
import BankLogo from '../../../app/assets/bank-logo.png';
import imeLogo from '../../../app/assets/imelogo.png';
import esewaQR from '../../../app/assets/payment_codes/esewa-code.JPG';
import khaltiQR from '../../../app/assets/payment_codes/khalti-code.PNG';
import imeQR from '../../../app/assets/payment_codes/imepay-code.JPG';
import bankQR from '../../../app/assets/payment_codes/bank-code.PNG';
import '../css/CheckoutPage.css';

const CheckoutPage = () => {
    const location = useLocation();
    const { planName, planPrice, planDuration } = location.state || {
        planName: 'Unknown Plan',
        planPrice: 'N/A',
        planDuration: ''
    };

    const [selectedMethod, setSelectedMethod] = useState(null);
    const [screenshot, setScreenshot] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const {
        submitManualPayment,
        loading,
        error,
        success,
        latestPayment,
        getLatestUserPayment
    } = useManualPayment();

    useEffect(() => {
        getLatestUserPayment();
    }, []);

    const getQRImageForMethod = (method) => {
        switch (method) {
            case 'eSewa':
                return esewaQR;
            case 'Khalti':
                return khaltiQR;
            case 'IME':
                return imeQR;
            case 'Bank':
            case 'Visa':
                return bankQR;
            default:
                return null;
        }
    };

    const getValidityDate = (durationString) => {
        const duration = durationString.toLowerCase();
        const days =
            duration.includes('daily') ? 1 :
                duration.includes('weekly') ? 7 :
                    duration.includes('monthly') ? 30 : 1;

        return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    };

    const confirmPayment = async () => {
        if (!selectedMethod || !screenshot) return;

        const validUntil = getValidityDate(planDuration);
        const cleanAmount = Number(planPrice.replace(/[^\d.]/g, ''));

        await submitManualPayment({
            plan: planName,
            amount: cleanAmount,
            method: selectedMethod,
            duration: planDuration,
            validUntil,
            screenshot
        });

        setSubmitted(true);
    };

    const renderManualQRUpload = () => {
        if (!selectedMethod) {
            return <div className="select-message">Select a payment method to proceed.</div>;
        }

        return (
            <div className="manual-payment-box">
                <h3>Scan QR to Pay</h3>
                <div className="qr-placeholder">
                    <img
                        src={getQRImageForMethod(selectedMethod)}
                        alt={`${selectedMethod} QR Code`}
                        className="qr-image"
                    />
                </div>

                <div className="upload-section">
                    <label>Upload Payment Screenshot</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setScreenshot(e.target.files[0])}
                    />
                    {screenshot && (
                        <p className="upload-success">✅ File selected: {screenshot.name}</p>
                    )}
                </div>

                <button
                    className="confirm-btn"
                    onClick={confirmPayment}
                    disabled={!screenshot || loading}
                >
                    {loading ? 'Submitting...' : "I've Paid – Submit for Review"}
                </button>

                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            </div>
        );
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
                        {['Khalti', 'eSewa', 'Bank', 'IME'].map((method) => (
                            <div
                                key={method}
                                className={`method-tile ${selectedMethod === method ? 'active' : ''}`}
                                onClick={() => setSelectedMethod(method)}
                            >
                                <img
                                    src={
                                        method === 'Khalti' ? khaltiLogo :
                                            method === 'eSewa' ? esewaLogo :
                                                method === 'Bank' ? BankLogo :
                                                    imeLogo
                                    }
                                    alt={method}
                                />
                                <span>{method === 'Bank' ? 'Bank Transfer' : method}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: QR + Upload / Confirmation */}
            <div className="checkout-right">
                {(submitted && success) || latestPayment ? (
                    <div className="confirmation-screen">
                        <h3>✅ Payment Submitted!</h3>
                        <p>We’ve received your payment request.</p>
                        <p>Method: <strong>{latestPayment?.method || selectedMethod}</strong></p>
                        <p>Plan: <strong>{latestPayment?.plan || planName}</strong></p>
                        <p>
                            Valid Until:{' '}
                            <strong>
                                {new Date(latestPayment?.validUntil || getValidityDate(planDuration)).toDateString()}
                            </strong>
                        </p>
                        <p>Status: <span className="pending-text">
              {latestPayment?.status === 'approved' ? '✅ Approved' :
                  latestPayment?.status === 'rejected' ? '❌ Rejected' :
                      '⏳ Pending Admin Confirmation'}
            </span></p>
                    </div>
                ) : (
                    renderManualQRUpload()
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
