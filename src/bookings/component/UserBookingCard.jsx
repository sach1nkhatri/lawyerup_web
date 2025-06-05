import React, { useState } from 'react';
import UserReview from './UserReview';
import defaultAvatar from '../../assets/avatar.png';
import '../css/UserBookingCard.css';
import {notify} from "../../utils/notify";
import axios from "axios";
import Swal from 'sweetalert2';

const UserBookingCard = ({ booking, onCancel }) => {
    const [showReview, setShowReview] = useState(false);

    const lawyerProfile = booking.lawyerList;   // 👈 Public listing info (photo, specialization)
    const lawyerUser = booking.lawyer;          // 👈 Actual user (fullName, email, phone)
    const client = booking.user;

    if (!lawyerProfile || !lawyerUser) {
        return <div style={{ padding: '1rem' }}></div>;
    }

    const lawyerImg = lawyerProfile.profilePhoto?.startsWith('data:image')
        ? lawyerProfile.profilePhoto
        : `${process.env.REACT_APP_UPLOADS_URL}${lawyerProfile.profilePhoto || 'avatar.png'}`;


    const handleCancel = async () => {
        const result = await Swal.fire({
            title: 'Cancel Booking?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e24c4c',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}bookings/${booking._id}`);
                notify('success', 'Booking cancelled.');
                onCancel?.(booking._id);
            } catch (err) {
                console.error('Cancel error:', err);
                notify('error', '❌ Failed to cancel booking.');
            }
        }
    };

    return (
        <div className="user-booking-card">
            <div className="top-section">
                <div className="avatar-section">
                    <img
                        src={lawyerImg}
                        alt="Lawyer"
                        className="lawyer-avatar"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultAvatar;
                        }}
                    />
                </div>
                <div className="info-section">
                    <h2>{lawyerUser.fullName || 'Unknown Lawyer'}</h2>
                    <p><b>Specialization:</b> {lawyerProfile.specialization || '—'}</p>
                    <p><b>Qualification:</b> {lawyerProfile.qualification || '—'}</p>
                    <p><b>Email:</b> {lawyerUser.email || '—'}</p>
                    <p><b>Phone:</b> {lawyerUser.contactNumber || '—'}</p>
                </div>
            </div>

            <hr style={{ margin: '1rem 0', borderTop: '1px dashed #ccc' }} />

            <div className="booking-info">
                <h3>Booking Info</h3>
                <div className="booking-columns">
                    <div>
                        <p><b>Date:</b> {booking.date}</p>
                        <p><b>Time:</b> {booking.time}</p>
                        <p><b>Duration:</b> {booking.duration} hour(s)</p>
                        <p><b>Status:</b> {booking.status}</p>
                        <p><b>Mode:</b> {booking.mode}</p>
                        <p><b>Description:</b> {booking.description || '—'}</p>
                    </div>
                    <div>
                        <p><b>Meeting Link:</b> {booking.meetingLink
                            ? <a href={booking.meetingLink} target="_blank" rel="noreferrer">Join</a>
                            : '—'}</p>
                        <p><b>Your Name:</b> {client?.fullName || 'You'}</p>
                        <p><b>Your Email:</b> {client?.email}</p>
                        <p><b>Your Contact:</b> {client?.contactNumber || client?.phone}</p>
                    </div>
                </div>
            </div>

            <div className="card-actions">
                {booking.status === 'pending' && (
                    <button className="cancel-btn" onClick={handleCancel}>
                        Cancel Booking
                    </button>
                )}

                {booking.status === 'completed' && !booking.reviewed && (
                    <button className="review-btn" onClick={() => setShowReview(true)}>
                        Rate Lawyer
                    </button>
                )}
            </div>

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
