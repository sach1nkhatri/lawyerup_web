import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import JoinAsLawyerForm from './JoinAsLawyerForm';
import LawyerStatusPanel from './LawyerStatusPanel';
import LawyerFinalListingPanel from './LawyerFinalListingPanel';

const JoinLawyerPage = () => {
    const [view, setView] = useState('loading');
    const [lawyerData, setLawyerData] = useState(null);
    const navigate = useNavigate();

    const loadProfile = async () => {
        const token = localStorage.getItem('lawyerup_token');
        if (!token) {
            setView('form');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/lawyers/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error('no-application');

            const data = await res.json();
            setLawyerData(data);

            const status = data?.status || 'pending';

            if (['pending', 'hold', 'rejected'].includes(status)) {
                setView('status');
            } else if (['verified', 'listed'].includes(status)) {
                const nextClicked = localStorage.getItem('lawyerup_nextClicked') === 'true';
                setView(nextClicked ? 'control' : 'status');
            }
        } catch (err) {
            setView('form');
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleNext = () => {
        localStorage.setItem('lawyerup_nextClicked', 'true');
        setView('control');
    };

    const handleBackToStatus = () => {
        localStorage.removeItem('lawyerup_nextClicked');
        setView('status');
    };

    const handleReapply = () => {
        localStorage.removeItem('lawyerup_nextClicked');
        setLawyerData(null);
        setView('form');
    };
    const handleGoToStatus = () => {
        localStorage.removeItem('lawyerup_nextClicked');
        setView('status');
    };


    if (view === 'loading') return <p style={{ padding: '2rem' }}>Loading your application…</p>;
    if (view === 'form') return <JoinAsLawyerForm onSubmitted={loadProfile} />;
    if (view === 'status') return <LawyerStatusPanel lawyer={lawyerData} onNext={handleNext} />;
    if (view === 'control') {
        return (
            <LawyerFinalListingPanel
                lawyer={lawyerData}
                onReapply={handleReapply}
                onBack={handleBackToStatus} // ✅ here!
                onHold={handleGoToStatus}
            />
        );
    }

    return <p>Something went wrong. Please reload.</p>;
};

export default JoinLawyerPage;
