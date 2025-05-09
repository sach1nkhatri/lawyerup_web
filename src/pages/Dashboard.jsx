import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import NewsPage from './NewsPage'; // Your actual news component
import '../css/Dashboard.css';
import LawyerUp from "../components/LawyerUp";
import PdfLibrary from "../components/PdfLibrary";
import SettingsPage from '../pages/SettingsPage';
import ReportModal from '../modals/ReportModal';
import HelpFAQPage from '../pages/HelpFAQPage';





const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('LawAi');
    const [isReportOpen, setIsReportOpen] = useState(false);

    const renderContent = () => {
        switch (activeSection) {
            case 'LawAi':
                return <ChatWindow />;
            case 'News':
                return <NewsPage />;
            case 'LawyerUp':
                return <LawyerUp />;
            case 'Pdf Library':
                return <PdfLibrary />;
            case 'Settings':
                return <SettingsPage />;
            case 'Help&FAQ': // ✅ Add this
                return <HelpFAQPage />;
            default:
                return <ChatWindow />;
        }
    };

    return (
        <div className="dashboard-wrapper">
            <Sidebar
                onSectionChange={setActiveSection}
                onReportClick={() => setIsReportOpen(true)}
            />
            <div className="dashboard-content">
                {renderContent()}
            </div>
            <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
        </div>
    );
};


export default Dashboard;
