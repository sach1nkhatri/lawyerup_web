import React, { useState } from 'react';
import '../css/AppointmentModal.css';

const AppointmentModal = ({ lawyer, onClose }) => {
    const [appointmentType, setAppointmentType] = useState('online');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [duration, setDuration] = useState(1); // in hours

    const handleConfirm = () => {
        alert(`Appointment confirmed with ${lawyer.name} on ${selectedDate} at ${selectedTime} for ${duration} hour(s) (${appointmentType})\nTotal Cost: Rs. ${lawyer.charge * duration}`);
        onClose();
    };

    return (
        <div className="appointment-overlay">
            <div className="appointment-modal glass">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Book Appointment</h2>
                <p><strong>Lawyer:</strong> {lawyer.name}</p>
                <p><strong>Specialization:</strong> {lawyer.specialization}</p>
                <p><strong>Charge per Hour:</strong> Rs. {lawyer.charge}</p>

                <label>Date:
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </label>

                <label>Time:
                    <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    />
                </label>

                <label>Duration (Hours):
                    <input
                        type="number"
                        min="1"
                        max="8"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                    />
                </label>

                <label>Appointment Type:</label>
                <div className="appt-type-toggle">
                    <button
                        className={appointmentType === 'online' ? 'active' : ''}
                        onClick={() => setAppointmentType('online')}
                    >
                        Online
                    </button>
                    <button
                        className={appointmentType === 'live' ? 'active' : ''}
                        onClick={() => setAppointmentType('live')}
                    >
                        Live
                    </button>
                </div>

                <div className="confirm-section">
                    <p><strong>Total Cost:</strong> Rs. {lawyer.charge * duration}</p>
                    <button className="confirm-btn" onClick={handleConfirm}>Confirm Booking</button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
