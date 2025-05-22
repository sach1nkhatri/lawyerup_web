import React, { useState } from 'react';
import UserReview from './UserReview';
import '../css/BookingCard.css';

const BookingCard = ({ booking }) => {
    const [showReview, setShowReview] = useState(false);

    const isUser = booking.role === 'user';
    const lawyer = booking.lawyer;
    const client = booking.client;

    return (
        <div className="booking-card">
            <div>
                {isUser ? (
                    <>
                        <h3>{lawyer.name}</h3>
                        <p><b>Specialization:</b> {lawyer.specialization}</p>
                        <p><b>Qualification:</b> {lawyer.qualification}</p>
                        <p><b>Email:</b> {lawyer.email}</p>
                        <p><b>Contact:</b> {lawyer.phone}</p>
                        <p><b>Address:</b> {lawyer.address}</p>
                    </>
                ) : (
                    <>
                        <h3>Booking Info</h3>
                        <p><b>Client Name:</b> {client.name}</p>
                        <p><b>Contact:</b> {client.phone}</p>
                        <p><b>Email:</b> {client.email}</p>
                    </>
                )}
                <p><b>Date:</b> {booking.date}</p>
                <p><b>Time:</b> {booking.time}</p>
                <p><b>Status:</b> {booking.status}</p>
                {booking.meetingLink && <p><b>Meeting Link:</b> <a href={booking.meetingLink}>Open</a></p>}
            </div>

            <div className="button-row">
                {isUser ? (
                    <>
                        <button className="cancel-btn">Cancel Booking</button>
                        {booking.status === 'completed' && !booking.reviewed && (
                            <button className="review-btn" onClick={() => setShowReview(true)}>Rate Lawyer</button>
                        )}
                    </>
                ) : (
                    <>
                        <button className="shift-btn">Shift Date/Time</button>
                        <button className="approve-btn">Approve Booking</button>
                        <button className="complete-btn">Mark Completed</button>
                    </>
                )}
            </div>

            {showReview && <UserReview bookingId={booking._id} onClose={() => setShowReview(false)} />}
        </div>
    );
};

export default BookingCard;
