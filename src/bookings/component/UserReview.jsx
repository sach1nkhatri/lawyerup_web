import React, { useState } from 'react';
import '../css/UserReview.css'; // updated to proper CSS file

const UserReview = ({ bookingId, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        alert(`Submitted review for ${bookingId} ⭐${rating}: ${comment}`);
        onClose();
    };

    return (
        <div className="review-modal-overlay">
            <div className="review-modal">
                <h3>Rate Your Lawyer</h3>

                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <label>Comment:</label>
                <textarea
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your experience..."
                />

                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UserReview;
