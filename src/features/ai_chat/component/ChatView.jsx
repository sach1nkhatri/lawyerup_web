import React from 'react';
import styles from '../css/ChatView.module.css';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInputBox from './ChatInputBox';
import ChatFooter from './ChatFooter';

const ChatView = ({
                      messages,
                      input,
                      setInput,
                      handleSend,
                      textareaRef,
                      isGenerating,       // ✅ add this
                      responseTime        // ✅ and this
                  }) => {
    return (
        <div className={styles.chatWrapper}>
            <ChatHeader />
            <ChatBody
                messages={messages}
                isGenerating={isGenerating}
                responseTime={responseTime}
            />

            <div className={styles.chatInputSection}>
                <ChatInputBox
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                    textareaRef={textareaRef}
                />
                <ChatFooter />
            </div>
        </div>
    );
};

export default ChatView;
