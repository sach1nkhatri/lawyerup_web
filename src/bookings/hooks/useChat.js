import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL, {
    transports: ['websocket'], // 🔧 Optional: enforce WebSocket for stability
    withCredentials: true,
});

export const useChat = (bookingId, senderId) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const messagesEndRef = useRef(null);

    // 🔁 Join room and listen for messages
    useEffect(() => {
        if (!bookingId) return;

        console.log('Joining room:', bookingId);
        socket.emit('joinRoom', bookingId);

        socket.on('receiveMessage', (msg) => {
            console.log('📥 Message received:', msg);
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [bookingId]);

    // 🔁 Fetch message history
    useEffect(() => {
        if (!bookingId) return;

        fetch(`${process.env.REACT_APP_API_URL}bookings/${bookingId}/chat`)
            .then(res => res.json())
            .then(data => {
                setMessages(data || []);
                console.log('📚 Chat loaded:', data);
            })
            .catch(console.error);
    }, [bookingId]);

    // 📤 Send a message
    const sendMessage = () => {
        if (!text.trim()) return;

        const messagePayload = { bookingId, senderId, text };
        console.log('📤 Sending:', messagePayload);
        socket.emit('sendMessage', messagePayload);
        setText('');
    };

    return { messages, text, setText, sendMessage, messagesEndRef };
};
