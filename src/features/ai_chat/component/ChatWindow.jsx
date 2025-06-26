import React, { useState } from 'react';
import useChat from '../hooks/useChat';
import ChatView from './ChatView';
import ChatHistoryPopup from './ChatHistoryPopup';
import plusIcon from '../../../app/assets/plus.png';
import sendIcon from '../../../app/assets/send.png';
import historyIcon from '../../../app/assets/history.png';
import styles from '../css/ChatWindow.module.css';
import useChatHistory from '../hooks/useChatHistory';

const ChatWindow = () => {
    const [showHistory, setShowHistory] = useState(false);

    const {
        messages,
        input,
        setInput,
        handleSend,
        textareaRef,
        resizeTextarea,
        hasStarted,
        isGenerating,
        responseTime,
        chatId,
        title,
        model,
        setModel,
        newChat,
        loadChat,
    } = useChat();

    const handleChatSelect = async (chatId) => {
        const token = localStorage.getItem('lawyerup_token');
        try {
            const res = await fetch(`http://localhost:5000/api/ai/chats/${chatId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const fullChat = await res.json();
            loadChat(fullChat); // from useChat()
        } catch (err) {
            console.error('❌ Failed to load chat:', err.message);
        }
    };


    // ✅ Chat history hook
    const {
        history,
        isLoadingHistory,
        removeChat
    } = useChatHistory();

    const handleSampleClick = (sampleText) => {
        setInput(sampleText);
        handleSend(sampleText);
    };

    return (
        <div className={styles.chatWrapper}>
            {/* 🕘 Toggle Chat History */}
            <div className={styles.historyIcon} onClick={() => setShowHistory(true)}>
                <img src={historyIcon} alt="history" />
            </div>

            {showHistory && (
                <ChatHistoryPopup
                    history={history}
                    isLoading={isLoadingHistory}
                    onDelete={removeChat}
                    onClose={() => setShowHistory(false)}
                    onLoadChat={handleChatSelect}
                    onNewChat={newChat}
                />
            )}

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
                    title={title}
                    model={model}
                    setModel={setModel}
                    onNewChat={newChat}
                    onLoadChat={loadChat}
                />
            )}
        </div>
    );
};

export default ChatWindow;
