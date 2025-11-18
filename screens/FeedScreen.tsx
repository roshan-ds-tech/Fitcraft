import React, { useEffect, useRef, useState } from 'react';

const LogWorkoutModal = ({ isOpen, onClose, onLog }: any) => {
    if (!isOpen) return null;

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLog();
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-[70] p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="log-workout-title"
        >
            <div
                className="card-elevated p-6 w-full max-w-sm animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 id="log-workout-title" className="text-title text-white">Log a Workout</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200" 
                        aria-label="Close"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="workoutType" className="block text-caption mb-2 text-gray-300">Workout Type</label>
                        <div className="relative">
                            <select 
                                id="workoutType" 
                                name="workoutType" 
                                className="input-outlined w-full pr-10 appearance-none cursor-pointer"
                            >
                                <option className="bg-input-bg-dark">Running</option>
                                <option className="bg-input-bg-dark">Weightlifting</option>
                                <option className="bg-input-bg-dark">Cycling</option>
                                <option className="bg-input-bg-dark">Yoga</option>
                                <option className="bg-input-bg-dark">Swimming</option>
                                <option className="bg-input-bg-dark">Other</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                expand_more
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="duration" className="block text-caption mb-2 text-gray-300">Duration</label>
                            <input 
                                type="number" 
                                id="duration" 
                                name="duration" 
                                placeholder="45 min" 
                                className="input-outlined w-full" 
                            />
                        </div>
                        <div>
                            <label htmlFor="calories" className="block text-caption mb-2 text-gray-300">Calories</label>
                            <input 
                                type="number" 
                                id="calories" 
                                name="calories" 
                                placeholder="350" 
                                className="input-outlined w-full" 
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-caption mb-2 text-gray-300">Notes (optional)</label>
                        <textarea 
                            id="notes" 
                            name="notes" 
                            rows={3} 
                            placeholder="How did it feel?" 
                            className="input-outlined w-full resize-none"
                        ></textarea>
                    </div>
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="btn-primary w-full flex items-center justify-center gap-2 group"
                        >
                            <span>Log Workout</span>
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform duration-300">
                                check_circle
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CreatePostModal = ({ isOpen, onClose, onCreate }: any) => {
    const [caption, setCaption] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isOpen) {
            setCaption('');
            setHashtags('');
            setImagePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setImagePreview(null);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setImagePreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!imagePreview || !caption.trim()) {
            alert('Please add an image and caption to post.');
            return;
        }

        const formattedHashtags = hashtags
            .split(/[\s,]+/)
            .filter(Boolean)
            .map(tag => (tag.startsWith('#') ? tag : `#${tag}`));

        onCreate({
            caption: caption.trim(),
            hashtags: formattedHashtags,
            image: imagePreview,
        });
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-[60] p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-post-title"
        >
            <div
                className="card-elevated p-6 w-full max-w-sm animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 id="create-post-title" className="text-title text-white">Create Post</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200" 
                        aria-label="Close"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-3">
                        <label htmlFor="postImage" className="block text-caption mb-1 text-gray-300">Upload Photo</label>
                        <div
                            className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                                imagePreview ? 'border-orange-400 bg-white/5' : 'border-white/20 hover:border-orange-400/60'
                            }`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                                    <p className="text-sm">Tap to upload a workout snapshot</p>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            id="postImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="caption" className="block text-caption mb-2 text-gray-300">Caption</label>
                        <textarea 
                            id="caption" 
                            name="caption" 
                            rows={3} 
                            placeholder="Share your workout story..."
                            className="input-outlined w-full resize-none"
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="hashtags" className="block text-caption mb-2 text-gray-300">Hashtags</label>
                        <input 
                            id="hashtags"
                            name="hashtags"
                            placeholder="#fitness #fitcraft"
                            className="input-outlined w-full"
                            value={hashtags}
                            onChange={e => setHashtags(e.target.value)}
                        />
                    </div>
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="btn-primary w-full flex items-center justify-center gap-2 group"
                        >
                            <span>Post to Feed</span>
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform duration-300">
                                send
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const initialPosts = [
    {
        id: 1,
        author: 'Roshan DS',
        avatar: '/WhatsApp Image 2025-11-11 at 01.33.52.jpeg',
        timestamp: '2h ago',
        content: 'Crushed my morning 5k run! Feeling energized and ready to tackle the day. Setting new personal records! 🏃‍♂️💨 #cardio #running #fitnessgoals',
        image: '/WhatsApp Image 2025-11-11 at 01.32.52.jpeg',
        stats: [
            { icon: 'directions_run', label: 'Distance', value: '5.02 km' },
            { icon: 'timer', label: 'Time', value: '24:15' }
        ],
        likes: 12,
        comments: 5,
        isLiked: false
    },
    {
        id: 2,
        author: 'Darshan DS',
        avatar: '/WhatsApp Image 2025-11-11 at 01.33.52.jpeg',
        timestamp: 'Yesterday',
        content: 'New PR on deadlifts today! So proud of the progress. Consistency is key. #gymlife #strengthtraining',
        image: '/WhatsApp Image 2025-11-11 at 01.41.34.jpeg',
        likes: 78,
        comments: 12,
        isLiked: true
    }
];

const recentWorkouts = [
    { id: 1, type: 'Morning Run', icon: 'directions_run', duration: '30 min', date: 'Today' },
    { id: 2, type: 'Full Body Strength', icon: 'fitness_center', style: { fontVariationSettings: "'FILL' 1" }, duration: '1 hour', date: 'Yesterday' },
    { id: 3, type: 'Evening Yoga', icon: 'self_improvement', duration: '45 min', date: '2 days ago' },
];

const FeedScreen: React.FC = () => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
    
    // Get current user email from localStorage
    const currentUserEmail = localStorage.getItem('fitcraftCurrentUser') || '';
    const currentUserProfileImage = localStorage.getItem(`fitcraftProfileImage_${currentUserEmail}`) || '/WhatsApp Image 2025-11-11 at 01.34.40.jpeg';
    
    const currentUser = {
        name: currentUserEmail ? currentUserEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ') || 'User' : 'Roshan DS',
        avatar: currentUserProfileImage,
    };

    // Load user's posts from localStorage
    const loadUserPosts = (email: string): any[] => {
        if (!email) return [];
        try {
            const saved = localStorage.getItem(`fitcraftPosts_${email}`);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    };

    // Save posts to localStorage
    const saveUserPosts = (postsToSave: any[], email: string) => {
        if (!email) return;
        try {
            localStorage.setItem(`fitcraftPosts_${email}`, JSON.stringify(postsToSave));
        } catch (error) {
            console.error('Failed to save posts:', error);
        }
    };

    // Initialize posts: merge initial posts with user's saved posts
    const [posts, setPosts] = useState(() => {
        const userPosts = loadUserPosts(currentUserEmail);
        // Merge user posts with initial posts, avoiding duplicates
        const allPosts = [...userPosts, ...initialPosts];
        // Remove duplicates based on id
        const uniquePosts = Array.from(
            new Map(allPosts.map(post => [post.id, post])).values()
        );
        return uniquePosts;
    });

    // Reload posts when user changes
    useEffect(() => {
        const userPosts = loadUserPosts(currentUserEmail);
        const allPosts = [...userPosts, ...initialPosts];
        const uniquePosts = Array.from(
            new Map(allPosts.map(post => [post.id, post])).values()
        );
        setPosts(uniquePosts);
    }, [currentUserEmail]);

    // Save user-created posts whenever they change
    useEffect(() => {
        if (currentUserEmail) {
            // Save all posts that belong to the current user
            const userCreatedPosts = posts.filter(post => post.author === currentUser.name);
            if (userCreatedPosts.length > 0) {
                saveUserPosts(userCreatedPosts, currentUserEmail);
            }
        }
    }, [posts, currentUserEmail, currentUser.name]);

    const handleCreatePost = (data: { caption: string; hashtags: string[]; image: string }) => {
        const newPost = {
            id: Date.now(),
            author: currentUser.name,
            avatar: currentUser.avatar,
            timestamp: 'Just now',
            content: data.caption,
            image: data.image,
            hashtags: data.hashtags,
            likes: 0,
            comments: 0,
            isLiked: false,
        };
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        setIsPostModalOpen(false);
    };

    const handleLikeToggle = (postId: number) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    const handleComment = () => {
        alert('Comment functionality is coming soon!');
    };

    return (
        <>
            <div className="p-5 sm:p-6 pb-32">
                {/* Header - NEW STYLE */}
                <header className="flex justify-between items-center mb-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-headline text-white mb-1">Feed</h1>
                        <p className="text-caption">Stay motivated with your community</p>
                    </div>
                    <button 
                        onClick={() => setIsWorkoutModalOpen(true)} 
                        className="btn-pill bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center gap-2 px-4"
                        aria-label="Log a new workout"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                        <span className="font-bold">Log</span>
                    </button>
                </header>

                {/* Posts - NEW CARD STYLES */}
                <div className="space-y-6">
                    {posts.map((post, index) => (
                        post.image ? (
                            <div 
                                key={post.id} 
                                className="card-elevated overflow-hidden animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="relative">
                                    <img 
                                        alt="Workout post" 
                                        className="w-full h-80 object-cover" 
                                        src={post.image} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="mr-3">
                                            <div className="relative w-12 h-12">
                                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/50 to-yellow-400/50 rounded-full blur-md"></div>
                                                <img 
                                                    alt="User avatar" 
                                                    className="relative w-12 h-12 rounded-full border-2 border-white/30 object-cover object-center shadow-lg" 
                                                    src={post.avatar} 
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-base">{post.author}</p>
                                            <p className="text-xs text-gray-300">{post.timestamp}</p>
                                        </div>
                                    </div>
                                    <p className="text-white mb-3 text-body leading-relaxed whitespace-pre-line">{post.content}</p>
                                    {post.hashtags?.length ? (
                                        <div className="flex flex-wrap gap-2 text-sm text-orange-300 font-semibold mb-4">
                                            {post.hashtags.map(tag => (
                                                <span key={`${post.id}-${tag}`}>{tag}</span>
                                            ))}
                                        </div>
                                    ) : null}
                                    {post.stats && (
                                        <div className="grid grid-cols-2 gap-3 mb-5">
                                            {post.stats.map(stat => (
                                                <div 
                                                    key={stat.label} 
                                                    className="card-flat p-4"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-400/20">
                                                            <span className="material-symbols-outlined text-orange-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                                {stat.icon}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                                                            <p className="font-bold text-white text-sm">{stat.value}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-6 text-white pt-4 border-t border-white/10">
                                        <button 
                                            onClick={() => handleLikeToggle(post.id)} 
                                            className={`flex items-center gap-2 transition-all duration-300 hover:scale-110 ${post.isLiked ? 'text-red-500' : 'text-white hover:text-red-400'}`}
                                        >
                                            <span 
                                                className="material-symbols-outlined text-2xl transition-transform duration-300" 
                                                style={{ fontVariationSettings: post.isLiked ? "'FILL' 1" : "", transform: post.isLiked ? 'scale(1.2)' : 'scale(1)' }}
                                            >
                                                {post.isLiked ? 'favorite' : 'favorite_border'}
                                            </span>
                                            <span className="font-semibold">{post.likes}</span>
                                        </button>
                                        <button 
                                            onClick={handleComment} 
                                            className="flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:text-orange-400"
                                        >
                                            <span className="material-symbols-outlined text-2xl">chat_bubble_outline</span>
                                            <span className="font-semibold">{post.comments}</span>
                                        </button>
                                        <button className="flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:text-orange-400">
                                            <span className="material-symbols-outlined text-2xl">share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div 
                                key={post.id} 
                                className="card-elevated p-6 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="mr-3">
                                        <div className="relative w-12 h-12">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/50 to-yellow-400/50 rounded-full blur-md"></div>
                                            <img 
                                                alt="User avatar" 
                                                className="relative w-12 h-12 rounded-full border-2 border-white/30 object-cover object-center shadow-lg" 
                                                src={post.avatar} 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-base">{post.author}</p>
                                        <p className="text-xs text-gray-400">{post.timestamp}</p>
                                    </div>
                                </div>
                                <p className="mb-3 text-gray-300 text-body leading-relaxed whitespace-pre-line">{post.content}</p>
                                {post.hashtags?.length ? (
                                    <div className="flex flex-wrap gap-2 text-sm text-orange-300 font-semibold mb-4">
                                        {post.hashtags.map(tag => (
                                            <span key={`${post.id}-${tag}`}>{tag}</span>
                                        ))}
                                    </div>
                                ) : null}
                                {post.stats && (
                                    <div className="grid grid-cols-2 gap-3 mb-5">
                                        {post.stats.map(stat => (
                                            <div 
                                                key={stat.label} 
                                                className="card-flat p-4"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-400/20">
                                                        <span className="material-symbols-outlined text-orange-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                            {stat.icon}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                                                        <p className="font-bold text-white text-sm">{stat.value}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                    <div className="flex items-center gap-6 text-gray-400">
                                        <button 
                                            onClick={() => handleLikeToggle(post.id)} 
                                            className={`flex items-center gap-2 transition-all duration-300 hover:scale-110 ${post.isLiked ? 'text-red-500' : 'hover:text-orange-400'}`}
                                        >
                                            <span 
                                                className="material-symbols-outlined text-2xl transition-transform duration-300" 
                                                style={{ fontVariationSettings: post.isLiked ? "'FILL' 1" : "", transform: post.isLiked ? 'scale(1.2)' : 'scale(1)' }}
                                            >
                                                {post.isLiked ? 'favorite' : 'favorite_border'}
                                            </span>
                                            <span className="font-semibold">{post.likes}</span>
                                        </button>
                                        <button 
                                            onClick={handleComment} 
                                            className="flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:text-orange-400"
                                        >
                                            <span className="material-symbols-outlined text-2xl">chat_bubble_outline</span>
                                            <span className="font-semibold">{post.comments}</span>
                                        </button>
                                    </div>
                                    <button className="text-gray-400 transition-all duration-300 hover:scale-110 hover:text-orange-400">
                                        <span className="material-symbols-outlined text-2xl">share</span>
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                </div>

                {/* Recent Workouts - NEW CARD STYLES */}
                <div className="mt-10 animate-fade-in-up delay-300">
                    <h2 className="text-title text-white mb-6">Your Recent Workouts</h2>
                    <div className="space-y-4">
                        {recentWorkouts.map((workout, index) => (
                            <div 
                                key={workout.id} 
                                className="card-elevated p-5 animate-fade-in-up"
                                style={{ animationDelay: `${(index + posts.length) * 0.1}s` }}
                            >
                                <div className="flex items-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-400 mr-4 shrink-0 elevation-3">
                                        <span 
                                            className="material-symbols-outlined text-white text-3xl" 
                                            style={workout.style}
                                        >
                                            {workout.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-white text-base mb-1">{workout.type}</p>
                                        <p className="text-caption">{workout.duration}</p>
                                    </div>
                                    <p className="text-caption shrink-0 font-medium">{workout.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button
                onClick={() => setIsPostModalOpen(true)}
                aria-label="Create new post"
                className="fixed bottom-28 right-6 z-40 md:right-[calc(50%-180px)] btn-floating w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-400 shadow-xl shadow-orange-500/40 hover:scale-105 transition-transform"
            >
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                    add
                </span>
            </button>
            <CreatePostModal 
                isOpen={isPostModalOpen} 
                onClose={() => setIsPostModalOpen(false)} 
                onCreate={handleCreatePost} 
            />
            <LogWorkoutModal
                isOpen={isWorkoutModalOpen}
                onClose={() => setIsWorkoutModalOpen(false)}
                onLog={() => {
                    console.log('Workout logged!');
                    setIsWorkoutModalOpen(false);
                }}
            />
        </>
    );
};

export default FeedScreen;
