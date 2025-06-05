import React, { useRef, useEffect } from 'react';
import styles from '../css/ChatView.module.css';
import plusIcon from '../../assets/plus.png';
import sendIcon from '../../assets/send.png';
import ChatHeader from './ChatHeader'; // ✅ Modular Header

const ChatView = ({ messages, input, setInput, handleSend, textareaRef }) => {
    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={styles.chatContainer}>
            {/* ✅ Modular Header */}
            <ChatHeader />

            {/* ✅ Scrollable Chat Body */}
            <div className={styles.chatBody}>
                {messages.map((msg, i) => (
                    <div key={i} className={`${styles.messageBubble} ${styles[msg.sender]}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>

            {/* ✅ Fixed Input Box */}
            <div className={styles.chatInputBox}>
                <div className={styles.chatBar}>
                    <div className={styles.chatButton}>
                        <img src={plusIcon} alt="plus" />
                    </div>
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        placeholder="Ask a legal question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className={styles.chatButton} onClick={() => handleSend()}>
                        <img src={sendIcon} alt="send" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatView;
