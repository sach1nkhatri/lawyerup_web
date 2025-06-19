import React from 'react';
import styles from '../css/ChatInputBox.module.css';

const ChatInputBox = ({ input, setInput, handleSend, textareaRef }) => {
    return (
        <div className={styles.chatInput}>
            <button className={styles.btn}>＋</button>
            <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    if (textareaRef.current) {
                        textareaRef.current.style.height = 'auto';
                        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
                    }
                }}
                placeholder="Ask your legal question..."
                rows={1}
            />
            <button className={styles.btn} onClick={() => handleSend()}>↑</button>
        </div>
    );
};

export default ChatInputBox;
