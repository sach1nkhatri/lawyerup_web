import React, { useEffect, useState } from 'react';
import FAQItem from './FAQItem';
import { useSupportEmail } from '../hooks/useSupportEmail';
import '../css/HelpFAQPage.css';
import axios from 'axios';

const HelpFAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleSupportClick = useSupportEmail();

    const endpoint = `${process.env.REACT_APP_API_URL}faqs`; // example: http://localhost:5000/api/faqs

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get(endpoint);
                setFaqs(response.data);
            } catch (err) {
                console.error('Failed to load FAQs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, [endpoint]);

    return (
        <div className="faq-container">
            <h1 className="faq-title">Help & FAQ</h1>
            <p className="faq-intro">Got a question? We’ve got answers below.</p>

            {loading ? (
                <p>Loading FAQs...</p>
            ) : faqs.length === 0 ? (
                <p className="empty">No FAQs available.</p>
            ) : (
                faqs.map((faq) => (
                    <FAQItem key={faq._id} question={faq.question} answer={faq.answer} />
                ))
            )}

            <div className="faq-footer">
                <button className="support-btn" onClick={handleSupportClick}>
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default HelpFAQPage;
