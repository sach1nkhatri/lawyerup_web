import React from 'react';
import styles from '../css/ChatInputBox.module.css';

const ChatInputBox = ({ input, setInput, handleSend, textareaRef, onUploadClick }) => {
    return (
        <div className={styles.chatInput}>
            <button className={styles.btn} onClick={onUploadClick}>＋</button>
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
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
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
