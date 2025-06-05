// src/pages/LawyerUp.js
import React from 'react';
import dummyLawyers from '../data/lawyer';
import LawyerCard from '../components/LawyerCard';
import '../css/LawyerUp.css';

const LawyerUp = () => {
    return (
        <div className="lawyerup-container">
            <h2>LawyerUp</h2>
            <div className="lawyer-grid">
                {dummyLawyers.map((lawyer) => (
                    <LawyerCard key={lawyer.id} lawyer={lawyer} />
                ))}
            </div>
        </div>
    );
};

export default LawyerUp;
