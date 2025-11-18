import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CURRENT_USER_KEY = 'fitcraftCurrentUser';

const SignUpScreen: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSignUp = (e: React.MouseEvent) => {
        e.preventDefault();
        if (formData.email) {
            localStorage.setItem(CURRENT_USER_KEY, formData.email.toLowerCase());
        }
        navigate('/app/feed');
    };

    return (
        <div className="font-sans bg-background-dark text-text-dark min-h-screen overflow-x-hidden">
            <div className="relative flex min-h-screen w-full flex-col items-center p-6">
                {/* Animated background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute bottom-0 left-[-20%] right-[-20%] top-[-10%] h-[500px] w-[140%] rounded-full bg-gradient-to-r from-orange-600/50 to-yellow-400/30 blur-[150px] animate-float"></div>
                    <div className="absolute bottom-[-10%] left-[20%] right-[-10%] top-[30%] h-[500px] w-[100%] rounded-full bg-gradient-to-r from-yellow-500/40 to-orange-500/20 blur-[120px] -rotate-12 animate-float delay-300"></div>
                </div>

                {/* Scrollable content */}
                <div className="w-full max-w-md mx-auto py-8 relative z-10 animate-fade-in-up">
                    {/* Header */}
                    <div className="text-center mb-10 animate-scale-in delay-200">
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-3xl blur-xl opacity-50"></div>
                            <div className="relative flex items-center justify-center h-20 w-20 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-3xl elevation-4">
                                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                                    directions_run
                                </span>
                            </div>
                        </div>
                        <h1 className="text-headline text-text-dark mb-2">Create Your Account</h1>
                        <p className="text-caption">Start your fitness journey today</p>
                    </div>

                    {/* Form - NEW INPUT STYLES */}
                    <div className="space-y-5 animate-fade-in-up delay-300">
                        <div className="input-container">
                            <span className="input-icon material-symbols-outlined">person</span>
                            <input
                                className={`input-floating ${formData.fullName ? 'has-value' : ''}`}
                                id="fullName"
                                placeholder=" "
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            <label htmlFor="fullName" className="input-label">Full Name</label>
                        </div>

                        <div className="input-container">
                            <span className="input-icon material-symbols-outlined">mail</span>
                            <input
                                className={`input-floating ${formData.email ? 'has-value' : ''}`}
                                id="email"
                                placeholder=" "
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="email" className="input-label">Email Address</label>
                        </div>

                        <div className="input-container">
                            <span className="input-icon material-symbols-outlined">lock</span>
                            <input
                                className={`input-floating ${formData.password ? 'has-value' : ''}`}
                                id="password"
                                placeholder=" "
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="password" className="input-label">Password</label>
                        </div>

                        <div className="input-container">
                            <span className="input-icon material-symbols-outlined">lock_reset</span>
                            <input
                                className={`input-floating ${formData.confirmPassword ? 'has-value' : ''}`}
                                id="confirmPassword"
                                placeholder=" "
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                        </div>

                        {/* Gender Select */}
                        <div className="input-container">
                            <span className="input-icon material-symbols-outlined">wc</span>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={`input-floating appearance-none cursor-pointer pr-10 ${formData.gender ? 'has-value' : ''}`}
                            >
                                <option value="" disabled className="bg-input-bg-dark">Select Gender</option>
                                <option value="Male" className="bg-input-bg-dark">Male</option>
                                <option value="Female" className="bg-input-bg-dark">Female</option>
                                <option value="Non-binary" className="bg-input-bg-dark">Non-binary</option>
                                <option value="Prefer not to say" className="bg-input-bg-dark">Prefer not to say</option>
                            </select>
                            
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                expand_more
                            </span>
                        </div>

                        {/* Stats Grid - NEW CARD STYLE */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="input-container">
                                <input
                                    className="input-outlined text-center"
                                    id="age"
                                    placeholder={formData.age ? "" : "Age"}
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    className="input-outlined text-center"
                                    id="height"
                                    placeholder={formData.height ? "" : "Height"}
                                    type="number"
                                    value={formData.height}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    className="input-outlined text-center"
                                    id="weight"
                                    placeholder={formData.weight ? "" : "Weight"}
                                    type="number"
                                    value={formData.weight}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button - NEW STYLE */}
                    <div className="pt-8 animate-fade-in-up delay-400">
                        <button
                            onClick={handleSignUp}
                            className="btn-primary w-full flex items-center justify-center gap-3 group"
                        >
                            <span>Create Account</span>
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform duration-300">
                                arrow_forward
                            </span>
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="pt-6 text-center animate-fade-in delay-500">
                        <p className="text-caption">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-orange-400 hover:text-yellow-400 hover:underline transition-colors duration-200 bg-transparent border-none font-semibold"
                            >
                                Log In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpScreen;
