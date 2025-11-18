import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
    const navItems = [
        { path: 'feed', icon: 'home', label: 'Home' },
        { path: 'messages', icon: 'forum', label: 'Messages' },
        { path: 'nutrition', icon: 'restaurant_menu', label: 'Nutrition' },
        { path: 'profile', icon: 'account_circle', label: 'Profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 card-elevated max-w-md mx-auto rounded-t-3xl px-4 py-3 z-50 border-t-0">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={`/app/${item.path}`}
                        className={({ isActive }) => 
                            `relative flex flex-col items-center justify-center transition-all duration-300 rounded-2xl px-4 py-2 group ${
                                isActive 
                                    ? 'text-orange-400' 
                                    : 'text-gray-400 hover:text-gray-300'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-400/10 rounded-2xl blur-sm"></div>
                                )}
                                <span 
                                    className={`relative material-symbols-outlined text-3xl mb-1 transition-all duration-300 ${
                                        isActive 
                                            ? 'scale-110' 
                                            : 'group-hover:scale-105'
                                    }`}
                                    style={isActive ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : {}}
                                >
                                    {item.icon}
                                </span>
                                <span className={`relative text-xs font-bold transition-all duration-300 ${
                                    isActive ? 'scale-105' : ''
                                }`}>
                                    {item.label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
