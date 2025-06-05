import React, { useState } from 'react';
import styles from '../css/ChatHeader.module.css';

const ChatHeader = () => {
    const [selectedModel, setSelectedModel] = useState('LawAI 3.0');

    const handleChange = (e) => {
        setSelectedModel(e.target.value);
        // You can emit to parent or context if needed
    };

    return (
        <div className={styles.chatHeader}>
            <span className={styles.title}>Nepal Law Chat</span>
            <select
                className={styles.modelSelect}
                value={selectedModel}
                onChange={handleChange}
            >
                <option value="" disabled>Select a model </option>
                <option>LawAI 1.0</option>
                <option>LawAI 2.0</option>
                <option>LawAI 3.0</option>
            </select>

        </div>
    );
};

export default ChatHeader;
