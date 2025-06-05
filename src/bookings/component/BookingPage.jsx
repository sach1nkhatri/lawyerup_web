import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import UserBookingCard from './UserBookingCard';
import LawyerBookingCard from './LawyerBookingCard';
import '../css/BookingPage.css';
import '../css/UserBookingCard.css';
import '../css/LawyerBookingCard.css';

const BookingPage = () => {
    const user = useMemo(() => JSON.parse(localStorage.getItem('lawyerup_user')), []);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || (user.role !== 'user' && user.role !== 'lawyer')) return;

        const fetchBookings = async () => {
            try {
                const endpoint =
                    user.role === 'lawyer'
                    ? `${process.env.REACT_APP_API_URL}bookings/lawyer/${user._id}`
                    : `${process.env.REACT_APP_API_URL}bookings/user/${user._id}`;

                const res = await axios.get(endpoint);
                setBookings(res.data);
                console.log("Full bookings from server:", res.data);
            } catch (err) {
                console.error('Failed to fetch bookings:', err);
            } finally {
                setTimeout(() => setLoading(false), 150);
            }
        };

        fetchBookings();
    }, [user]);

    useEffect(() => {
        if (loading) return;

        const hasPending = bookings.some(b => b.status?.toLowerCase() === 'pending');
        const hasAccepted = bookings.some(b => b.status?.toLowerCase() === 'approved');
        const hasHistory = bookings.some(b =>
            ['completed', 'cancelled'].includes(b.status?.toLowerCase())
        );

        if (hasPending) setActiveTab('pending');
        else if (hasAccepted) setActiveTab('accepted');
        else if (hasHistory) setActiveTab('history');
        else setActiveTab('pending');
    }, [loading, bookings]);

    const filterBookings = (status) => {
        const filtered = bookings.filter(b => {
            const s = b.status?.toLowerCase().trim();
            if (status === 'pending') return s === 'pending';
            if (status === 'accepted') return s === 'approved';
            if (status === 'history') return ['completed', 'cancelled'].includes(s);
            return false;
        });

        // Sort by newest (most recent createdAt first)
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };


    const filtered = filterBookings(activeTab);

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
                    className={activeTab === 'accepted' ? 'active' : ''}
                    onClick={() => setActiveTab('accepted')}
                >
                    Accepted
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
                        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                            No bookings found in {activeTab} tab.
                        </p>
                    ) : (
                        filtered.map((booking) =>
                            user.role === 'lawyer' ? (
                                <LawyerBookingCard
                                    key={booking._id}
                                    booking={booking}
                                    onStatusChange={() => {
                                        setBookings(prev =>
                                            prev.map((b) =>
                                                b._id === booking._id ? { ...b, status: 'approved' } : b
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
