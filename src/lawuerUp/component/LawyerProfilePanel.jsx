import React, { useState } from 'react';
import ReviewList from './ReviewList';
import AppointmentModal from '../../modals/AppointmentModal'; // ⬅️ import the modal
import '../css/LawyerUp.css';

const LawyerProfilePanel = ({ lawyer, onBack }) => {
    const [showModal, setShowModal] = useState(false); // ⬅️ state to toggle

    if (!lawyer) return <p>Lawyer not found.</p>;

    const hasAvailability = lawyer.schedule && Object.keys(lawyer.schedule).length > 0;
    const hasReviews = lawyer.reviews && lawyer.reviews.length > 0;

    return (
        <div className="profile-panel">
            <h3>Profile</h3>
            <p><strong>Name:</strong> {lawyer.fullName}</p>
            <p><strong>Speciality:</strong> {lawyer.specialization}</p>
            <p><strong>Qualification:</strong> {lawyer.qualification}</p>
            <p><strong>Address:</strong> {lawyer.address}</p>
            <p><strong>Contact:</strong> {lawyer.phone}</p>

            {hasAvailability ? (
                <button className="book-btn" onClick={() => setShowModal(true)}>
                    Book Appointment
                </button>
            ) : (
                <p style={{ marginTop: '1rem', color: 'red' }}>No availability for booking</p>
            )}

            <h3 className="review-heading">
                Reviews {lawyer.rating > 0
                ? '⭐'.repeat(lawyer.rating) + '☆'.repeat(5 - lawyer.rating)
                : '☆☆☆☆☆'} &nbsp; {lawyer.rating > 0 ? `${lawyer.rating}.0` : 'No ratings yet'}
            </h3>

            {hasReviews ? (
                <ReviewList reviews={lawyer.reviews} />
            ) : (
                <p style={{ marginTop: '0.5rem' }}>No reviews available.</p>
            )}

            <button className="back-btn" onClick={onBack}>← Back</button>

            {/* Render Modal Conditionally */}
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
