import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/Sidebar.css';

// Icons (placeholder icons from your assets folder)
import logoIcon from '../assets/logo2.png';
import logoText from '../assets/textlogowhite.png';
import iconLawAI from '../assets/chatbotWhite.png';
import iconNews from '../assets/newsWhite.png';
import iconLawyer from '../assets/hammerwhite.png';
import iconPdf from '../assets/pdfweb.png';
import iconSettings from '../assets/settings.png'; // placeholder
import iconReport from '../assets/warning.png'; // placeholder
import iconHelp from '../assets/faq.png'; // placeholder
import iconUser from '../assets/user.png'; // placeholder
import arrowUp from '../assets/up.png';
import arrowDown from '../assets/down.png';

const Sidebar = ({ onSectionChange }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(false);

    const toggleCollapse = () => setCollapsed(!collapsed);
    const toggleUserInfo = () => setShowUserInfo(!showUserInfo);

    const menuItems = [
        { icon: iconLawAI, label: 'LawAi' },
        { icon: iconNews, label: 'News' },
        { icon: iconLawyer, label: 'LawyerUp' },
        { icon: iconPdf, label: 'Pdf Library' },
        { divider: true },
        { icon: iconSettings, label: 'Settings' },
        { icon: iconReport, label: 'Report' },
        { icon: iconHelp, label: 'Help&FAQ' },
    ];

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <img src={logoIcon} alt="Logo" className="logo-icon" />
                {!collapsed && <img src={logoText} alt="LawyerUp" className="logo-text" />}
            </div>

            <div className="sidebar-menu">
                {menuItems.map((item, idx) =>
                    item.divider ? (
                        <hr key={idx} className="menu-divider" />
                    ) : (
                        <div
                            key={idx}
                            className="menu-item"
                            onClick={() => onSectionChange(item.label)}
                        >
                            <img src={item.icon} alt={item.label} className="menu-icon" />
                            {!collapsed && <span>{item.label}</span>}
                        </div>
                    )
                )}
            </div>

            <div className="sidebar-footer">
                <div className="user-toggle" onClick={toggleUserInfo}>
                    <img src={iconUser} alt="User" className="user-icon" />
                    {!collapsed && <span className="username">Sachin Khatri</span>}
                    {!collapsed && (
                        <img
                            src={showUserInfo ? arrowUp : arrowDown}
                            alt="Toggle"
                            className="arrow-toggle"
                        />
                    )}
                </div>

                {!collapsed && showUserInfo && (
                    <div className="user-details">
                        <p>Plan: Premium</p>
                        <p>Email: sachin@example.com</p>
                        <button
                            className="logout-btn"
                            onClick={() => {
                                localStorage.clear();
                                navigate('/'); // Redirect to landing page
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}

                <button className="collapse-btn" onClick={toggleCollapse}>
                    {collapsed ? '→' : '←'}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
