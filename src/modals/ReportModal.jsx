import React, { useState } from 'react';
import '../css/ReportModal.css';

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

    const handleSubmit = () => {
        const finalIssue = selectedIssue === 'Other' ? customIssue : selectedIssue;
        console.log('Reported Issue:', finalIssue);
        onClose(); // close modal
    };

    if (!isOpen) return null;

    return (
        <div className="report-overlay">
            <div className="report-modal">
                <h2>Report an Issue</h2>
                <p>Select a reason for reporting:</p>
                <form className="report-form" onSubmit={(e) => e.preventDefault()}>
                    {issueOptions.map((issue, idx) => (
                        <label key={idx} className="radio-label">
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
                            className="custom-input"
                            placeholder="Describe your issue..."
                            value={customIssue}
                            onChange={(e) => setCustomIssue(e.target.value)}
                            required
                        />
                    )}

                    <div className="report-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                        <button type="button" onClick={handleSubmit} className="submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;
