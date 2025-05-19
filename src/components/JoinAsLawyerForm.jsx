import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/JoinAsLawyerFrom.css';
import LawyerScheduleBuilder from '../components/LawyerScheduleBuilder';
import { useEffect } from 'react';

const JoinAsLawyerForm = () => {
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, key) => {
        setForm(prev => ({ ...prev, [key]: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

        try {
            const payload = {
                ...form,
                schedule,
            };

            if (form.profilePhoto) {
                payload.profilePhoto = await toBase64(form.profilePhoto);
            }

            if (form.licenseFile) {
                payload.licenseFile = await toBase64(form.licenseFile);
            }

            const res = await fetch('http://localhost:5000/api/lawyers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error('Failed to submit lawyer form');
            }

            const data = await res.json();
            console.log('Success:', data);
            navigate('/lawyer-status');
        } catch (error) {
            console.error('Submit error:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        const query = user.email
            ? `email=${encodeURIComponent(user.email)}`
            : `contactNumber=${user.contactNumber}`;

        fetch(`http://localhost:5000/api/lawyers/by-user?${query}`)
            .then(res => {
                if (!res.ok) throw new Error('Lawyer not found');
                return res.json();
            })
            .then(data => {
                setForm({
                    fullName: data.fullName,
                    specialization: data.specialization,
                    email: data.email,
                    phone: data.phone,
                    state: data.state,
                    city: data.city,
                    address: data.address,
                    qualification: data.qualification,
                    profilePhoto: null,
                    licenseFile: null,
                });
                setSchedule(data.schedule || {});
            })
            .catch(err => {
                console.log('No existing lawyer application found.');
            });
    }, []);


    return (
        <div className="join-lawyer-container">
            <h2>Join as a Lawyer</h2>
            <p>Your application will be reviewed by an admin.</p>

            <form className="lawyer-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
                    <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                    <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
                    <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
                    <input name="address" placeholder="Street Address" value={form.address} onChange={handleChange} />
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

                <LawyerScheduleBuilder onScheduleChange={setSchedule} />

                <button type="submit" className="submit-btn">Join Now</button>
            </form>
        </div>
    );
};

export default JoinAsLawyerForm;
