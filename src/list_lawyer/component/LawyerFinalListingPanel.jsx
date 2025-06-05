
import React, { useState } from 'react';
import LawyerScheduleBuilder from './LawyerScheduleBuilder';
import '../css/LawyerFinalListingPanel.css';
import defaultAvatar from '../../assets/avatar.png';
import Swal from 'sweetalert2';

import { startLoader, stopLoader } from '../utils/loader';
import { notify } from '../../utils/notify';

const LawyerFinalListingPanel = ({ lawyer, onReapply, onBack, onHold }) => {
    const [form, setForm] = useState({
        phone: lawyer.phone || '',
        state: lawyer.state || '',
        city: lawyer.city || '',
        address: lawyer.address || '',
        qualification: lawyer.qualification || '',
        specialization: lawyer.specialization || '',
        description: lawyer.description || '',
        specialCase: lawyer.specialCase || '',
        socialLink: lawyer.socialLink || ''
    });

    const [education, setEducation] = useState(
        Array.isArray(lawyer.education) && lawyer.education.length
            ? lawyer.education
            : [{ degree: '', institute: '', year: '', specialization: '' }]
    );

    const [workExperience, setWorkExperience] = useState(
        Array.isArray(lawyer.workExperience) && lawyer.workExperience.length
            ? lawyer.workExperience
            : [{ court: '', from: '', to: '' }]
    );

    const [editableSchedule, setEditableSchedule] = useState(lawyer.schedule || {});
    const [profilePhoto, setProfilePhoto] = useState(lawyer.profilePhoto || '');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEducationChange = (index, field, value) => {
        setEducation(prev => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    };

    const handleWorkChange = (index, field, value) => {
        setWorkExperience(prev => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    };

    const addEducation = () => setEducation(prev => [...prev, { degree: '', institute: '', year: '', specialization: '' }]);
    const removeEducation = (index) => {
        if (education.length > 1)
            setEducation(prev => prev.filter((_, i) => i !== index));
    };

    const addWork = () => setWorkExperience(prev => [...prev, { court: '', from: '', to: '' }]);
    const removeWork = (index) => {
        if (workExperience.length > 1)
            setWorkExperience(prev => prev.filter((_, i) => i !== index));
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

    const handleScheduleChange = (newSchedule) => {
        setEditableSchedule(newSchedule);
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
                body: JSON.stringify({
                    ...form,
                    schedule: editableSchedule,
                    education,
                    workExperience,
                }),
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
                    <p><b>Full Name</b> <input value={lawyer.fullName} disabled style={{backgroundColor: '#f3f4f6'}}/>
                    </p>
                    <p><b>Email</b> <input value={lawyer.email} disabled style={{backgroundColor: '#f3f4f6'}}/></p>
                    <p><b>Specialization</b> <input name="specialization" value={form.specialization}
                                                    onChange={handleInputChange}/></p>
                    <p><b>Phone</b> <input name="phone" value={form.phone} onChange={handleInputChange}/></p>
                    <p><b>State</b> <input name="state" value={form.state} onChange={handleInputChange}/></p>
                    <p><b>City</b> <input name="city" value={form.city} onChange={handleInputChange}/></p>
                    <p><b>Address</b> <input name="address" value={form.address} onChange={handleInputChange}/></p>
                    <p><b>Qualification</b> <input name="qualification" value={form.qualification}
                                                   onChange={handleInputChange}/></p>

                    <h3>Education</h3>
                    {education.map((edu, idx) => (
                        <div key={idx} className="array-entry">
                            <input placeholder="Degree" value={edu.degree}
                                   onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}/>
                            <input placeholder="Institute" value={edu.institute}
                                   onChange={(e) => handleEducationChange(idx, 'institute', e.target.value)}/>
                            <input placeholder="Year" value={edu.year}
                                   onChange={(e) => handleEducationChange(idx, 'year', e.target.value)}/>
                            <input placeholder="Specialization" value={edu.specialization}
                                   onChange={(e) => handleEducationChange(idx, 'specialization', e.target.value)}/>
                            <button onClick={() => removeEducation(idx)}>Remove</button>
                        </div>
                    ))}
                    <button onClick={addEducation}>Add Education</button>

                    <h3>Work Experience</h3>
                    {workExperience.map((work, idx) => (
                        <div key={idx} className="array-entry">
                            <input placeholder="Court" value={work.court}
                                   onChange={(e) => handleWorkChange(idx, 'court', e.target.value)}/>
                            <input placeholder="From" value={work.from}
                                   onChange={(e) => handleWorkChange(idx, 'from', e.target.value)}/>
                            <input placeholder="To" value={work.to}
                                   onChange={(e) => handleWorkChange(idx, 'to', e.target.value)}/>
                            <button onClick={() => removeWork(idx)}>Remove</button>
                        </div>
                    ))}
                    <button onClick={addWork}>Add Work</button>


                    <p><b>Social Link</b> <input name="socialLink" value={form.socialLink}
                                                 onChange={handleInputChange}/></p>
                    <p>
                        <b>Special Case</b><br/>
                        <textarea
                            name="specialCase"
                            value={form.specialCase}
                            onChange={handleInputChange}
                            maxLength={200}
                        />
                        <small>{form.specialCase.length}/200</small>
                    </p>

                    <p>
                        <b>Description</b><br/>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                            maxLength={200}
                        />
                        <small>{form.description.length}/200</small>
                    </p>


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
                    <input type="file" accept="image/*" onChange={handleFileChange}/>
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
