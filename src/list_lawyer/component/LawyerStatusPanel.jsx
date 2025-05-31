import React from 'react';
import styles from '../css/LawyerStatusPanel.module.css';
import defaultAvatar from '../../assets/avatar.png';
import Swal from 'sweetalert2'; // ✅ import SweetAlert2
import { notify } from '../../utils/notify'; // ✅ import your notify

const LawyerStatusPanel = ({ lawyer, onNext }) => {
    if (!lawyer) return null;

    const status = lawyer.status || 'pending';

    const statusStep = {
        pending: 1,
        rejected: 1,
        disabled: 0,
        hold: 2,
        verified: 2,
        listed: 3,
    }[status] || 1;

    const imageURL = lawyer.profilePhoto?.startsWith('data:image')
        ? lawyer.profilePhoto
        : `http://localhost:5000/uploads/${lawyer.profilePhoto || ''}`;

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

    const handleStartListing = async () => {
        const result = await Swal.fire({
            title: 'List Your Profile?',
            text: 'Your profile will be made public to clients.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, List It!',
        });

        if (!result.isConfirmed) return;

        const token = localStorage.getItem('lawyerup_token');
        try {
            const res = await fetch(`http://localhost:5000/api/lawyers/${lawyer._id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: 'listed' }),
            });

            if (res.ok) {
                notify('success', '🎉 Your profile is now public!');
                onNext();
            } else {
                notify('error', '❌ Failed to list profile.');
            }
        } catch (error) {
            notify('error', '⚠️ Network error while updating status.');
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
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultAvatar;
                        }}
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

                {/* Rejection Reason */}
                {status === 'rejected' && lawyer.rejectionReason && (
                    <div className={styles.rejectionBox}>
                        <h4>❌ Application Rejected</h4>
                        <p><strong>Reason:</strong> {lawyer.rejectionReason}</p>
                    </div>
                )}

                {/* Progress Bar */}
                <div className={styles.progressBar}>
                    <div className={`${styles.step} ${statusStep >= 1 ? styles.activeOrange : ''}`}>Application Sent</div>
                    <div className={`${styles.step} ${statusStep >= 2 ? styles.activeGreen : ''}`}>Application Approved</div>
                    <div className={`${styles.step} ${statusStep >= 3 ? styles.activeBlue : ''}`}>Listed</div>
                </div>

                {/* Action Buttons */}
                {status === 'hold' && (
                    <div className={styles.actionRow}>
                        <button className={styles.nextButton} onClick={handleStartListing}>
                            Start Listing →
                        </button>
                    </div>
                )}

                {status === 'verified' && (
                    <div className={styles.actionRow}>
                        <button className={styles.nextButton} onClick={onNext}>
                            Edit Listing (Not Public Yet) →
                        </button>
                    </div>
                )}

                {status === 'listed' && (
                    <div className={styles.actionRow}>
                        <button className={styles.nextButton} onClick={onNext}>
                            Edit Public Listing →
                        </button>
                    </div>
                )}

                {status === 'rejected' && (
                    <div className={styles.actionRow}>
                        <button className={styles.nextButton} onClick={onNext}>
                            Edit Application →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LawyerStatusPanel;
