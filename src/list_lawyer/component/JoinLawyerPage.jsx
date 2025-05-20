// src/list_lawyer/component/JoinLawyerPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import JoinAsLawyerForm from './JoinAsLawyerForm';
import LawyerStatusPanel from './LawyerStatusPanel';
import LawyerFinalListingPanel from './LawyerFinalListingPanel';

const JoinLawyerPage = () => {
    const [view, setView] = useState('loading');
    const [lawyerData, setLawyerData] = useState(null);
    const navigate = useNavigate();

    // 🔁 Shared function to fetch lawyer data & update view
    const loadProfile = async () => {
        const token = localStorage.getItem('lawyerup_token'); // ✅ correct
        if (!token) {
            console.warn('No token found — showing form.');
            setView('form');
            return;
        }

        try {
            console.log('🔁 loadProfile called');
            const res = await fetch('http://localhost:5000/api/lawyers/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error('no-application');

            const data = await res.json();
            console.log('📦 Lawyer response:', data);

            setLawyerData(data);

            const status = data.status;
            const nextClicked = localStorage.getItem('lawyerup_nextClicked') === 'true';

            console.log('📌 status:', status);

            if (['pending', 'hold', 'rejected'].includes(status)) {
                setView('status');
            } else if (['verified', 'listed'].includes(status)) {
                setView(nextClicked ? 'control' : 'status');
            } else {
                setView('status');
            }
        } catch (err) {
            console.warn('No lawyer found — showing form.');
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

    const handleReapply = () => {
        localStorage.removeItem('lawyerup_nextClicked');
        setLawyerData(null);
        setView('form');
    };

    console.log('📺 Current view:', view);

    // ⏳ Loading
    if (view === 'loading') {
        return <p style={{ padding: '2rem' }}>Loading your application…</p>;
    }

    // 📝 Join Form
    if (view === 'form') {
        return <JoinAsLawyerForm onSubmitted={loadProfile} />;
    }

    // 📋 Status View
    if (view === 'status') {
        if (!lawyerData) return <p>⚠️ No application data found.</p>;
        return <LawyerStatusPanel lawyer={lawyerData} onNext={handleNext} />;
    }

    // 🛠 Edit Listing
    if (view === 'control') {
        return <LawyerFinalListingPanel lawyer={lawyerData} onReapply={handleReapply} />;
    }

    return <p>Something went wrong. Please reload.</p>;
};

export default JoinLawyerPage;
