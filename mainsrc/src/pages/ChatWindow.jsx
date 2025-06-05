import React, { useState, useEffect, useRef } from 'react';
import '../css/Chat.css';
import plusIcon from '../assets/plus.png';
import sendIcon from '../assets/send.png';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messageEndRef = useRef(null);
    const textareaRef = useRef(null);

    const hasStarted = messages.length > 0;

    const handleSend = (text = input.trim()) => {
        if (!text) return;

        setMessages(prev => [...prev, { text, sender: 'user' }]);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: 'This is a simulated legal answer based on your query.',
                sender: 'bot'
            }]);
        }, 600);
        setInput('');
        resizeTextarea();
    };

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
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={`chat-wrapper ${hasStarted ? 'chat-started' : 'chat-intro'}`}>
            {!hasStarted ? (
                <div className="intro-container">
                    <div className="chat-title">Ask Any Law related to Nepal</div>
                    <div className="sample-row">
                        <div className="sample-bubble" onClick={() => handleSampleClick("What is law?")}>What is law?</div>
                        <div className="sample-bubble" onClick={() => handleSampleClick("Transfer property to family")}>Transfer property to family</div>
                        <div className="sample-bubble" onClick={() => handleSampleClick("Marriage certificate in Nepal")}>Marriage certificate in Nepal</div>
                    </div>
                    <div className="chat-bar rounded">
                        <div className="chat-button"><img src={plusIcon} alt="plus" /></div>
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
                        <div className="chat-button" onClick={() => handleSend()}>
                            <img src={sendIcon} alt="send" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="chat-inner">
                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`message-bubble ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </div>
                    <div className="chat-bar rounded fixed">
                        <div className="chat-button"><img src={plusIcon} alt="plus" /></div>
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
                        <div className="chat-button" onClick={() => handleSend()}>
                            <img src={sendIcon} alt="send" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
