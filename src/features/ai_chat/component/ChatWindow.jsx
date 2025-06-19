import React from 'react';
import useChat from '../hooks/useChat'; // wherever you place the hook
import ChatView from './ChatView';
import plusIcon from '../../../app/assets/plus.png';
import sendIcon from '../../../app/assets/send.png';
import styles from '../css/ChatWindow.module.css';

const ChatWindow = () => {
    const {
        messages,
        input,
        setInput,
        handleSend,
        textareaRef,
        resizeTextarea,
        hasStarted,
        isGenerating,       // ✅ add this
        responseTime        // ✅ and this
    } = useChat();


    const handleSampleClick = (sampleText) => {
        setInput(sampleText);
        handleSend(sampleText);
    };



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
                    isGenerating={isGenerating}
                    responseTime={responseTime}
                />
            )}
        </div>
    );
};

export default ChatWindow;
