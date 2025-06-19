import React from 'react';
import styles from '../css/ChatBody.module.css';

const ChatBody = ({ messages }) => (
    <div className={styles.chatScroll}>
        {messages.map((msg, i) => (
            <div
                key={i}
                className={`${styles.bubble} ${msg.sender === 'user' ? styles.user : styles.bot}`}
            >
                {msg.text}
            </div>
        ))}
    </div>
);

export default ChatBody;
