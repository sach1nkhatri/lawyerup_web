import React from 'react';
import FAQItem from './FAQItem';
import { faqs } from '../data/faqData';
import { useSupportEmail } from '../hooks/useSupportEmail';
import '../css/HelpFAQPage.css';

const HelpFAQPage = () => {
    const handleSupportClick = useSupportEmail();

    return (
        <div className="faq-container">
            <h1 className="faq-title">Help & FAQ</h1>
            <p className="faq-intro">Got a question? We’ve got answers below.</p>

            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}

            <div className="faq-footer">
                <button className="support-btn" onClick={handleSupportClick}>
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default HelpFAQPage;
