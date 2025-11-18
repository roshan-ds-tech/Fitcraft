import React, { useState, useMemo } from 'react';

// --- Mock Food Database ---
const COMMON_FOODS: FoodItem[] = [
    { id: 1, name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { id: 2, name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { id: 3, name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: 4, name: 'Brown Rice (1 cup cooked)', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
    { id: 5, name: 'Broccoli (1 cup)', calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
    { id: 6, name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
    { id: 7, name: 'Whole Egg', calories: 78, protein: 6, carbs: 0.6, fat: 5 },
    { id: 8, name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14 },
    { id: 9, name: 'Oats (1/2 cup dry)', calories: 150, protein: 5, carbs: 27, fat: 2.5 },
    { id: 10, name: 'Greek Yogurt (1 cup)', calories: 100, protein: 17, carbs: 6, fat: 0.4 },
];

// --- Type Definitions ---
interface FoodItem {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}
type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';
type Meals = Record<MealType, FoodItem[]>;

// --- Add Food Modal Component ---
const AddFoodModal = ({ isOpen, onClose, onAddFood, mealType, customFoods }: any) => {
    const [food, setFood] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<FoodItem[]>([]);

    const combinedFoodList = useMemo(() => {
        const allFoods = [...COMMON_FOODS, ...customFoods];
        const uniqueFoods = new Map<string, FoodItem>();
        allFoods.forEach(item => uniqueFoods.set(item.name.toLowerCase(), item));
        return Array.from(uniqueFoods.values());
    }, [customFoods]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setFood(prev => ({ ...prev, name: query }));
        if (query.length > 1) {
            setSearchResults(
                combinedFoodList.filter(item =>
                    item.name.toLowerCase().includes(query.toLowerCase())
                )
            );
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectFood = (selectedFood: FoodItem) => {
        setFood({
            name: selectedFood.name,
            calories: String(selectedFood.calories),
            protein: String(selectedFood.protein),
            carbs: String(selectedFood.carbs),
            fat: String(selectedFood.fat),
        });
        setSearchQuery(selectedFood.name);
        setSearchResults([]);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFood(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!food.name || !food.calories) {
            alert("Please provide at least a name and calorie count.");
            return;
        }
        const newFood: FoodItem = {
            id: Date.now(),
            name: food.name,
            calories: parseFloat(food.calories) || 0,
            protein: parseFloat(food.protein) || 0,
            carbs: parseFloat(food.carbs) || 0,
            fat: parseFloat(food.fat) || 0,
        };
        onAddFood(mealType, newFood);
        resetForm();
    };

    const resetForm = () => {
        setFood({ name: '', calories: '', protein: '', carbs: '', fat: '' });
        setSearchQuery('');
        setSearchResults([]);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in" onClick={resetForm}>
            <div className="card-elevated p-6 w-full max-w-sm animate-scale-in" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-title text-white capitalize">Add to {mealType}</h2>
                    <button 
                        onClick={resetForm} 
                        className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200" 
                        aria-label="Close"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="foodName" className="block text-caption mb-2 text-gray-300">Food / Meal</label>
                        <input
                            id="foodName"
                            type="text"
                            name="name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search or enter custom food..."
                            className="input-outlined w-full"
                            autoComplete="off"
                        />
                        {searchResults.length > 0 && (
                            <ul className="absolute z-10 w-full card-elevated mt-2 max-h-40 overflow-y-auto">
                                {searchResults.map(item => (
                                    <li 
                                        key={item.id} 
                                        onClick={() => handleSelectFood(item)} 
                                        className="px-4 py-3 hover:bg-white/10 cursor-pointer text-gray-300 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="calories" className="block text-caption mb-2 text-gray-300">Calories</label>
                            <input 
                                type="number" 
                                id="calories" 
                                name="calories" 
                                placeholder="kcal" 
                                value={food.calories} 
                                onChange={handleChange} 
                                className="input-outlined w-full" 
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="protein" className="block text-caption mb-2 text-gray-300">Protein</label>
                            <input 
                                type="number" 
                                id="protein" 
                                name="protein" 
                                placeholder="grams" 
                                value={food.protein} 
                                onChange={handleChange} 
                                className="input-outlined w-full" 
                            />
                        </div>
                        <div>
                            <label htmlFor="carbs" className="block text-caption mb-2 text-gray-300">Carbs</label>
                            <input 
                                type="number" 
                                id="carbs" 
                                name="carbs" 
                                placeholder="grams" 
                                value={food.carbs} 
                                onChange={handleChange} 
                                className="input-outlined w-full" 
                            />
                        </div>
                        <div>
                            <label htmlFor="fat" className="block text-caption mb-2 text-gray-300">Fat</label>
                            <input 
                                type="number" 
                                id="fat" 
                                name="fat" 
                                placeholder="grams" 
                                value={food.fat} 
                                onChange={handleChange} 
                                className="input-outlined w-full" 
                            />
                        </div>
                    </div>
                    <div className="pt-2 flex gap-4">
                        <button 
                            type="button" 
                            onClick={resetForm} 
                            className="btn-secondary flex-1"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn-primary flex-1 flex items-center justify-center gap-2 group"
                        >
                            <span>Log Food</span>
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


// --- Main Screen Component ---
const NutritionScreen: React.FC = () => {
    const [calorieGoal] = useState<number>(2500);
    const [meals, setMeals] = useState<Meals>({ breakfast: [], lunch: [], dinner: [], snacks: [] });
    const [customFoods, setCustomFoods] = useState<FoodItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMealType, setCurrentMealType] = useState<MealType>('breakfast');
    const [expandedMeal, setExpandedMeal] = useState<MealType | null>('breakfast');
    
    const totals = useMemo(() => {
        let calories = 0, protein = 0, carbs = 0, fat = 0;
        Object.values(meals).flat().forEach((food: FoodItem) => {
            calories += food.calories;
            protein += food.protein;
            carbs += food.carbs;
            fat += food.fat;
        });
        return { calories, protein, carbs, fat };
    }, [meals]);

    const openModal = (mealType: MealType) => {
        setCurrentMealType(mealType);
        setIsModalOpen(true);
    };

    const handleAddFood = (mealType: MealType, food: FoodItem) => {
        setMeals(prev => ({...prev, [mealType]: [...prev[mealType], food]}));

        const isCommonFood = COMMON_FOODS.some(commonFood => commonFood.name.toLowerCase() === food.name.toLowerCase());
        const isAlreadyCustom = customFoods.some(customFood => customFood.name.toLowerCase() === food.name.toLowerCase());

        if (!isCommonFood && !isAlreadyCustom && food.name.trim() !== '') {
            setCustomFoods(prev => [...prev, food]);
        }
    };

    const toggleMealExpansion = (mealType: MealType) => {
        setExpandedMeal(prev => prev === mealType ? null : mealType);
    };

    const progress = Math.min((totals.calories / calorieGoal) * 100, 100);
    const circumference = 2 * Math.PI * 54;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const mealIcons = {
        breakfast: 'bakery_dining',
        lunch: 'lunch_dining',
        dinner: 'dinner_dining',
        snacks: 'icecream',
    };

    const macros = [
        { label: 'Protein', value: totals.protein, color: 'from-blue-500 to-cyan-400', unit: 'g' },
        { label: 'Carbs', value: totals.carbs, color: 'from-green-500 to-emerald-400', unit: 'g' },
        { label: 'Fat', value: totals.fat, color: 'from-yellow-500 to-orange-400', unit: 'g' },
    ];

    return (
        <>
        <div className="p-4 sm:p-6 pb-32 space-y-6">
            {/* Header */}
            <header className="mb-4 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-400 shadow-lg shadow-orange-500/30">
                        <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            restaurant_menu
                        </span>
                    </div>
                    <div>
                        <h1 className="text-headline text-white">Nutrition</h1>
                        <p className="text-caption">Track your daily intake</p>
                    </div>
                </div>
            </header>

            {/* Daily Progress */}
            <div className="card-elevated p-6 animate-fade-in-up delay-200">
                <h2 className="text-title text-white mb-6 text-center">Today's Progress</h2>
                <div className="flex items-center justify-between mb-6">
                    <div className="relative flex items-center justify-center w-36 h-36">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                            <circle 
                                className="text-input-border-dark" 
                                strokeWidth="12" 
                                stroke="currentColor" 
                                fill="transparent" 
                                r="54" 
                                cx="60" 
                                cy="60" 
                            />
                            <circle 
                                className="text-orange-400" 
                                strokeWidth="12" 
                                strokeDasharray={circumference} 
                                strokeDashoffset={strokeDashoffset} 
                                strokeLinecap="round" 
                                stroke="currentColor" 
                                fill="transparent" 
                                r="54" 
                                cx="60" 
                                cy="60"
                            />
                        </svg>
                        <div className="absolute text-center">
                            <p className="text-3xl font-bold text-white">{Math.round(totals.calories)}</p>
                            <p className="text-sm text-gray-400">/ {calorieGoal} kcal</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {macros.map((macro, index) => (
                            <div key={macro.label} className="text-right animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                                <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br ${macro.color} mb-1 shadow-lg`}>
                                    <span className="text-white font-bold text-sm">{Math.round(macro.value)}{macro.unit}</span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium">{macro.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Meal Logging */}
            <div className="space-y-4">
                {(Object.keys(meals) as MealType[]).map((mealType, index) => (
                    <div 
                        key={mealType} 
                        className="card-elevated overflow-hidden animate-fade-in-up"
                        style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                    >
                        <button 
                            onClick={() => toggleMealExpansion(mealType)} 
                            className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-400/20">
                                    <span className="material-symbols-outlined text-orange-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        {mealIcons[mealType]}
                                    </span>
                                </div>
                                <div className="text-left">
                                    <h3 className="text-lg font-bold capitalize text-white">{mealType}</h3>
                                    <p className="text-xs text-gray-400">
                                        {meals[mealType].length} {meals[mealType].length === 1 ? 'item' : 'items'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-base font-bold text-orange-400">
                                    {Math.round(meals[mealType].reduce((sum, item) => sum + item.calories, 0))} kcal
                                </p>
                                <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${expandedMeal === mealType ? 'rotate-180' : ''}`}>
                                    expand_more
                                </span>
                            </div>
                        </button>
                        {expandedMeal === mealType && (
                            <div className="p-5 border-t border-white/10 animate-fade-in">
                                {meals[mealType].length === 0 ? (
                                    <p className="text-gray-500 text-center py-6">No food logged yet.</p>
                                ) : (
                                    <ul className="space-y-3 mb-4">
                                        {meals[mealType].map(food => (
                                    <li 
                                        key={food.id} 
                                        className="card-flat p-4 flex justify-between items-center"
                                    >
                                        <span className="text-gray-300 font-medium">{food.name}</span>
                                        <span className="text-orange-400 font-bold">{food.calories} kcal</span>
                                    </li>
                                        ))}
                                    </ul>
                                )}
                                <button 
                                    onClick={() => openModal(mealType)} 
                                    className="btn-secondary w-full flex items-center justify-center gap-2 border-dashed"
                                >
                                    <span className="material-symbols-outlined">add</span>
                                    Add Food
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Statistics Section */}
            <div className="mt-8">
                {/* Header */}
                <header className="mb-8 animate-fade-in-up">
                    <h1 className="text-headline text-white mb-1">Statistics</h1>
                    <p className="text-caption">Track your fitness progress</p>
                </header>

                {/* Stats Grid - NEW CARD STYLES */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                        { label: 'Total Workouts', value: '127', icon: 'fitness_center', color: 'from-orange-500 to-yellow-400', change: '+12%' },
                        { label: 'Calories Burned', value: '24,580', icon: 'local_fire_department', color: 'from-red-500 to-orange-500', change: '+8%' },
                        { label: 'Active Days', value: '18', icon: 'calendar_today', color: 'from-blue-500 to-cyan-400', change: '+5%' },
                        { label: 'Streak', value: '7 days', icon: 'whatshot', color: 'from-yellow-500 to-orange-500', change: '🔥' },
                    ].map((stat, index) => (
                        <div 
                            key={stat.label}
                            className="card-elevated p-6 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} mb-4 elevation-3`}>
                                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {stat.icon}
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                            <p className="text-caption mb-3">{stat.label}</p>
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-semibold text-orange-400">{stat.change}</span>
                                <span className="text-xs text-gray-500">vs last week</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Weekly Activity Chart - NEW CARD STYLE */}
                <div className="card-elevated p-6 mb-8 animate-fade-in-up delay-300">
                    <h2 className="text-title text-white mb-6">Weekly Activity</h2>
                    <div className="flex items-end justify-between gap-2 h-48">
                        {[
                            { day: 'Mon', value: 65, color: 'bg-orange-500' },
                            { day: 'Tue', value: 80, color: 'bg-orange-500' },
                            { day: 'Wed', value: 45, color: 'bg-orange-500' },
                            { day: 'Thu', value: 90, color: 'bg-yellow-400' },
                            { day: 'Fri', value: 70, color: 'bg-orange-500' },
                            { day: 'Sat', value: 85, color: 'bg-yellow-400' },
                            { day: 'Sun', value: 60, color: 'bg-orange-500' },
                        ].map((day, index) => {
                            const maxValue = 90;
                            return (
                                <div key={day.day} className="flex-1 flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: `${(index + 4) * 0.1}s` }}>
                                    <div className="relative w-full flex items-end justify-center h-40">
                                        <div 
                                            className={`w-full ${day.color} rounded-t-2xl transition-all duration-500 hover:opacity-80 cursor-pointer elevation-2`}
                                            style={{ 
                                                height: `${(day.value / maxValue) * 100}%`,
                                                minHeight: '8px'
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400">{day.day}</span>
                                    <span className="text-xs text-orange-400 font-bold">{day.value}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Achievements - NEW CARD STYLES */}
                <div className="card-elevated p-6 animate-fade-in-up delay-400">
                    <h2 className="text-title text-white mb-5">Recent Achievements</h2>
                    <div className="space-y-3">
                        {[
                            { icon: 'emoji_events', title: 'Week Warrior', desc: '7 days in a row', color: 'from-yellow-400 to-orange-500' },
                            { icon: 'local_fire_department', title: 'Calorie Crusher', desc: 'Burned 5k calories', color: 'from-red-500 to-orange-500' },
                            { icon: 'speed', title: 'Speed Demon', desc: 'New 5k PR', color: 'from-blue-500 to-cyan-400' },
                        ].map((achievement, index) => (
                            <div 
                                key={achievement.title}
                                className="card-flat p-4 animate-fade-in-up hover:border-orange-500/30"
                                style={{ animationDelay: `${(index + 8) * 0.1}s` }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${achievement.color} elevation-3`}>
                                        <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            {achievement.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-white text-base mb-1">{achievement.title}</p>
                                        <p className="text-caption">{achievement.desc}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-orange-400">chevron_right</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <AddFoodModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddFood={handleAddFood} mealType={currentMealType} customFoods={customFoods} />
        </>
    );
};

export default NutritionScreen;
