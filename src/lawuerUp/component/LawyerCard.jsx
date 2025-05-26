import React from 'react';
import '../css/LawyerCard.css';

const LawyerCard = ({ lawyer, onViewProfile, showShare }) => {
    const hasReviews = lawyer.reviews && lawyer.reviews.length > 0;

    const totalRatings = hasReviews
        ? lawyer.reviews.reduce((sum, r) => sum + r.rating, 0)
        : 0;
    const avgRating = hasReviews ? totalRatings / lawyer.reviews.length : 0;
    const rounded = Math.round(avgRating);

    const stars = '⭐'.repeat(rounded) + '☆'.repeat(5 - rounded);

    return (
        <div className="lawyer-card">
            <img
                src={
                    lawyer.profilePhoto?.startsWith('data:image')
                        ? lawyer.profilePhoto
                        : `http://localhost:5000/uploads/${lawyer.profilePhoto || 'avatar.png'}`
                }
                alt="Lawyer"
                className="lawyer-photo"
            />
            <div className="lawyer-info">
                <p><strong>{lawyer.fullName}</strong></p>
                <p>{lawyer.specialization}</p>
                <div className="rating">
                    {stars}
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
