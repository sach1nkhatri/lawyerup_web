import React from 'react';
import JoinAsLawyerForm from './JoinAsLawyerForm';
import LawyerStatusPanel from './LawyerStatusPanel';
import LawyerFinalListingPanel from './LawyerFinalListingPanel';
import { useJoinLawyerPage } from '../hooks/useJoinLawyerPage';

const JoinLawyerPage = () => {
    const {
        view,
        lawyerData,
        loadProfile,
        handleNext,
        handleBackToStatus,
        handleReapply,
        handleGoToStatus
    } = useJoinLawyerPage();

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
