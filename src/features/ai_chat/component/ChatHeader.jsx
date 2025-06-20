import React, { useState } from 'react';
import styles from '../css/ChatHeader.module.css';
import historyIcon from '../../../app/assets/history.png';
import ChatHistoryPopup from './ChatHistoryPopup'; // ✅ new import

const mockChatHistory = [
    { id: 1, title: 'Legal Advice with AI' },
    { id: 2, title: 'Property Law Q&A' },
    { id: 3, title: 'Startup Legal Support' },
];

const ChatHeader = ({ title = "New Chat", onLoadChat, onNewChat }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [chatHistory, setChatHistory] = useState(mockChatHistory);

    const handleDelete = (id) => {
        setChatHistory(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className={styles.chatHeader}>
            <div className={styles.chatHeaderLeft}>
                <img
                    src={historyIcon}
                    alt="history"
                    className={styles.chatIcon}
                    onClick={() => setShowPopup(true)}
                />
                <span>{title}</span>
                <span className={styles.chevron}>›</span>
            </div>

            <select>
                <option>LawAI 1.0</option>
                <option>LawAI 2.0</option>
                <option>LawAI 3.0</option>
            </select>

            {showPopup && (
                <ChatHistoryPopup
                    history={chatHistory}
                    onSelect={(id) => {
                        const chat = chatHistory.find(c => c.id === id);
                        onLoadChat?.(chat);
                        setShowPopup(false);
                    }}
                    onDelete={handleDelete}
                    onNewChat={() => {
                        onNewChat?.();
                        setShowPopup(false);
                    }}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
};

export default ChatHeader;
