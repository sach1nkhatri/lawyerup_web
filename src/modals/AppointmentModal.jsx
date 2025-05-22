import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/AppointmentModal.css';

const AppointmentModal = ({ lawyer, onClose }) => {
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [duration, setDuration] = useState(1);
    const [appointmentType, setAppointmentType] = useState('online');
    const [description, setDescription] = useState('');

    const user = JSON.parse(localStorage.getItem('lawyerup_user'));

    // Generate next 14 bookable days
    useEffect(() => {
        const validDates = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

            if (lawyer.schedule[weekday] && lawyer.schedule[weekday].length > 0) {
                validDates.push(date.toISOString().split('T')[0]);
            }
        }

        setAvailableDates(validDates);
    }, [lawyer.schedule]);

    // Fetch time slots when date or duration changes
    useEffect(() => {
        const fetchSlots = async () => {
            if (!selectedDate || !duration) return;

            try {
                const res = await axios.get(`http://localhost:5000/api/bookings/slots`, {
                    params: {
                        lawyerId: lawyer._id,
                        date: selectedDate,
                        duration
                    }
                });
                setTimeSlots(res.data);
            } catch (err) {
                console.error("Failed to load slots:", err);
                setTimeSlots([]);
            }
        };

        fetchSlots();
    }, [selectedDate, duration, lawyer._id]);

    const handleConfirm = async () => {
        const clientId = user?._id;
        const lawyerUserId = lawyer.user?._id || lawyer.user;  // ✅ must be User ID
        const lawyerListId = lawyer._id;                       // ✅ public listing ID

        if (!clientId || !lawyerUserId || !lawyerListId || !selectedDate || !selectedTime) {
            alert("Please fill in all fields.");
            return;
        }


        const bookingData = {
            user: clientId,
            lawyer: lawyer.user?._id || lawyer.user || lawyer._id,
            lawyerList: lawyerListId,
            date: selectedDate,
            time: selectedTime,
            duration,
            mode: appointmentType,
            description,
            status: 'pending',
            reviewed: false
        };

        try {
            await axios.post('http://localhost:5000/api/bookings', bookingData);
            alert("Appointment booked successfully!");
            onClose();
        } catch (err) {
            console.error("Booking failed:", err);
            alert("Failed to book appointment.");
        }
    };


    return (
        <div className="appointment-overlay">
            <div className="glass appointment-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 style={{ textAlign: 'center' }}>Book Appointment</h2>

                <label>Select Date</label>
                <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                    <option value="">-- Select --</option>
                    {availableDates.map((d, i) => (
                        <option key={i} value={d}>{d}</option>
                    ))}
                </select>

                <label>Available Time Slots</label>
                <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                    <option value="">-- Select --</option>
                    {timeSlots.map((slot, i) => (
                        <option key={i} value={slot}>{slot}</option>
                    ))}
                </select>

                <label>Duration (hrs)</label>
                <input
                    type="number"
                    min={1}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                />

                <label>Appointment Type</label>
                <div className="appt-type-toggle">
                    <button
                        className={appointmentType === 'online' ? 'active' : ''}
                        onClick={() => setAppointmentType('online')}
                    >Online</button>
                    <button
                        className={appointmentType === 'live' ? 'active' : ''}
                        onClick={() => setAppointmentType('live')}
                    >Live</button>
                </div>

                <label>Description</label>
                <textarea
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is the appointment for?"
                    style={{ width: '100%', borderRadius: '10px', padding: '0.5rem' }}
                />

                <div className="confirm-section">
                    <button className="confirm-btn" onClick={handleConfirm}>
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
