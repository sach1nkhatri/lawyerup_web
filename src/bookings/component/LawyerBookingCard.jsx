import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/LawyerBookingCard.css';
import { notify } from '../../utils/notify';

const LawyerBookingCard = ({ booking, onStatusChange }) => {
    const user = booking.user;
    const [link, setLink] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setLink(booking.meetingLink || '');
    }, [booking.meetingLink]);

    const confirmAndUpdateStatus = async (newStatus, label) => {
        const result = await Swal.fire({
            title: `Confirm ${label}?`,
            text: `Are you sure you want to mark this booking as "${label}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: `Yes, ${label}`,
        });

        if (result.isConfirmed) {
            try {
                await axios.patch(`${process.env.REACT_APP_API_URL}bookings/${booking._id}/status`, {
                    status: newStatus,
                });
                notify('success', `Status updated to "${newStatus}"`);
                if (onStatusChange) onStatusChange();
            } catch (error) {
                console.error('Failed to update status:', error);
                notify('error', '❌ Failed to update booking status');
            }
        }
    };

    const confirmAndUpdateLink = async () => {
        if (!link.trim()) {
            notify('error', 'Please add a meeting link before updating.');
            return;
        }

        const result = await Swal.fire({
            title: 'Update Meeting Link?',
            text: 'Are you sure you want to update the meeting link for this booking?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Update',
        });

        if (!result.isConfirmed) return;

        try {
            setIsUpdating(true);
            await axios.patch(`${process.env.REACT_APP_API_URL}bookings/${booking._id}/meeting-link`, {
                meetingLink: link,
            });
            notify('success', 'Meeting link updated!');
        } catch (error) {
            console.error('Failed to update meeting link:', error);
            notify('error', 'Failed to update meeting link');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="user-booking-card">
            <div className="info-section">
                <h2>{user?.fullName || "Unknown"}</h2>
                <p><b>Email:</b> {user?.email}</p>
                <p><b>Contact:</b> {user?.contactNumber || user?.phone}</p>
            </div>

            <hr style={{ margin: '1rem 0', borderTop: '1px dashed #ccc' }} />

            <div className="booking-info">
                <h3>Booking Info</h3>
                <div className="booking-columns">
                    <div>
                        <p><b>Date:</b> {booking.date}</p>
                        <p><b>Time:</b> {booking.time}</p>
                        <p><b>Status:</b> {booking.status}</p>
                        <p><b>Type:</b> {booking.mode}</p>
                        {booking.description && (
                            <p><b>Description:</b> {booking.description}</p>
                        )}
                    </div>
                    <div>
                        <label><b>Meeting Link:</b></label>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            style={{ width: '100%' }}
                        />
                        <button className="update-btn" onClick={confirmAndUpdateLink} disabled={isUpdating}>
                            {isUpdating ? 'Updating...' : 'Update Link'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="card-actions">
                {booking.status === 'pending' && (
                    <button className="approve-btn" onClick={() => confirmAndUpdateStatus('approved', 'approve')}>
                        Approve
                    </button>
                )}
                {booking.status === 'approved' && (
                    <button className="complete-btn" onClick={() => confirmAndUpdateStatus('completed', 'complete')}>
                        Mark Completed
                    </button>
                )}
            </div>
        </div>
    );
};

export default LawyerBookingCard;
