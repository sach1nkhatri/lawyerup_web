import React, { useState } from 'react';
import UserReview from './UserReview';
import defaultAvatar from '../../../app/assets/avatar.png';
import '../css/UserBookingCard.css';
import { useUserBookingCard } from '../hooks/useUserBookingCard';
import ChatPopup from './ChatPopup';

const currentUser = JSON.parse(localStorage.getItem('lawyerup_user'));

const UserBookingCard = ({ booking, onCancel }) => {
    const [chatVisible, setChatVisible] = useState(false);

    const {
        showReview,
        setShowReview,
        lawyerProfile,
        lawyerUser,
        client,
        lawyerImg,
        handleCancel
    } = useUserBookingCard(booking, onCancel);

    if (!lawyerProfile || !lawyerUser) {
        return <div style={{ padding: '1rem' }}></div>;
    }

    // Status configuration
    const getStatusConfig = (status) => {
        const configs = {
            pending: { color: '#f59e0b', bg: '#fef3c7', icon: '⏳' },
            approved: { color: '#10b981', bg: '#d1fae5', icon: '✅' },
            completed: { color: '#3b82f6', bg: '#dbeafe', icon: '🏁' },
            cancelled: { color: '#ef4444', bg: '#fee2e2', icon: '❌' }
        };
        return configs[status?.toLowerCase()] || configs.pending;
    };

    const statusConfig = getStatusConfig(booking.status);

    // Format date and time
    const formatDateTime = (date, time) => {
        if (!date || !time) return '—';
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        return `${formattedDate} at ${time}`;
    };

    return (
        <div className="user-booking-card">
            {/* Header Section */}
            <div className="card-header">
                <div className="status-badge" style={{ 
                    backgroundColor: statusConfig.bg, 
                    color: statusConfig.color 
                }}>
                    <span className="status-icon">{statusConfig.icon}</span>
                    <span className="status-text">{booking.status?.toUpperCase()}</span>
                </div>
                <div className="booking-id">#{booking._id?.slice(-8)}</div>
            </div>

            {/* Lawyer Profile Section */}
            <div className="lawyer-profile-section">
                <div className="lawyer-avatar-container">
                    <img
                        src={lawyerImg}
                        alt={`${lawyerUser.fullName}`}
                        className="lawyer-avatar"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultAvatar;
                        }}
                    />
                    <div className="online-indicator"></div>
                </div>
                <div className="lawyer-info">
                    <h3 className="lawyer-name">{lawyerUser.fullName || 'Unknown Lawyer'}</h3>
                    <p className="lawyer-specialization">{lawyerProfile.specialization || 'General Practice'}</p>
                    <div className="lawyer-credentials">
                        <span className="credential-badge">
                            <span className="credential-icon">🎓</span>
                            {lawyerProfile.qualification || 'Qualified'}
                        </span>
                        <span className="credential-badge">
                            <span className="credential-icon">⭐</span>
                            {lawyerProfile.rating || '4.5'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="contact-section">
                <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <span className="contact-text">{lawyerUser.email || '—'}</span>
                </div>
                <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <span className="contact-text">{lawyerUser.contactNumber || '—'}</span>
                </div>
            </div>

            {/* Divider */}
            <div className="section-divider"></div>

            {/* Booking Details */}
            <div className="booking-details-section">
                <h4 className="section-title">Appointment Details</h4>
                <div className="details-grid">
                    <div className="detail-item">
                        <span className="detail-label">Date & Time</span>
                        <span className="detail-value">{formatDateTime(booking.date, booking.time)}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{booking.duration} hour(s)</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Mode</span>
                        <span className="detail-value mode-badge">
                            {booking.mode === 'online' ? '🌐 Online' : '🤝 In-Person'}
                        </span>
                    </div>
                    {booking.meetingLink && (
                        <div className="detail-item">
                            <span className="detail-label">Meeting Link</span>
                            <a 
                                href={booking.meetingLink} 
                                target="_blank" 
                                rel="noreferrer"
                                className="meeting-link"
                            >
                                Join Meeting
                            </a>
                        </div>
                    )}
                </div>
                
                {booking.description && (
                    <div className="description-section">
                        <span className="detail-label">Description</span>
                        <p className="description-text">{booking.description}</p>
                    </div>
                )}
            </div>

            {/* Client Information */}
            <div className="client-section">
                <h4 className="section-title">Your Information</h4>
                <div className="client-details">
                    <div className="client-item">
                        <span className="client-label">Name</span>
                        <span className="client-value">{client?.fullName || 'You'}</span>
                    </div>
                    <div className="client-item">
                        <span className="client-label">Email</span>
                        <span className="client-value">{client?.email}</span>
                    </div>
                    <div className="client-item">
                        <span className="client-label">Contact</span>
                        <span className="client-value">{client?.contactNumber || client?.phone || '—'}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
                {booking.status === 'pending' && (
                    <button className="action-btn cancel-btn" onClick={handleCancel}>
                        <span className="btn-icon">❌</span>
                        Cancel Booking
                    </button>
                )}

                {booking.status === 'completed' && !booking.reviewed && (
                    <button className="action-btn review-btn" onClick={() => setShowReview(true)}>
                        <span className="btn-icon">⭐</span>
                        Rate Lawyer
                    </button>
                )}

                {booking.status === 'approved' && (
                    <button className="action-btn chat-btn" onClick={() => setChatVisible(true)}>
                        <span className="btn-icon">💬</span>
                        Start Chat
                    </button>
                )}
            </div>

            {/* Chat Popup */}
            {booking.status === 'approved' && (
                <ChatPopup
                    bookingId={booking._id}
                    senderId={currentUser._id}
                    receiver={lawyerUser}
                    visible={chatVisible}
                    onClose={() => setChatVisible(false)}
                />
            )}

            {/* Review Modal */}
            {showReview && (
                <UserReview
                    bookingId={booking._id}
                    lawyerId={lawyerUser._id}
                    onClose={() => setShowReview(false)}
                />
            )}
        </div>
    );
};

export default UserBookingCard;
