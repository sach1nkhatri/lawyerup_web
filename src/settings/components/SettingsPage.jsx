import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import '../css/SettingPage.css';
import profileImage from '../../assets/profile.png';

const SettingsPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);

    const [formData, setFormData] = useState({
        name: 'Sachin',
        lastName: 'Khatri',
        email: 'Sachin@gmail.com',
        phone: '9876543210',
        state: 'Bagmati',
        city: 'Kathmandu',
        address: 'Kathmandu, Nepal',
    });

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
        document.documentElement.classList.toggle('dark-mode');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setHasChanged(true);
    };

    const handleEditClick = () => {
        if (isEditing && hasChanged) {
            // Handle save logic here
            console.log("Updated Data:", formData);
            setHasChanged(false);
        }
        setIsEditing(prev => !prev);
    };

    return (
        <div className={`settings-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="settings-card">
                <h1 className="settings-title">Account Settings</h1>
                <p className="settings-subtitle">Manage your account settings and preference</p>

                <div className="settings-content">
                    {/* Left side: Form */}
                    <div className="settings-form">
                        {[
                            ['name', 'Name'],
                            ['lastName', 'Last name'],
                            ['email', 'Email'],
                            ['phone', 'Phone'],
                            ['state', 'State'],
                            ['city', 'City'],
                            ['address', 'Address'],
                        ].map(([key, label]) => (
                            <div
                                key={key}
                                className={`form-group ${key === 'email' || key === 'phone' || key === 'address' ? 'full-width' : ''}`}
                            >
                                <label>{label}</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right side: Profile image and button */}
                    <div className="settings-profile">
                        <img src={profileImage} alt="Profile" className="profile-image" />
                        <button onClick={handleEditClick} className="edit-button">
                            {isEditing ? (hasChanged ? 'Update profile' : 'Cancel') : 'Edit profile'}
                        </button>
                        <button className="theme-toggle" onClick={toggleTheme}>
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
