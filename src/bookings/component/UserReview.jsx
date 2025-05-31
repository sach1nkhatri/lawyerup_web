import React, { useState } from 'react';
import axios from 'axios';
import '../css/UserReview.css';
import { notify } from '../../utils/notify'; // ✅ uses your custom sound-based toast

const UserReview = ({ bookingId, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!rating || !comment.trim()) {
            notify('error', 'Please give a rating and write a comment.');
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

            notify('success', 'Review submitted successfully!');
            onClose();
        } catch (err) {
            console.error('Review submission error:', err);
            notify('error', '❌ Failed to submit review. Please try again.');
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
