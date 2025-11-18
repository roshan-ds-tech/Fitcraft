import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_AVATAR = '/WhatsApp Image 2025-11-11 at 01.34.40.jpeg';
const CURRENT_USER_KEY = 'fitcraftCurrentUser';

const getProfileStorageKey = (email: string) => `fitcraftProfileImage:${email}`;

const ProfileScreen: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string>(DEFAULT_AVATAR);
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem(CURRENT_USER_KEY);
        setCurrentUserEmail(email);
        if (email) {
            const storedImage = localStorage.getItem(getProfileStorageKey(email));
            if (storedImage) {
                setProfileImage(storedImage);
            }
        }
    }, []);

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setProfileImage(reader.result);
                const emailKey = currentUserEmail ?? localStorage.getItem(CURRENT_USER_KEY);
                if (emailKey) {
                    localStorage.setItem(getProfileStorageKey(emailKey), reader.result);
                }
            }
        };
        reader.readAsDataURL(file);
    };

    const triggerPhotoUpload = () => {
        fileInputRef.current?.click();
    };
    const recentWorkouts = [
        { id: 1, type: 'Morning Run', icon: 'directions_run', duration: '30 min', distance: '5.2 km', date: 'Today' },
        { id: 2, type: 'Full Body Strength', icon: 'fitness_center', style: { fontVariationSettings: "'FILL' 1" }, duration: '1.5 hours', date: 'Yesterday' },
    ];

    return (
        <div className="font-display bg-background-dark text-text-dark min-h-screen pb-32">
            {/* Header with gradient */}
            <div className="relative">
                <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-b-3xl"></div>
                <div className="relative pt-8 px-5">
                    <header className="flex justify-between items-center mb-6">
                        <button className="btn-floating w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30">
                            <span className="material-symbols-outlined text-white">chevron_left</span>
                        </button>
                        <h1 className="text-title text-white">Profile</h1>
                        <button className="btn-floating w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30">
                            <span className="material-symbols-outlined text-white">more_horiz</span>
                        </button>
                    </header>

                    {/* Profile Card */}
                    <div className="flex flex-col items-center mb-8 animate-fade-in-up">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full blur-2xl opacity-50"></div>
                            <img 
                                alt="User profile picture" 
                                className="relative h-32 w-32 rounded-full border-4 border-white/20 object-cover elevation-5" 
                                src={profileImage} 
                            />
                            <button
                                type="button"
                                onClick={triggerPhotoUpload}
                                className="absolute -bottom-1 -right-1 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background-dark bg-gradient-to-br from-orange-500 to-yellow-400 elevation-4 hover:scale-105 transition-transform"
                                aria-label="Upload profile photo"
                            >
                                <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                                    add
                                </span>
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </div>
                        <h2 className="text-headline text-white mb-1">Roshan DS</h2>
                        <p className="text-caption mb-6">@Roshan_DS_</p>
                        
                        {/* Stats */}
                        <div className="flex space-x-8 mb-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">1.2k</p>
                                <p className="text-caption">Followers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">450</p>
                                <p className="text-caption">Following</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">215</p>
                                <p className="text-caption">Workouts</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 w-full max-w-sm mb-4">
                            <button 
                                className={`flex-1 ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}
                                onClick={() => setIsFollowing(prev => !prev)}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                            <button
                                className="btn-secondary flex-1"
                                onClick={() =>
                                    navigate('/app/chat', {
                                        state: {
                                            contact: {
                                                name: 'Roshan DS',
                                                image: profileImage,
                                                status: 'Online • 2 min ago',
                                            },
                                        },
                                    })
                                }
                            >
                                Message
                            </button>
                            <button className="btn-floating w-12 h-12">
                                <span className="material-symbols-outlined text-white">person_add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="px-5 -mt-8 relative z-10">
                {/* Activity Cards */}
                <div className="mb-6 animate-fade-in-up delay-200">
                    <h3 className="text-title text-white mb-5">Activity</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="card-elevated p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 elevation-3">
                                    <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        local_fire_department
                                    </span>
                                </div>
                                <p className="font-bold text-white text-sm">Calories</p>
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">2,480</p>
                            <p className="text-caption">kcal this week</p>
                        </div>
                        <div className="card-elevated p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 elevation-3">
                                    <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        fitness_center
                                    </span>
                                </div>
                                <p className="font-bold text-white text-sm">Workouts</p>
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">5</p>
                            <p className="text-caption">sessions this week</p>
                        </div>
                    </div>
                </div>

                {/* Recent Workouts */}
                <div className="animate-fade-in-up delay-300">
                    <h3 className="text-title text-white mb-5">Recent Workouts</h3>
                    <div className="space-y-4">
                        {recentWorkouts.map((workout, index) => (
                            <div 
                                key={workout.id}
                                className="card-elevated p-5 animate-fade-in-up"
                                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                            >
                                <div className="flex items-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-400 mr-4 elevation-3">
                                        <span 
                                            className="material-symbols-outlined text-white text-3xl" 
                                            style={workout.style}
                                        >
                                            {workout.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-white text-base mb-1">{workout.type}</p>
                                        <p className="text-caption">
                                            {workout.distance ? `${workout.distance} - ` : ''}{workout.duration}
                                        </p>
                                    </div>
                                    <p className="text-caption font-medium">{workout.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileScreen;
