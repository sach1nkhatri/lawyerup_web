import React, { useState } from 'react';
import LawyerScheduleBuilder from './LawyerScheduleBuilder';
import '../css/LawyerFinalListingPanel.css';
import defaultAvatar from '../../assets/avatar.png';
import Swal from 'sweetalert2';

import { startLoader, stopLoader } from '../utils/loader';
import { notify } from '../../utils/notify'; // ✅ your custom alert with sound

const LawyerFinalListingPanel = ({ lawyer, onReapply, onBack, onHold }) => {
    const [form, setForm] = useState({
        phone: lawyer.phone || '',
        state: lawyer.state || '',
        city: lawyer.city || '',
        address: lawyer.address || '',
        qualification: lawyer.qualification || ''
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
                const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers/${lawyer._id}/photo`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ photo: reader.result }),
                });

                if (!res.ok) throw new Error();
                notify('success', 'Profile photo updated!');
                setProfilePhoto(reader.result);
            } catch {
                notify('error', 'Failed to update photo');
            } finally {
                stopLoader();
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        const result = await Swal.fire({
            title: 'Save Changes?',
            text: 'Do you want to save your profile updates?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Save',
        });

        if (!result.isConfirmed) return;

        try {
            startLoader();
            const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers/${lawyer._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, schedule: editableSchedule }),
            });


            if (res.ok) {
                notify('success', 'Changes saved successfully!');
            } else {
                notify('error', 'Failed to save changes.');
            }
        } catch {
            notify('error', 'Error occurred during update.');
        } finally {
            stopLoader();
        }
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Delete Profile?',
            text: 'This will permanently delete your profile.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (!result.isConfirmed) return;

        try {
            startLoader();
            const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers/${lawyer._id}`, {
                method: 'DELETE',
            });


            if (res.ok) {
                notify('warn', 'Profile deleted');
                onReapply();
            } else {
                notify('error', 'Failed to delete profile');
            }
        } catch {
            notify('error', 'Network error while deleting');
        } finally {
            stopLoader();
        }
    };

    const handleHold = async () => {
        try {
            startLoader();
            const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers/${lawyer._id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'hold' }),
            });

            if (res.ok) {
                notify('warn', 'Profile put on hold');
                onHold();
            } else {
                notify('error', 'Failed to hold profile');
            }
        } catch {
            notify('error', 'Network error');
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
