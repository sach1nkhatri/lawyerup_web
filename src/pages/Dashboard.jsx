import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import ChatWindow from './ChatWindow';
import NewsPage from './NewsPage';
import LawyerUp from "../components/LawyerUp";
import PdfLibrary from "../components/PdfLibrary";
import SettingsPage from '../pages/SettingsPage';
import ReportModal from '../modals/ReportModal';
import HelpFAQPage from '../pages/HelpFAQPage';
import LawyerProfile from '../components/LawyerProfilePanel';


import '../css/Dashboard.css';

const Dashboard = () => {
    const [isReportOpen, setIsReportOpen] = useState(false);
    const navigate = useNavigate();

    const handleSectionChange = (label) => {
        const routeMap = {
            'LawAi': '/dashboard',
            'News': '/dashboard/news',
            'LawyerUp': '/dashboard/lawyerUp',
            'Pdf Library': '/dashboard/pdfLibrary',
            'Settings': '/dashboard/settings',
            'Help&FAQ': '/dashboard/help',
        };

        navigate(routeMap[label] || '/dashboard');
    };

    return (
        <div className="dashboard-wrapper">
            <Sidebar
                onSectionChange={handleSectionChange}
                onReportClick={() => setIsReportOpen(true)}
            />

            <div className="dashboard-content">
                <Routes>
                    <Route path="/" element={<ChatWindow />} />
                    <Route path="news" element={<NewsPage />} />
                    <Route path="lawyerUp" element={<LawyerUp />} />
                    <Route path="lawyerUp/lawyerProfile/:id" element={<LawyerUp />} />
                    <Route path="pdfLibrary" element={<PdfLibrary />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="help" element={<HelpFAQPage />} />
                    <Route path="*" element={<ChatWindow />} />
                </Routes>
            </div>

            <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
        </div>
    );
};

export default Dashboard;
