import React, { useState, useRef, useEffect } from 'react';
import '../css/Chat.css';
import dummyMessages from '../data/data'; // ✅ import dummy messages

const ChatWindow = () => {
    const [messages, setMessages] = useState(dummyMessages);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: 'user', text: input.trim() }];
        setMessages(newMessages);
        setInput('');

        setTimeout(() => {
            setMessages(prev => [...prev, {
                sender: 'bot',
                text: "Thanks for your question. I'll get back to you shortly."
            }]);
        }, 1000);
    };

    return (
        <div className="chat-window">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-bar">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask a legal question..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;
