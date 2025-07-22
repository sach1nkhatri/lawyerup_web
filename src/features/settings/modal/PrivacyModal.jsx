import React from 'react';
import '../css/Modal.css';


const PrivacyModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Privacy & Policy</h2>
                <div className="modal-content">
                    <p>
                        LawyerUp is committed to protecting your privacy. We only collect
                        necessary information to provide our services.
                    </p>
                    <p>
                        All chat data, bookings, and legal content are secured and never shared
                        outside the platform without consent.
                    </p>
                    <p>
                        Your information may be used to improve recommendations and platform
                        experience. You can request data deletion anytime.
                    </p>
                </div>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PrivacyModal;
