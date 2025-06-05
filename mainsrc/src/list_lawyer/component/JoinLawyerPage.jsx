import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import JoinAsLawyerForm from './JoinAsLawyerForm';
import LawyerStatusPanel from './LawyerStatusPanel';
import LawyerFinalListingPanel from './LawyerFinalListingPanel';

const JoinLawyerPage = () => {
    const [view, setView] = useState('loading');
    const [lawyerData, setLawyerData] = useState(null);
    const navigate = useNavigate();

    const getToken = () => localStorage.getItem('lawyerup_token');
    const getNextClicked = () => localStorage.getItem('lawyerup_nextClicked') === 'true';

    const loadProfile = async () => {
        const token = getToken();
        if (!token) return setView('form');

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
;

            if (!res.ok) throw new Error('No application found');

            const data = await res.json();
            setLawyerData(data);

            const status = data?.status || 'pending';
            if (['pending', 'hold', 'rejected'].includes(status)) {
                setView('status');
            } else if (['verified', 'listed'].includes(status)) {
                setView(getNextClicked() ? 'control' : 'status');
            } else {
                setView('form');
            }
        } catch (err) {
            setView('form');
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    // Handlers
    const handleNext = () => {
        localStorage.setItem('lawyerup_nextClicked', 'true');
        setView('control');
    };

    const handleBackToStatus = () => {
        localStorage.removeItem('lawyerup_nextClicked');
        loadProfile(); // handles setting correct view
    };

    const handleReapply = () => {
        localStorage.removeItem('lawyerup_nextClicked');
        setLawyerData(null);
        setView('form');
    };

    const handleGoToStatus = async () => {
        localStorage.removeItem('lawyerup_nextClicked');
        await loadProfile(); // 🔁 fetch updated lawyer data and update view
    };


    // View rendering
    if (view === 'loading') return <p style={{ padding: '2rem' }}>Loading your application…</p>;
    if (view === 'form') return <JoinAsLawyerForm onSubmitted={loadProfile} />;
    if (view === 'status') return <LawyerStatusPanel lawyer={lawyerData} onNext={handleNext} />;
    if (view === 'control') {
        return (
            <LawyerFinalListingPanel
                lawyer={lawyerData}
                onReapply={handleReapply}
                onBack={handleBackToStatus}
                onHold={handleGoToStatus}
            />
        );
    }

    return <p>Something went wrong. Please reload.</p>;
};

export default JoinLawyerPage;
