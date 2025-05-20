import React from 'react';
import '../css/LawyerUp.css';

const ReviewList = ({ reviews }) => (
    <div className="review-list">
        {reviews.map((rev, index) => (
            <div key={index} className="review-item">
                <p>{rev.comment}</p>
                <p className="reviewer">{rev.user} {'⭐'.repeat(rev.rating)}</p>
            </div>
        ))}
    </div>
);

export default ReviewList;
