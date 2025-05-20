import React from 'react';
import '../css/LawyerCard.css';

const LawyerCard = ({ lawyer, onViewProfile, showShare }) => {
    return (
        <div className="lawyer-card">
            <img src={lawyer.image} alt="Lawyer" className="lawyer-photo" />
            <div className="lawyer-info">
                <p><strong>{lawyer.name}</strong></p>
                <p>{lawyer.specialization}</p>
                <div className="rating">
                    {'⭐'.repeat(lawyer.rating)}{'☆'.repeat(5 - lawyer.rating)}
                </div>
                {showShare && <button className="share-btn">Share</button>}
                <button onClick={onViewProfile}>
                    {showShare ? 'Book Appointment' : 'View Profile'}
                </button>
            </div>
        </div>
    );
};

export default LawyerCard;
