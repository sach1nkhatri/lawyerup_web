import React from 'react';
import styles from '../css/ChatHistoryPopup.module.css';

const ChatHistoryPopup = ({ history = [], onSelect, onNewChat, onDelete, onClose }) => {
    return (
        <div className={styles.popupOverlay} onClick={onClose}>
            <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>✖</button>
                <h4>📜 Recent Chats</h4>
                <div className={styles.chatList}>
                    {history.map(chat => (
                        <div key={chat.id} className={styles.chatItem} onClick={() => onSelect(chat.id)}>
                            <span>{chat.title}</span>
                            <button
                                className={styles.deleteBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(chat.id);
                                }}
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                </div>
                <button className={styles.newChatBtn} onClick={onNewChat}>
                    ➕ Start New Chat
                </button>
            </div>
        </div>
    );
};

export default ChatHistoryPopup;
