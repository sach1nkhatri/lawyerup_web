import React, { useState } from 'react';
import '../css/ReportModal.css';
import { notify } from '../../../app/shared_components/utils/notify'
import axios from "axios";

const ReportModal = ({ isOpen, onClose }) => {
    const [selectedIssue, setSelectedIssue] = useState('');
    const [customIssue, setCustomIssue] = useState('');

    const issueOptions = [
        'Incorrect legal information',
        'Chatbot not responding',
        'Broken link or page',
        'Appointment issue',
        'Other',
    ];



    const handleSubmit = async () => {
        const finalIssue = selectedIssue === 'Other' ? customIssue : selectedIssue;

        if (!selectedIssue || (selectedIssue === 'Other' && !customIssue.trim())) {
            notify('warn', 'Please select or describe an issue');
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('lawyerup_user')); // ✅ same as in UserReview

            if (!user || !user._id) {
                notify('error', 'User not found. Please log in again.');
                return;
            }

            const res = await axios.post(`${process.env.REACT_APP_API_URL}report`, {
                user: user._id, // ✅ sending ObjectId as required by backend
                message: finalIssue
            });

            console.log('Response:', res.data);
            notify('success', res.data.message || 'Report submitted!');
            onClose();
        } catch (error) {
            console.error('Report error:', error);
            notify('error', 'Failed to submit report');
        }
    };




    if (!isOpen) return null;

    return (
        <div className="report-modal-container">
            <div className="report-overlay">
                <div className="report-modal">
                    <h2>Report an Issue</h2>
                    <p>Select a reason for reporting:</p>
                    <form className="report-form" onSubmit={(e) => e.preventDefault()}>
                        {issueOptions.map((issue, idx) => (
                            <label key={idx} className="report-radio-label">
                                <input
                                    type="radio"
                                    name="issue"
                                    value={issue}
                                    checked={selectedIssue === issue}
                                    onChange={() => setSelectedIssue(issue)}
                                />
                                {issue}
                            </label>
                        ))}

                        {selectedIssue === 'Other' && (
                            <textarea
                                className="report-custom-input"
                                placeholder="Describe your issue..."
                                value={customIssue}
                                onChange={(e) => setCustomIssue(e.target.value)}
                                required
                            />
                        )}

                        <div className="report-actions">
                            <button type="button" onClick={onClose} className="report-cancel-btn">Cancel</button>
                            <button type="button" onClick={handleSubmit} className="report-submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
