import React from 'react';
import ReviewList from './ReviewList';
import '../css/LawyerUp.css';

const LawyerProfilePanel = ({ lawyer, onBack }) => {
    if (!lawyer) {
        return <p>Lawyer not found.</p>;
    }
    return (
        <div className="profile-panel">
            <h3>Profile</h3>
            <p><strong>Name:</strong> {lawyer.name}</p>
            <p><strong>Speciality:</strong> {lawyer.specialization}</p>
            <p><strong>Qualification:</strong> {lawyer.qualification}</p>
            <p><strong>Address:</strong> {lawyer.address}</p>
            <p><strong>Contact:</strong> {lawyer.contact}</p>
            <button className="book-btn">Book Appointment</button>

            <h3 className="review-heading">
                Reviews {'⭐'.repeat(lawyer.rating)}{'☆'.repeat(5 - lawyer.rating)} &nbsp; {lawyer.rating}.0
            </h3>
            <ReviewList reviews={lawyer.reviews} />

            <button className="back-btn" onClick={onBack}>← Back</button>
        </div>
    );
};
export default LawyerProfilePanel;
