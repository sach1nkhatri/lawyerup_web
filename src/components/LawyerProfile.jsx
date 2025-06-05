// src/components/LawyerProfile.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import dummyLawyers from '../data/lawyer';
import AppointmentModal from '../modals/AppointmentModal';
import '../css/LawyerUp.css';

const LawyerProfile = () => {
    const { id } = useParams();
    const lawyer = dummyLawyers.find((l) => l.id === parseInt(id));
    const [openModal, setOpenModal] = useState(false);

    if (!lawyer) return <div>Lawyer not found</div>;

    return (
        <div className="profile-container">
            <div className="lawyer-card profile-view">
                <img src={lawyer.image} alt={lawyer.name} className="lawyer-image" />
                <h3>{lawyer.name}</h3>
                <p>{lawyer.specialization}</p>
                <p>Education: {lawyer.education}</p>
                <p>Contact: {lawyer.contact}</p>
                <p>Charge: Rs. {lawyer.charge}</p>
                <div className="stars">
                    {'★'.repeat(lawyer.rating)}{'☆'.repeat(5 - lawyer.rating)}
                </div>
                <button onClick={() => setOpenModal(true)}>Book Appointment</button>
            </div>

            {openModal && (
                <AppointmentModal lawyer={lawyer} onClose={() => setOpenModal(false)} />
            )}
        </div>
    );
};

export default LawyerProfile;
