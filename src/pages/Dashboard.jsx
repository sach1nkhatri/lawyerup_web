import React from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path based on your structure
import '../css/Dashboard.css'; // Optional: for future content styling

const Dashboard = () => {
    return (
        <div className="dashboard-wrapper">
            <Sidebar />
            <div className="dashboard-content">
                <h2>Welcome to LawyerUp Dashboard</h2>
                <p>We'll load the LawAi chat component here next.</p>
            </div>
        </div>
    );
};

export default Dashboard;
