import { useState } from 'react';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';

const useManualPayment = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [latestPayment, setLatestPayment] = useState(null);

    const submitManualPayment = async ({ plan, amount, method, duration, validUntil, screenshot }) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const token = localStorage.getItem('lawyerup_token');
            const formData = new FormData();

            formData.append('plan', plan);
            formData.append('amount', amount);
            formData.append('method', method);
            formData.append('duration', duration);
            formData.append('validUntil', validUntil.toISOString());
            formData.append('screenshot', screenshot);

            await axios.post(API.MANUAL_PAYMENT, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess(true);
            await getLatestUserPayment();
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

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
        setSuccess,
        latestPayment,
        getLatestUserPayment
    };
};

export default useManualPayment;
