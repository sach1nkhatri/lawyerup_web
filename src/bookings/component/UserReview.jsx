import React, { useState } from 'react';
import axios from 'axios';
import '../css/UserReview.css';

const UserReview = ({ bookingId, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!rating || !comment.trim()) {
            alert('Please give a rating and write a comment.');
            return;
        }

        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('lawyerup_user'));

            const payload = {
                user: user.fullName, // or user._id if needed
                comment,
                rating,
            };

            await axios.post(`http://localhost:5000/api/reviews/${bookingId}`, payload);

            alert('✅ Review submitted successfully!');
            onClose(); // Close the modal
        } catch (err) {
            console.error('Review submission error:', err);
            alert('❌ Failed to submit review. Please try again.');
        } finally {
            setLoading(false);
        }
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
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UserReview;
