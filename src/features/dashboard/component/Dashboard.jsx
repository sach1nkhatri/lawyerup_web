import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Sidebar from '../../../app/shared_components/sidebar/component/Sidebar';
import ChatWindow from '../../ai_chat/component/ChatWindow';
import NewsPage from '../../news/componet/NewsPage';
import LawyerUp from "../../lawuerUp/component/LawyerUp";
import PdfLibrary from "../../pdf_libary/component/PdfLibrary";
import SettingsPage from '../../settings/components/SettingsPage';
import ReportModal from '../../report/component/ReportModal';
import HelpFAQPage from '../../faq_page/component/HelpFAQPage';
import JoinLawyerPage from '../../list_lawyer/component/JoinLawyerPage';
import LawyerStatusPanel from '../../list_lawyer/component/LawyerStatusPanel';
import Bookings from '../../bookings/component/BookingPage';



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
            'Join as a Lawyer': '/dashboard/join-lawyerUp',
            'Bookings': '/dashboard/bookings',
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
                    <Route path="join-lawyerUp" element={<JoinLawyerPage />} />
                    <Route path="status-page" element={<LawyerStatusPanel />} />
                    <Route path="bookings" element={<Bookings/>} />
                </Routes>
            </div>

            <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
        </div>
    );
};

export default Dashboard;
