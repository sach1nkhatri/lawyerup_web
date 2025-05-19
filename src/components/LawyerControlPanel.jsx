import React, { useEffect, useState } from 'react';
import '../css/JoinAsLawyerFrom.css'; // reuse styles
import { toast } from 'react-toastify';

const LawyerControlPanel = () => {
    const [lawyer, setLawyer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({});

    // Simulated ID (you'd get this from context, token, or URL param)
    const lawyerId = 'yourLawyerIdHere';

    useEffect(() => {
        fetchLawyerData();
    }, []);

    const fetchLawyerData = async () => {
        const res = await fetch(`http://localhost:5000/api/lawyers/${lawyerId}`);
        const data = await res.json();
        setLawyer(data);
        setForm(data); // For editing
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const res = await fetch(`http://localhost:5000/api/lawyers/${lawyerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            toast.success('Successfully Updated!');
            setEditMode(false);
            fetchLawyerData(); // refresh
        } else {
            toast.error('Failed to update');
        }
    };

    const handleHold = async () => {
        const res = await fetch(`http://localhost:5000/api/lawyers/${lawyerId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'hold' }),
        });
        if (res.ok) {
            toast.info('Profile set to HOLD');
            fetchLawyerData();
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete your profile?');
        if (!confirmed) return;

        const res = await fetch(`http://localhost:5000/api/lawyers/${lawyerId}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            toast.warn('Profile deleted');
            setLawyer(null); // or redirect
        }
    };

    if (!lawyer) return <p>Loading...</p>;

    return (
        <div className="join-lawyer-container">
            <h2>Lawyer Profile</h2>
            <p>View and manage your profile information</p>

            <form className="lawyer-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-grid">
                    <input name="fullName" disabled={!editMode} value={form.fullName || ''} onChange={handleChange} />
                    <input name="specialization" disabled={!editMode} value={form.specialization || ''} onChange={handleChange} />
                    <input name="email" type="email" disabled={!editMode} value={form.email || ''} onChange={handleChange} />
                    <input name="phone" disabled={!editMode} value={form.phone || ''} onChange={handleChange} />
                    <input name="state" disabled={!editMode} value={form.state || ''} onChange={handleChange} />
                    <input name="city" disabled={!editMode} value={form.city || ''} onChange={handleChange} />
                    <input name="address" disabled={!editMode} value={form.address || ''} onChange={handleChange} />
                    <input name="qualification" disabled={!editMode} value={form.qualification || ''} onChange={handleChange} />
                </div>

                {/* Profile Image */}
                <div className="profile-photo-preview">
                    <img
                        src={`http://localhost:5000/uploads/${lawyer.profilePhoto}`}
                        alt="Profile"
                        style={{ width: 100, height: 100, borderRadius: '50%' }}
                    />
                </div>

                {/* Schedule Info */}
                <p><strong>Available Days:</strong> {Object.keys(lawyer.schedule || {}).join(', ')}</p>
                <p><strong>Time Slots:</strong> {Object.values(lawyer.schedule || {}).flat().map(slot => `${slot.start} - ${slot.end}`).join(', ')}</p>

                {/* File Viewer */}
                <p><strong>License File:</strong> <a href={`http://localhost:5000/uploads/${lawyer.licenseFile}`} target="_blank" rel="noopener noreferrer">View License</a></p>

                {/* Action Buttons */}
                <div className="button-row">
                    {editMode ? (
                        <button className="submit-btn" onClick={handleSave}>Save</button>
                    ) : (
                        <button className="submit-btn" onClick={() => setEditMode(true)}>Update</button>
                    )}
                    <button className="submit-btn" onClick={handleHold}>Hold Profile</button>
                    <button className="submit-btn" onClick={handleDelete} style={{ backgroundColor: 'tomato' }}>Delete</button>
                </div>
            </form>
        </div>
    );
};

export default LawyerControlPanel;
