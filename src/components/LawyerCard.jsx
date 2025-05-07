import React from 'react';
import '../css/LawyerCard.css';
import defaultPhoto from '../assets/user.png'; // placeholder image

const LawyerCard = ({ name, specialization, contact, education, rating }) => {
    return (
        <div className="lawyer-card">
            <img src={defaultPhoto} alt="Lawyer" className="lawyer-photo" />
            <div className="lawyer-info">
                <p><strong>{name}</strong></p>
                <p>Specialization: {specialization}</p>
                <p>Contact: {contact}</p>
                <p>Education: {education}</p>
                <div className="rating">
                    {'⭐'.repeat(rating)}{'☆'.repeat(5 - rating)}
                </div>
            </div>
        </div>
    );
};

export default LawyerCard;
