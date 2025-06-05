import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/ChatWindow.module.css';
import plusIcon from '../../assets/plus.png';
import sendIcon from '../../assets/send.png';
import ChatView from './ChatView'; // 👈 new separate chat UI

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const hasStarted = messages.length > 0;

    const handleSend = async (text = input.trim()) => {
        if (!text) return;

        setMessages(prev => [...prev, { text, sender: 'user' }]);
        setInput('');
        resizeTextarea();

        try {
            const response = await fetch("http://localhost:6000/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: text })
            });

            const data = await response.json();

            setMessages(prev => [
                ...prev,
                { text: data.answer || "Could not generate answer.", sender: 'bot' }
            ]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [
                ...prev,
                { text: "Error connecting to AI server.", sender: 'bot' }
            ]);
        }
    };
;

    const handleSampleClick = (sampleText) => {
        setInput(sampleText);
        handleSend(sampleText);
    };

    const resizeTextarea = () => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = Math.min(el.scrollHeight, 120) + 'px';
        }
    };

    useEffect(() => {
        document.body.style.overflow = hasStarted ? 'auto' : 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [hasStarted]);

    return (
        <div className={styles.chatWrapper}>
            {!hasStarted ? (
                <div className={styles.introContainer}>
                    <div className={styles.chatTitle}>Ask Any Law related to Nepal</div>
                    <div className={styles.sampleRow}>
                        <div className={styles.sampleBubble} onClick={() => handleSampleClick("What is law?")}>What is law?</div>
                        <div className={styles.sampleBubble} onClick={() => handleSampleClick("Transfer property to family")}>Transfer property to family</div>
                        <div className={styles.sampleBubble} onClick={() => handleSampleClick("Marriage certificate in Nepal")}>Marriage certificate in Nepal</div>
                    </div>
                    <div className={styles.chatBar}>
                        <div className={styles.chatButton}><img src={plusIcon} alt="plus" /></div>
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            placeholder="Ask a legal question..."
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                resizeTextarea();
                            }}
                        />
                        <div className={styles.chatButton} onClick={() => handleSend()}>
                            <img src={sendIcon} alt="send" />
                        </div>
                    </div>
                </div>
            ) : (
                <ChatView
                    messages={messages}
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                    textareaRef={textareaRef}
                />
            )}
        </div>
    );
};

export default ChatWindow;
