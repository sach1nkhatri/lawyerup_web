import React, { useState } from 'react';
import ReviewList from './ReviewList';
import AppointmentModal from '../../modals/AppointmentModal';
import '../css/LawyerUp.css';
import { FaGraduationCap, FaFolderOpen } from 'react-icons/fa';

const LawyerProfilePanel = ({ lawyer, onBack }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); // profile | info | work

    const currentUser = JSON.parse(localStorage.getItem('lawyerup_user'));
    const isUser = currentUser?.role === 'user';

    if (!lawyer) return <p>Lawyer not found.</p>;

    const hasAvailability = lawyer.schedule && Object.keys(lawyer.schedule).length > 0;
    const hasReviews = lawyer.reviews && lawyer.reviews.length > 0;

    const totalRatings = hasReviews ? lawyer.reviews.reduce((sum, r) => sum + r.rating, 0) : 0;
    const avgRating = hasReviews ? totalRatings / lawyer.reviews.length : 0;
    const rounded = Math.round(avgRating);
    const filledStars = '⭐'.repeat(rounded);
    const emptyStars = '☆'.repeat(5 - rounded);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <>
                        <p><strong>Name:</strong> {lawyer.fullName}</p>
                        <p><strong>Speciality:</strong> {lawyer.specialization}</p>
                        <p><strong>Address:</strong> {lawyer.address}</p>
                        <p><strong>Contact:</strong> {lawyer.phone}</p>
                    </>
                );

            case 'info':
                return (
                    <>
                        <div className="box-section">
                            <p className="box-title">Description</p>
                            <p className="box-text">{lawyer.description || 'N/A'}</p>
                        </div>
                        <div className="box-section">
                            <p className="box-title">Special Case</p>
                            <p className="box-text">{lawyer.specialCase || 'N/A'}</p>
                        </div>
                        <div className="box-section">
                            <p className="box-title">Social Link</p>
                            {lawyer.socialLink ? (
                                <a
                                    href={lawyer.socialLink.startsWith('http') ? lawyer.socialLink : `https://${lawyer.socialLink}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                >
                                    {lawyer.socialLink}
                                </a>
                            ) : (
                                <p className="box-text">N/A</p>
                            )}
                        </div>
                    </>
                );

            case 'work':
                return (
                    <>
                        <div className="box-section">
                            <p className="box-title">Education</p>
                            <ul>
                                {lawyer.education?.length ? lawyer.education.map((e, i) => (
                                    <li key={i}>
                                        <FaGraduationCap /> {e.degree} - {e.institution}, {e.year} ({e.specialization})
                                    </li>
                                )) : <li>No education records.</li>}
                            </ul>
                        </div>
                        <div className="box-section">
                            <p className="box-title">Work Experience</p>
                            <ul>
                                {lawyer.workExperience?.length ? lawyer.workExperience.map((w, i) => (
                                    <li key={i}>
                                        <FaFolderOpen /> {w.court} ({w.from} to {w.to})
                                    </li>
                                )) : <li>No work experience listed.</li>}
                            </ul>
                        </div>
                    </>
                );


            default:
                return null;
        }
    };



    return (
        <div className="profile-panel">
            <h3>LawyerUp</h3>
            <div className="tab-menu">
                {['profile', 'info', 'work'].map((t) => (
                    <button
                        key={t}
                        onClick={() => setActiveTab(t)}
                        className={activeTab === t ? 'active-tab' : ''}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            <div className="tab-content">{renderTabContent()}</div>

            {hasAvailability && isUser ? (
                <button className="book-btn" onClick={() => setShowModal(true)}>Book Appointment</button>
            ) : (
                <p style={{ marginTop: '1rem', color: 'red' }}>
                    {hasAvailability ? 'Login as a user to book appointments' : 'No availability for booking'}
                </p>
            )}

            <h3 className="review-heading">
                Reviews {hasReviews ? filledStars + emptyStars : '☆☆☆☆☆'} &nbsp;
                {hasReviews ? avgRating.toFixed(1) : 'No ratings yet'}
            </h3>

            {hasReviews ? <ReviewList reviews={lawyer.reviews} /> : <p>No reviews available.</p>}
            <button className="back-btn" onClick={onBack}>← Back</button>

            {showModal && (
                <AppointmentModal lawyer={lawyer} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default LawyerProfilePanel;
