import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LawyerScheduleBuilder from './LawyerScheduleBuilder';
import LawyerStatusPanel from './LawyerStatusPanel';
import '../css/JoinAsLawyerForm.css';
import '../css/LawyerStatusPanel.module.css'; // ✅ apply design

const JoinAsLawyerForm = () => {
    const [loading, setLoading] = useState(true);
    const [lawyer, setLawyer] = useState(null);
    const [form, setForm] = useState({
        fullName: '',
        specialization: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        address: '',
        qualification: '',
        profilePhoto: null,
        licenseFile: null,
    });
    const [schedule, setSchedule] = useState({});

    const loadProfile = async () => {
        const token = localStorage.getItem('token');
        console.log('🧪 Token in localStorage (loadProfile):', token);
        if (!token) return setLoading(false);
        try {
            const res = await fetch('http://localhost:5000/api/lawyers/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setLawyer(data);
            }
        } catch (err) {
            console.warn('No existing lawyer profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, key) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setForm(prev => ({ ...prev, [key]: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('lawyerup_token'); // ✅
            console.log('🧪 Token in localStorage (handleSubmit):', token); // ✅ Add here
            const payload = { ...form, schedule };

            const res = await fetch('http://localhost:5000/api/lawyers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to submit');
            const data = await res.json();
            toast.success('Application submitted!');
            setLawyer(data); // ✅ switch to status view
        } catch (err) {
            toast.error('Failed to submit application');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p style={{ padding: '2rem' }}>Loading…</p>;
    }

    if (lawyer) {
        return (
            <div className="status-page-container">
                <h2>Application Status</h2>
                <LawyerStatusPanel lawyer={lawyer} />
            </div>
        );
    }

    return (
        <div className="join-lawyer-container">
            <h2 className="form-title">Join as a Lawyer</h2>
            <p className="form-subtitle">Submit your application to get listed on LawyerUp</p>

            <form className="lawyer-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
                    <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                    <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
                    <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
                    <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                    <input name="qualification" placeholder="Qualification" value={form.qualification} onChange={handleChange} />

                    <div className="file-input">
                        <label>Upload Profile Photo</label>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'profilePhoto')} />
                    </div>

                    <div className="file-input">
                        <label>Upload License Document</label>
                        <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'licenseFile')} />
                    </div>
                </div>

                <div className="schedule-builder">
                    <LawyerScheduleBuilder onScheduleChange={setSchedule} />
                </div>

                <button type="submit" className="submit-btn">Join Now</button>
            </form>
        </div>
    );
};

export default JoinAsLawyerForm;
