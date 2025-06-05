import React from 'react';
import FAQItem from './FAQItem';
import '../css/HelpFAQPage.css';

const faqs = [
    {
        question: 'What laws does LawyerUp cover?',
        answer: 'We include Nepalese Constitution, Civil Code, Criminal Code, Tax Law, Land Law, and more.',
    },
    {
        question: 'How do I book a lawyer?',
        answer: 'Go to the "LawyerUp" section, select a lawyer, choose your time, and confirm your appointment.',
    },
    {
        question: 'Can I trust the legal chatbot?',
        answer: 'Our AI is trained on Nepalese legal documents. It is informative, but not a substitute for professional legal advice.',
    },
    {
        question: 'Is my data secure?',
        answer: 'Yes. LawyerUp follows modern security practices to ensure your data remains confidential.',
    },
    {
        question: 'How do I report an issue?',
        answer: 'Use the sidebar "Report" option to describe and submit your issue.',
    },
];

const HelpFAQPage = () => {
    return (
        <div className="faq-container">
            <h1 className="faq-title">Help & FAQ</h1>
            <p className="faq-intro">Got a question? We’ve got answers below.</p>
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
            <div className="faq-footer">
                <button className="support-btn">Contact Support</button>
            </div>
        </div>
    );
};

export default HelpFAQPage;
