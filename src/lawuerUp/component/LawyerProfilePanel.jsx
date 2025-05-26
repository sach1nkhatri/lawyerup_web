import React, { useState } from 'react';
import ReviewList from './ReviewList';
import AppointmentModal from '../../modals/AppointmentModal';
import '../css/LawyerUp.css';

const currentUser = JSON.parse(localStorage.getItem('lawyerup_user'));
const isUser = currentUser?.role === 'user';

const LawyerProfilePanel = ({ lawyer, onBack }) => {
    const [showModal, setShowModal] = useState(false);

    if (!lawyer) return <p>Lawyer not found.</p>;

    const hasAvailability = lawyer.schedule && Object.keys(lawyer.schedule).length > 0;
    const hasReviews = lawyer.reviews && lawyer.reviews.length > 0;

    // 🔢 Calculate rating from reviews
    const totalRatings = hasReviews
        ? lawyer.reviews.reduce((sum, r) => sum + r.rating, 0)
        : 0;

    const avgRating = hasReviews ? totalRatings / lawyer.reviews.length : 0;
    const rounded = Math.round(avgRating);
    const filledStars = '⭐'.repeat(rounded);
    const emptyStars = '☆'.repeat(5 - rounded);

    return (
        <div className="profile-panel">
            <h3>Profile</h3>
            <p><strong>Name:</strong> {lawyer.fullName}</p>
            <p><strong>Speciality:</strong> {lawyer.specialization}</p>
            <p><strong>Qualification:</strong> {lawyer.qualification}</p>
            <p><strong>Address:</strong> {lawyer.address}</p>
            <p><strong>Contact:</strong> {lawyer.phone}</p>

            {hasAvailability && isUser ? (
                <button className="book-btn" onClick={() => setShowModal(true)}>
                    Book Appointment
                </button>
            ) : (
                <p style={{ marginTop: '1rem', color: 'red' }}>
                    {hasAvailability ? 'Login as a user to book appointments' : 'No availability for booking'}
                </p>
            )}

            {/* ✅ Reviews + Dynamic Stars */}
            <h3 className="review-heading">
                Reviews {hasReviews ? filledStars + emptyStars : '☆☆☆☆☆'} &nbsp;
                {hasReviews ? avgRating.toFixed(1) : 'No ratings yet'}
            </h3>

            {/* ✅ Review List */}
            {hasReviews ? (
                <ReviewList reviews={lawyer.reviews} />
            ) : (
                <p style={{ marginTop: '0.5rem' }}>No reviews available.</p>
            )}

            <button className="back-btn" onClick={onBack}>← Back</button>

            {showModal && (
                <AppointmentModal
                    lawyer={lawyer}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default LawyerProfilePanel;
