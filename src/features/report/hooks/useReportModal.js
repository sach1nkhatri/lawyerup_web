import { useState } from 'react';
import { notify } from '../../../app/shared_components/utils/notify';
import API from '../../../app/api/api_endpoints';
import axios from 'axios';

export const useReportModal = (onClose) => {
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
            const user = JSON.parse(localStorage.getItem('lawyerup_user'));

            if (!user || !user._id) {
                notify('error', 'User not found. Please log in again.');
                return;
            }

            const res = await axios.post(API.REPORT, {
                user: user._id,
                message: finalIssue
            });

            notify('success', res.data.message || 'Report submitted!');
            onClose();
        } catch (error) {
            console.error('Report error:', error);
            notify('error', 'Failed to submit report');
        }
    };

    return {
        selectedIssue,
        setSelectedIssue,
        customIssue,
        setCustomIssue,
        issueOptions,
        handleSubmit
    };
};
