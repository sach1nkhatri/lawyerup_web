
import { useState, useRef, useEffect } from 'react';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
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

        setMessages(prev => [...prev, { text, sender: 'user' }]);
        setInput('');
        resizeTextarea();
        setIsGenerating(true);

        try {
            const startTime = Date.now();

            const response = await fetch("http://localhost:8010/proxy/v1/chat/completions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "llama3:8b-instruct",
                    stream: true,
                    messages: [
                        { role: "system", content: "You are a helpful Nepali legal advisor." },
                        ...messages.map(m => ({
                            role: m.sender === 'user' ? "user" : "assistant",
                            content: m.text
                        })),
                        { role: "user", content: text }
                    ]
                })
            });

            if (!response.ok || !response.body) {
                throw new Error("Stream failed or AI server returned error.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let fullText = '';
            const botMessage = { text: '', sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);

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
                                setMessages(prev => {
                                    const last = prev.slice(0, -1);
                                    return [...last, { text: fullText, sender: 'bot' }];
                                });
                            }
                        } catch (err) {
                            console.warn("Malformed stream line skipped:", line);
                        }
                    }
                }
            }

            setIsGenerating(false);
            setResponseTime(Date.now() - startTime);
        } catch (err) {
            console.error(err);
            setIsGenerating(false);
            setMessages(prev => [...prev, { text: "⚠️ Error connecting to local AI server.", sender: 'bot' }]);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (el) {
                el.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (!scrollRef.current || !messages.length) return;
        if (isGenerating && shouldAutoScroll.current) {
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
        scrollRef
    };
};

export default useChat;
