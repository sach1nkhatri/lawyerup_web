import { useState } from 'react';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';

const useManualPayment = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [latestPayment, setLatestPayment] = useState(null);

    /**
     * This may not be fully automated
     * But it Works Secure form End to End
     * A bit Labour Intensive
     * Since We got Daily plans We gotta to be fastt
     * Submits a manual payment request including screenshot and plan info.
     * Expects: plan, amount, method, duration, validUntil (Date), and file screenshot.
     */
    const submitManualPayment = async ({ plan, amount, method, duration, validUntil, screenshot }) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const token = localStorage.getItem('lawyerup_token');
            const formData = new FormData();

            // Append all required fields to form data
            formData.append('plan', plan);
            formData.append('amount', amount);
            formData.append('method', method);
            formData.append('duration', duration);
            formData.append('validUntil', validUntil.toISOString());
            formData.append('screenshot', screenshot);

            // Send form data with authentication header
            await axios.post(API.MANUAL_PAYMENT, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess(true);
            await getLatestUserPayment(); // Refresh user’s latest payment info
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetches the most recent manual payment for the logged-in user.
     */
    const getLatestUserPayment = async () => {
        try {
            const token = localStorage.getItem('lawyerup_token');
            const res = await axios.get(`${API.MANUAL_PAYMENT}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLatestPayment(res.data);
        } catch (err) {
            console.error('Payment fetch error:', err);
        }
    };

    return {
        submitManualPayment,
        loading,
        success,
        error,
        setSuccess, // exposed to manually reset UI state (if needed)
        latestPayment,
        getLatestUserPayment
    };
};

export default useManualPayment;
