import React from 'react';
import { Sun, Moon } from 'lucide-react';
import profileImage from '../../assets/avatar.png';
import PlanCardInSettings from './PlanCardInSettings';
import { useSettings } from '../hooks/useSettings';
import '../css/SettingPage.css';


const Settings = () => {
    const {
        darkMode,
        formData,
        isEditing,
        hasChanged,
        handleChange,
        loading,
        handleEditClick,
        toggleTheme,
    } = useSettings();
    const isProfileIncomplete = !formData.state || !formData.city || !formData.address;

    if (loading) {
        return (
            <div className="settings-container">
                <div className="settings-card skeleton-card">
                    <div className="skeleton-title shimmer" />
                    <div className="skeleton-subtitle shimmer" />
                    <div className="skeleton-form shimmer" />
                </div>
            </div>
        );
    }


    return (
        <div className={`settings-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="settings-card">
                <h1 className="settings-title">Settings</h1>
                <p className="settings-subtitle">Manage your account settings and preferences</p>

                {/* 🔔 Recommendation Banner */}
                {isProfileIncomplete && (
                    <div className="profile-incomplete-warning">
                        <strong>Complete your profile</strong> to get personalized lawyer recommendations in your area.
                    </div>
                )}

                {/* ===== Profile Form + Image ===== */}
                <div className="settings-content">
                    <div className="settings-form">
                        {[
                            ['name', 'Name'],
                            ['email', 'Email'],
                            ['phone', 'Phone'],
                            ['state', 'State'],
                            ['city', 'City'],
                            ['address', 'Address'],
                        ].map(([key, label]) => (
                            <div key={key} className={`form-group ${['name','email', 'phone', 'address'].includes(key) ? 'full-width' : ''}`}>
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

                    <div className="settings-profile">
                        <img src={profileImage} alt="Profile" className="profile-image" />
                        <button onClick={handleEditClick} className="edit-button">
                            {isEditing ? (hasChanged ? 'Update Profile' : 'Cancel') : 'Edit Profile'}
                        </button>
                        <button className="theme-toggle" onClick={toggleTheme}>
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </div>

                {/* ===== Subscription Plan ===== */}
                <div className="subscription-wrapper">
                    <h3 className="settings-subtitle">Your Current Plan</h3>
                    <PlanCardInSettings plan="Free Trial" />
                </div>

                {/* ===== Danger Zone ===== */}
                <div className="danger-zone">
                    <h3>Danger Zone</h3>
                    <ul>
                        {[
                            'Clear Booking & Chat History',
                            'Clear Law AI Data',
                            'Delete Account'
                        ].map((text, index) => (
                            <li key={index}>
                                <span>{text}</span>
                                <button className="delete-btn">Delete</button>
                            </li>
                        ))}
                    </ul>
                    <p className="warning-text">⚠ This action cannot be undone.</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
