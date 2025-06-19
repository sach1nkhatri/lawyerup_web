import React from 'react';
import styles from '../css/ChatHeader.module.css';
import historyIcon from '../../../app/assets/history.png'; // ⬅️ your chat history icon

const ChatHeader = () => (
    <div className={styles.chatHeader}>
        <div className={styles.chatHeaderLeft}>
            <img src={historyIcon} alt="history" className={styles.chatIcon} />
            <span>What is law</span>
            <span className={styles.chevron}>›</span>
        </div>
        <select>
            <option>LawAI 1.0</option>
            <option>LawAI 2.0</option>
        </select>
    </div>
);

export default ChatHeader;
