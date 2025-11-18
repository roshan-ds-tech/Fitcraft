import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ChatMessage {
    id: number;
    sender: string;
    text: string;
    fromUser: boolean;
    time: string;
}

interface ContactDetails {
    name: string;
    image: string;
    status?: string;
}

const ChatScreen: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const contactState = (location.state as { contact?: ContactDetails } | undefined)?.contact;
    const defaultContact: ContactDetails = {
        name: 'Roshan DS',
        image: '/WhatsApp Image 2025-11-11 at 01.34.40.jpeg',
        status: 'Online • 2 min ago',
    };
    const activeContact = contactState ?? defaultContact;
    const [newMessage, setNewMessage] = useState('');

    const initialMessages = useMemo<ChatMessage[]>(
        () => [
            {
                id: 1,
                sender: activeContact.name,
                text: 'Hey! Ready for today’s workout?',
                fromUser: false,
                time: '10:24 AM',
            },
            {
                id: 2,
                sender: 'You',
                text: 'Absolutely, let’s crush it! 💪',
                fromUser: true,
                time: '10:25 AM',
            },
            {
                id: 3,
                sender: activeContact.name,
                text: 'Awesome! Warm-up in 10 minutes?',
                fromUser: false,
                time: '10:26 AM',
            },
        ],
        [activeContact.name],
    );

    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        if (!newMessage.trim()) return;

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const outgoingMessage: ChatMessage = {
            id: Date.now(),
            sender: 'You',
            text: newMessage.trim(),
            fromUser: true,
            time,
        };

        setMessages(prev => [...prev, outgoingMessage]);
        setNewMessage('');

        window.setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now(),
                    sender: activeContact.name,
                    text: 'Sounds good! Catch you there.',
                    fromUser: false,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
        }, 900);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-dark text-white">
            {/* Header */}
            <header className="px-5 pt-10 pb-5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-b-3xl shadow-lg shadow-orange-500/20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn-floating w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30"
                        aria-label="Go back"
                    >
                        <span className="material-symbols-outlined text-white">chevron_left</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full border-2 border-white/40 overflow-hidden">
                            <img
                                src={activeContact.image}
                                alt={activeContact.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{activeContact.name}</p>
                            <p className="text-xs text-white/80">{activeContact.status ?? 'Active now'}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={`flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${
                                message.fromUser
                                    ? 'bg-gradient-to-br from-orange-500 to-yellow-400 text-white rounded-br-none'
                                    : 'bg-white/10 text-white rounded-bl-none backdrop-blur-sm border border-white/10'
                            }`}
                        >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-[10px] text-white/70 text-right mt-2">{message.time}</p>
                        </div>
                    </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>

            {/* Input */}
            <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-white/10 bg-background-dark flex items-center gap-3"
            >
                <input
                    className="flex-1 input-outlined bg-transparent"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={event => setNewMessage(event.target.value)}
                />
                <button type="submit" className="btn-primary flex items-center gap-2 px-5 py-3">
                    <span>Send</span>
                    <span className="material-symbols-outlined text-white text-base">send</span>
                </button>
            </form>
        </div>
    );
};

export default ChatScreen;

