import React, { useState } from 'react';
import LawyerScheduleBuilder from './LawyerScheduleBuilder';
import '../css/LawyerFinalListingPanel.css';
import defaultAvatar from '../../assets/avatar.png';

const LawyerFinalListingPanel = ({ lawyer, onReapply }) => {
    const [form, setForm] = useState({
        phone: lawyer.phone || '',
        state: lawyer.state || '',
        city: lawyer.city || '',
        address: lawyer.address || ''
    });

    const [editableSchedule, setEditableSchedule] = useState(lawyer.schedule || {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleScheduleChange = (newSchedule) => {
        setEditableSchedule(newSchedule);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/lawyers/${lawyer._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    schedule: editableSchedule,
                }),
            });

            if (res.ok) {
                alert('✅ Changes saved successfully!');
            } else {
                alert('❌ Failed to save changes.');
            }
        } catch (error) {
            console.error('Error updating listing:', error);
            alert('⚠️ Error occurred during update.');
        }
    };

    return (
        <div className="listing-panel">
            <h2>Your Listing</h2>
            <p>You can update your contact, address, and availability here.</p>

            <div className="listing-grid">
                <div className="listing-left">
                    <p><b>Full Name</b> <input value={lawyer.fullName} disabled /></p>
                    <p><b>Specialization</b> <input value={lawyer.specialization} disabled /></p>
                    <p><b>Email</b> <input value={lawyer.email} disabled /></p>
                    <p><b>Phone</b> <input name="phone" value={form.phone} onChange={handleInputChange} /></p>
                    <p><b>State</b> <input name="state" value={form.state} onChange={handleInputChange} /></p>
                    <p><b>City</b> <input name="city" value={form.city} onChange={handleInputChange} /></p>
                    <p><b>Address</b> <input name="address" value={form.address} onChange={handleInputChange} /></p>
                    <p><b>Qualification</b> <input value={lawyer.qualification} disabled /></p>

                    <LawyerScheduleBuilder
                        onScheduleChange={handleScheduleChange}
                        initialSchedule={editableSchedule}
                    />
                </div>

                <div className="listing-right">
                    <img
                        src={`http://localhost:5000/uploads/${lawyer.profilePhoto}`}
                        alt="profile"
                        onError={(e) => e.target.src = defaultAvatar}
                        className="listing-profile-pic"
                    />
                    <button>Change Photo</button>
                    <button onClick={onReapply}>Hold Profile</button>
                </div>
            </div>

            <div className="listing-actions">
                <button className="listing-save-btn" onClick={handleSave}>Save</button>
                <button className="listing-delete-btn">Delete</button>
            </div>
        </div>
    );
};

export default LawyerFinalListingPanel;
