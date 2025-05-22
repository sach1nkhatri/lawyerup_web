import React, { useState } from 'react';
import LawyerScheduleBuilder from './LawyerScheduleBuilder';
import '../css/LawyerFinalListingPanel.css';
import defaultAvatar from '../../assets/avatar.png';
import { toast } from 'react-toastify';
import { startLoader, stopLoader } from '../utils/loader';

const LawyerFinalListingPanel = ({ lawyer, onReapply, onBack, onHold }) => {
    const [form, setForm] = useState({
        phone: lawyer.phone || '',
        state: lawyer.state || '',
        city: lawyer.city || '',
        address: lawyer.address || ''
    });

    const [editableSchedule, setEditableSchedule] = useState(lawyer.schedule || {});
    const [profilePhoto, setProfilePhoto] = useState(lawyer.profilePhoto || '');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleScheduleChange = (newSchedule) => {
        setEditableSchedule(newSchedule);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                startLoader();
                const res = await fetch(`http://localhost:5000/api/lawyers/${lawyer._id}/photo`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ photo: reader.result }),
                });
                if (!res.ok) throw new Error();
                toast.success('✅ Profile photo updated!');
                setProfilePhoto(reader.result);
            } catch {
                toast.error('❌ Failed to update photo');
            } finally {
                stopLoader();
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        try {
            startLoader();
            const res = await fetch(`http://localhost:5000/api/lawyers/${lawyer._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, schedule: editableSchedule }),
            });

            if (res.ok) {
                toast.success('✅ Changes saved successfully!');
            } else {
                toast.error('❌ Failed to save changes.');
            }
        } catch (error) {
            console.error('Error updating listing:', error);
            toast.error('⚠️ Error occurred during update.');
        } finally {
            stopLoader();
        }
    };

    const handleHold = async () => {
        try {
            startLoader();
            const res = await fetch(`http://localhost:5000/api/lawyers/${lawyer._id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'hold' }),
            });

            if (res.ok) {
                toast.info('⚪ Profile put on hold');
                onHold(); // ✅ go back to status, not join form
            } else {
                toast.error('❌ Failed to hold profile');
            }
        } catch {
            toast.error('⚠️ Network error');
        } finally {
            stopLoader();
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('⚠️ Are you sure you want to delete your profile?');
        if (!confirmed) return;

        try {
            startLoader();
            const res = await fetch(`http://localhost:5000/api/lawyers/${lawyer._id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.warn('🗑️ Profile deleted');
                onReapply(); // Clear view
            } else {
                toast.error('❌ Failed to delete profile');
            }
        } catch {
            toast.error('⚠️ Network error while deleting');
        } finally {
            stopLoader();
        }
    };

    return (
        <div className="listing-panel">
            <h2>Your Listing</h2>
            <p>You can update your contact, address, and availability here.</p>

            {onBack && (
                <button className="back-button" onClick={onBack}>
                    ← Back to Status
                </button>
            )}

            <div className="listing-grid">
                <div className="listing-left">
                    <p><b>Full Name</b> <input value={lawyer.fullName} disabled /></p>
                    <p><b>Specialization</b> <input value={lawyer.specialization} disabled /></p>
                    <p><b>Email</b> <input value={lawyer.email} disabled /></p>
                    <p><b>Phone</b> <input name="phone" value={form.phone} onChange={handleInputChange} /></p>
                    <p><b>State</b> <input name="state" value={form.state} onChange={handleInputChange} /></p>
                    <p><b>City</b> <input name="city" value={form.city} onChange={handleInputChange} /></p>
                    <p><b>Address</b> <input name="address" value={form.address} onChange={handleInputChange} /></p>
                    <p><b>Qualification</b> <input name="qualification" value={form.qualification} onChange={handleInputChange} /></p>

                    <LawyerScheduleBuilder
                        onScheduleChange={handleScheduleChange}
                        initialSchedule={editableSchedule}
                    />
                </div>

                <div className="listing-right">
                    <img
                        src={profilePhoto || defaultAvatar}
                        alt="profile"
                        onError={(e) => e.target.src = defaultAvatar}
                        className="listing-profile-pic"
                    />
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <button onClick={handleHold}>Hold Profile</button>
                </div>
            </div>

            <div className="listing-actions">
                <button className="listing-save-btn" onClick={handleSave}>Save</button>
                <button className="listing-delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default LawyerFinalListingPanel;
