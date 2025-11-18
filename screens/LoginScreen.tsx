import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CURRENT_USER_KEY = 'fitcraftCurrentUser';

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            localStorage.setItem(CURRENT_USER_KEY, email.toLowerCase());
        }
        navigate('/app/feed');
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col font-display bg-background-dark text-white overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-orange-600/30 to-yellow-500/20 blur-3xl animate-float"></div>
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-tl from-orange-500/30 to-yellow-400/20 blur-3xl animate-float delay-300"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 relative z-10">
                <div className="w-full max-w-md space-y-10 animate-fade-in-up">
                    {/* Header */}
                    <div className="text-center animate-scale-in delay-200">
                        <div className="relative inline-block mb-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-3xl blur-xl opacity-50"></div>
                            <div className="relative flex items-center justify-center h-24 w-24 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-3xl elevation-4">
                                <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                                    directions_run
                                </span>
                            </div>
                        </div>
                        <h1 className="text-headline text-white mb-3">Welcome Back</h1>
                        <p className="text-caption">Sign in to continue your fitness journey</p>
                    </div>

                    {/* Form - NEW INPUT STYLES */}
                    <form onSubmit={handleLogin} className="space-y-6 animate-fade-in-up delay-300">
                        <div className="input-container">
                            <span className="input-icon material-symbols-outlined">mail</span>
                            <input
                                className="input-floating"
                                id="email"
                                placeholder=" "
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email" className="input-label">Email Address</label>
                        </div>

                        <div className="input-container">
                            <span className="input-icon material-symbols-outlined">lock</span>
                            <input
                                className="input-floating"
                                id="password"
                                placeholder=" "
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password" className="input-label">Password</label>
                        </div>

                        {/* Submit Button - NEW STYLE */}
                        <button
                            className="btn-primary w-full flex items-center justify-center gap-3 group mt-8"
                            type="submit"
                        >
                            <span>Login</span>
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform duration-300">
                                arrow_forward
                            </span>
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center animate-fade-in delay-400">
                        <p className="text-caption">
                            Don't have an account?{' '}
                            <button 
                                onClick={() => navigate('/signup')} 
                                className="text-orange-400 hover:text-yellow-400 hover:underline transition-colors duration-200 bg-transparent border-none font-semibold"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
