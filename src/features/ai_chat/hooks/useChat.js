import { useState, useRef, useEffect } from 'react';
import { sendMessageToAI, createNewChat } from '../../../app/api/chatService';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatId, setChatId] = useState(null);
    const [title, setTitle] = useState('New Chat');
    const [model, setModel] = useState('lawai-2.0');
    const [isGenerating, setIsGenerating] = useState(false);
    const [responseTime, setResponseTime] = useState(null);
    const textareaRef = useRef(null);
    const scrollRef = useRef(null);
    const shouldAutoScroll = useRef(true);

    const hasStarted = messages.length > 0;

    const resizeTextarea = () => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = Math.min(el.scrollHeight, 120) + 'px';
        }
    };

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        shouldAutoScroll.current = distanceFromBottom < 100;
    };

    const handleSend = async (text = input.trim()) => {
        if (!text) return;

        const userMessage = { text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        resizeTextarea();
        setIsGenerating(true);

        // ➕ placeholder bot message for streaming updates
        setMessages(prev => [...prev, { text: '', sender: 'bot' }]);

        try {
            const start = Date.now();

            const response = await fetch("http://localhost:8010/proxy/v1/chat/completions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "llama3:8b-instruct",
                    stream: true,
                    messages: [
                        { role: "system", content: "You are a helpful Nepali legal advisor." },
                        ...messages.map(m => ({
                            role: m.sender === 'user' ? 'user' : 'assistant',
                            content: m.text
                        })),
                        { role: 'user', content: text }
                    ]
                })
            });

            if (!response.ok || !response.body) {
                throw new Error("Streaming failed or LLM returned error.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let fullText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line.trim() === 'data: [DONE]') continue;

                    if (line.startsWith('data:')) {
                        try {
                            const json = JSON.parse(line.replace('data: ', ''));
                            const token = json.choices?.[0]?.delta?.content;

                            if (token) {
                                fullText += token;

                                // 💫 Animate token-by-token typing
                                setMessages(prev => {
                                    const updated = [...prev];
                                    const last = updated[updated.length - 1];
                                    if (last?.sender === 'bot') {
                                        updated[updated.length - 1] = {
                                            ...last,
                                            text: fullText
                                        };
                                    }
                                    return updated;
                                });

                                // Optional typing delay
                                await new Promise(resolve => setTimeout(resolve, 8));
                            }
                        } catch (err) {
                            console.warn("❌ Skipped malformed line:", line);
                        }
                    }
                }
            }

            setIsGenerating(false);
            setResponseTime(Date.now() - start);

        } catch (err) {
            console.error('❌ Streaming error:', err.message);
            setIsGenerating(false);
            setMessages(prev => [...prev, { text: "⚠️ Error connecting to LLM server.", sender: 'bot' }]);
        }
    };

    const newChat = () => {
        setMessages([]);
        setInput('');
        setChatId(null);
        setTitle('New Chat');
    };

    const loadChat = (chat) => {
        setChatId(chat._id);
        setMessages(chat.messages.map(m => ({
            text: m.content,
            sender: m.role === 'user' ? 'user' : 'bot',
        })));
        setTitle(chat.title);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.addEventListener('scroll', handleScroll);
        return () => el?.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (scrollRef.current && shouldAutoScroll.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        document.body.style.overflow = hasStarted ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [hasStarted]);

    return {
        messages,
        input,
        setInput,
        handleSend,
        textareaRef,
        resizeTextarea,
        hasStarted,
        isGenerating,
        responseTime,
        scrollRef,
        chatId,
        title,
        model,
        setModel,
        newChat,
        loadChat,
    };
};

export default useChat;
