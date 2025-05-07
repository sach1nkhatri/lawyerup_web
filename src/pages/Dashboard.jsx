import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import NewsPage from '../components/NewsPage'; // Your actual news component
import '../css/Dashboard.css';
import LawyerUp from "../components/LawyerUp";
import PdfLibrary from "../components/PdfLibrary";


const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('LawAi');

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
            default:
                return <ChatWindow />; // fallback
        }
    };


    return (
        <div className="dashboard-wrapper">
            <Sidebar onSectionChange={setActiveSection} />
            <div className="dashboard-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
