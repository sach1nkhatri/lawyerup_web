import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import UserBookingCard from './UserBookingCard';
import LawyerBookingCard from './LawyerBookingCard';
import '../css/BookingPage.css';
import '../css/UserBookingCard.css';
import '../css/LawyerBookingCard.css';

const BookingPage = () => {
    const user = useMemo(() => {
        return JSON.parse(localStorage.getItem('lawyerup_user'));
    }, []);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || (user.role !== 'user' && user.role !== 'lawyer')) return;

        const fetchBookings = async () => {
            try {
                const endpoint =
                    user.role === 'lawyer'
                        ? `http://localhost:5000/api/bookings/lawyer/${user._id}`
                        : `http://localhost:5000/api/bookings/user/${user._id}`;
                const res = await axios.get(endpoint);
                setBookings(res.data);
                console.log("Full bookings from server:", res.data); // DEBUG
            } catch (err) {
                console.error('Failed to fetch bookings:', err);
            } finally {
                setTimeout(() => setLoading(false), 150);
            }
        };

        fetchBookings();
    }, [user]);

    const filtered = bookings.filter((b) => {
        const status = b.status?.toLowerCase().trim();
        if (activeTab === 'pending') return status === 'pending';
        return ['approved', 'completed', 'cancelled'].includes(status);
    });

    const handleCancel = (id) => {
        setBookings(prev => prev.filter(b => b._id !== id));
    };

    return (
        <div className="booking-page">
            <h2>{user?.role === 'lawyer' ? 'Client Bookings' : 'My Bookings'}</h2>

            <div className="booking-tabs">
                <button
                    className={activeTab === 'pending' ? 'active' : ''}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending
                </button>
                <button
                    className={activeTab === 'history' ? 'active' : ''}
                    onClick={() => setActiveTab('history')}
                >
                    History
                </button>
            </div>

            {loading ? (
                <div className="loader-spinner" />
            ) : (
                <div className="booking-list">
                    {filtered.length === 0 ? (
                        <p style={{ textAlign: 'center', marginTop: '2rem' }}>No bookings found.</p>
                    ) : (
                        filtered.map((booking) =>
                            user.role === 'lawyer' ? (
                                <LawyerBookingCard
                                    key={booking._id}
                                    booking={booking}
                                    onStatusChange={() => {
                                        // Optional: refresh just this one
                                        setBookings(prev =>
                                            prev.map((b) =>
                                                b._id === booking._id ? { ...b, status: 'updated' } : b
                                            )
                                        );
                                    }}
                                />
                            ) : (
                                <UserBookingCard
                                    key={booking._id}
                                    booking={booking}
                                    onCancel={() => handleCancel(booking._id)}
                                />
                            )
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default BookingPage;
