import React from 'react';
import styles from '../css/LawyerStatusPanel.module.css';
import defaultAvatar from '../../assets/avatar.png';

const LawyerStatusPanel = ({ lawyer, onNext }) => {
    if (!lawyer) return null;

    const status = lawyer.status || 'pending';

    const statusStep = {
        pending: 1,
        hold: 1,
        rejected: 1,
        verified: 3,
        listed: 3,
    }[status] || 1;

    const imageURL = lawyer.profilePhoto
        ? `http://localhost:5000/uploads/${lawyer.profilePhoto}`
        : defaultAvatar;

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return '🟠 Pending Review';
            case 'verified': return '🟢 Approved';
            case 'listed': return '🔵 Listed Publicly';
            case 'hold': return '⚪ On Hold';
            case 'disabled': return '🔴 Disabled';
            case 'rejected': return '❌ Rejected';
            default: return 'Unknown';
        }
    };



    return (
        <div className={styles.statusContainer}>
            <div className={styles.panel}>

                {/* Lawyer Photo */}
                <div className={styles.avatarWrapper}>
                    <img
                        src={imageURL}
                        alt="Lawyer"
                        className={styles.avatar}
                        onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
                    />
                </div>

                {/* Info Grid */}
                <div className={styles.grid}>
                    <div className={styles.left}>
                        <h3>Details</h3>
                        <p><strong>Name:</strong> {lawyer.fullName}</p>
                        <p><strong>Specialization:</strong> {lawyer.specialization}</p>
                        <p><strong>Qualification:</strong> {lawyer.qualification}</p>
                        <p><strong>Address:</strong> {lawyer.address}</p>
                        <p><strong>Contact:</strong> {lawyer.phone}</p>
                        <p><strong>Status:</strong> <span>{getStatusLabel(status)}</span></p>
                    </div>

                    <div className={styles.right}>
                        <h3>Availability</h3>
                        {Object.entries(lawyer.schedule || {}).map(([day, slots], idx) => (
                            <p key={idx}>
                                <strong>{day}</strong>: {slots.map(s => `${s.start} to ${s.end}`).join(', ')}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Status Progress Bar */}
                <div className={styles.progressBar}>
                    <div className={`${styles.step} ${statusStep >= 1 ? styles.activeOrange : ''}`}>Application Sent</div>
                    <div className={`${styles.step} ${statusStep >= 2 ? styles.activeGreen : ''}`}>Application Approved</div>
                    <div className={`${styles.step} ${statusStep >= 3 ? styles.activeBlue : ''}`}>Listed</div>
                </div>

                {(status === 'verified' || status === 'listed') && (
                    <div className={styles.actionRow}>
                        <button className={styles.nextButton} onClick={onNext}>Edit Listing →</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LawyerStatusPanel;
