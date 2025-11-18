import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Conversation {
    id: number;
    name: string;
    message: string;
    time: string;
    image: string;
    isNew?: boolean;
    subtitle?: string;
    status?: string;
}

const CONVERSATIONS: Conversation[] = [
    {
        id: 1,
        name: 'Roshan DS',
        subtitle: 'Idira odra',
        message: 'Let’s sync up after lunch.',
        time: '09:31',
        image: '/WhatsApp Image 2025-11-11 at 01.33.52.jpeg',
        isNew: true,
        status: 'Online • now',
    },
    {
        id: 2,
        name: 'Prasanna',
        message: 'waste nan maga manager....',
        time: '06:53',
        image: '/Prasanna Kumar.jpg',
        status: 'Active 5m ago',
    },
    {
        id: 3,
        name: 'Hari Prasad',
        message: 'Psych anko Premu',
        time: 'Wed',
        image: '/hariprasad1.jpg',
    },
    {
        id: 4,
        name: 'Nihar',
        message: 'gadi odsak baralla roadge bartave',
        time: 'Wed',
        image: '/nihar.jpg',
    },
    {
        id: 5,
        name: 'Rishika',
        message: 'Profile picture like mado',
        time: 'Mon',
        image: '/rishika.jpg',
    },
];

const MessagesScreen: React.FC = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const filteredConversations = useMemo(() => {
        const query = search.toLowerCase();
        return CONVERSATIONS.filter(
            convo =>
                convo.name.toLowerCase().includes(query) ||
                convo.message.toLowerCase().includes(query) ||
                convo.subtitle?.toLowerCase().includes(query),
        );
    }, [search]);

    return (
        <div className="min-h-screen bg-background-dark text-white pb-28">
            {/* Gradient Hero */}
            <div className="relative">
                <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-b-3xl"></div>
                <header className="relative px-5 pt-10 pb-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn-floating w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30"
                        aria-label="Go back"
                    >
                        <span className="material-symbols-outlined text-white">chevron_left</span>
                    </button>
                    <div className="text-center">
                        <p className="text-headline text-white font-semibold">Messages</p>
                        <p className="text-caption text-white/80">Connect with your crew</p>
                    </div>
                    <button
                        onClick={() => navigate('/app/feed')}
                        className="btn-floating w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30"
                        aria-label="Go home"
                    >
                        <span className="material-symbols-outlined text-white">home</span>
                    </button>
                </header>

                {/* Search */}
                <div className="relative px-5 pb-10">
                    <div className="card-elevated bg-white/95 text-black rounded-2xl flex items-center px-4 py-3 shadow-xl">
                        <span className="material-symbols-outlined text-gray-400 mr-3">search</span>
                        <input
                            className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
                            placeholder="Search conversations"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Conversation List */}
            <div className="px-4 space-y-3 -mt-6">
                {filteredConversations.map(convo => (
                    <button
                        key={convo.id}
                        onClick={() =>
                            navigate('/app/chat', {
                                state: {
                                    contact: {
                                        name: convo.name,
                                        image: convo.image,
                                        status: convo.status ?? convo.subtitle ?? 'Active recently',
                                    },
                                },
                            })
                        }
                        className="card-elevated w-full flex items-center gap-4 p-4 rounded-3xl hover:border-orange-500/30 transition-all duration-300 text-left"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 to-yellow-400/40 rounded-full blur-md"></div>
                            <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-white/20">
                                <img src={convo.image} alt={convo.name} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-base text-white">{convo.name}</p>
                                {convo.isNew && (
                                    <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full shadow">
                                        NEW
                                    </span>
                                )}
                            </div>
                            {convo.subtitle && <p className="text-xs text-orange-300">{convo.subtitle}</p>}
                            <p className="text-sm text-gray-400 truncate">{convo.message}</p>
                        </div>
                        <div className="text-xs text-gray-500 font-semibold">{convo.time}</div>
                    </button>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-10 px-12 flex items-center justify-between text-orange-300">
                {[
                    { icon: 'forum', label: 'Chats' },
                    { icon: 'call', label: 'Call' },
                    { icon: 'stacked_bar_chart', label: 'Stats' },
                ].map(action => (
                    <button
                        key={action.icon}
                        className="flex flex-col items-center gap-2 text-sm"
                    >
                        <div className="btn-floating w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-400 text-white">
                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                                {action.icon}
                            </span>
                        </div>
                        <span className="text-xs text-gray-400">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MessagesScreen;

