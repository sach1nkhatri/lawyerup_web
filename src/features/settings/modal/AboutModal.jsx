import React from 'react';
import '../css/Modal.css';

const AboutModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>About Us</h2>
                <div className="modal-content">
                    <p>
                        LawyerUp is a modern legal platform built for the people of Nepal —
                        connecting clients to lawyers, legal tools, and AI-based advisory 24/7.
                    </p>
                    <p>
                        Our goal is to make legal support more accessible, transparent, and
                        efficient for everyone.
                    </p>
                    <p>
                        Founded in 2024, we're a team of developers, lawyers, and innovators
                        working to bridge the gap between technology and justice.
                    </p>
                </div>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default AboutModal;
