import { useState } from 'react';
import type { Food, DietPlan } from '../types';

interface DietPageProps {
  user?: User;
  onLogin?: (user: User) => void;
}

const DietPage: React.FC<DietPageProps> = ({ user, onLogin }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'protein' | 'carbs' | 'fats' | 'vegetables' | 'fruits' | 'other'>('all');
  const [dailyCalories, setDailyCalories] = useState(2500);
  // Mock food database
  const foods: Food[] = [
    { id: '1', name: 'Chicken Breast', category: 'protein', caloriesPerServing: 165, servingSize: '100g', protein: 31, carbs: 0, fats: 3.6, description: 'Lean protein source, great for muscle building' },
    { id: '2', name: 'Salmon', category: 'protein', caloriesPerServing: 208, servingSize: '100g', protein: 22, carbs: 0, fats: 13, description: 'Rich in omega-3 fatty acids' },
    { id: '3', name: 'Brown Rice', category: 'carbs', caloriesPerServing: 111, servingSize: '100g', protein: 2.6, carbs: 23, fats: 0.9, description: 'Complex carbs for sustained energy' },
    { id: '4', name: 'Oatmeal', category: 'carbs', caloriesPerServing: 389, servingSize: '100g', protein: 17, carbs: 66, fats: 7, description: 'High fiber, filling breakfast option' },
    { id: '5', name: 'Avocado', category: 'fats', caloriesPerServing: 160, servingSize: '100g', protein: 2, carbs: 9, fats: 15, description: 'Healthy monounsaturated fats' },
    { id: '6', name: 'Eggs', category: 'protein', caloriesPerServing: 155, servingSize: '100g', protein: 13, carbs: 1.1, fats: 11, description: 'Complete protein source with vitamins' },
    { id: '7', name: 'Sweet Potato', category: 'carbs', caloriesPerServing: 86, servingSize: '100g', protein: 1.6, carbs: 20, fats: 0.1, description: 'Nutrient-dense carb option' },
    { id: '8', name: 'Almonds', category: 'fats', caloriesPerServing: 579, servingSize: '100g', protein: 21, carbs: 22, fats: 49, description: 'Energy-dense healthy fats' },
    { id: '9', name: 'Banana', category: 'fruits', caloriesPerServing: 89, servingSize: '100g', protein: 1.1, carbs: 23, fats: 0.3, description: 'Quick energy and potassium' },
    { id: '10', name: 'Greek Yogurt', category: 'protein', caloriesPerServing: 59, servingSize: '100g', protein: 10, carbs: 3.6, fats: 0.4, description: 'High protein dairy option' },
    { id: '11', name: 'Quinoa', category: 'carbs', caloriesPerServing: 120, servingSize: '100g', protein: 4, carbs: 21, fats: 2, description: 'Complete protein grain' },
    { id: '12', name: 'Peanut Butter', category: 'fats', caloriesPerServing: 588, servingSize: '100g', protein: 25, carbs: 20, fats: 50, description: 'Calorie-dense spread' },
    { id: '13', name: 'Broccoli', category: 'vegetables', caloriesPerServing: 34, servingSize: '100g', protein: 2.8, carbs: 7, fats: 0.4, description: 'Low calorie, high nutrient' },
    { id: '14', name: 'Blueberries', category: 'fruits', caloriesPerServing: 57, servingSize: '100g', protein: 0.7, carbs: 14, fats: 0.3, description: 'Antioxidant-rich fruit' },
    { id: '15', name: 'Whole Milk', category: 'fats', caloriesPerServing: 61, servingSize: '100ml', protein: 3.2, carbs: 4.8, fats: 3.3, description: 'Full fat dairy for calories' }
  ];

  // Sample diet plan
  const samplePlan: DietPlan = {
    id: '1',
    name: 'Weight Gainer Plan',
    dailyCalories: 3000,
    protein: 150,
    carbs: 400,
    fats: 80,
    createdAt: new Date().toISOString(),
    foods: [
      { id: 'milk-1', name: 'Whole Milk', category: 'fats', caloriesPerServing: 61, servingSize: '250ml', protein: 8, carbs: 12, fats: 3.3, description: 'Breakfast option' },
      { id: 'oatmeal-1', name: 'Oatmeal with Banana', category: 'carbs', caloriesPerServing: 400, servingSize: '1 bowl', protein: 20, carbs: 70, fats: 7, description: 'Breakfast' },
      { id: 'chicken-1', name: 'Grilled Chicken Breast', category: 'protein', caloriesPerServing: 330, servingSize: '150g', protein: 47, carbs: 0, fats: 7, description: 'Lunch' },
      { id: 'rice-1', name: 'Brown Rice', category: 'carbs', caloriesPerServing: 222, servingSize: '150g', protein: 4, carbs: 35, fats: 1, description: 'Lunch side' },
      { id: 'salmon-1', name: 'Baked Salmon', category: 'protein', caloriesPerServing: 414, servingSize: '150g', protein: 33, carbs: 0, fats: 26, description: 'Dinner' },
      { id: 'avocado-1', name: 'Avocado', category: 'fats', caloriesPerServing: 160, servingSize: '1 medium', protein: 2, carbs: 9, fats: 15, description: 'Dinner side' },
      { id: 'yogurt-1', name: 'Greek Yogurt with Nuts', category: 'protein', caloriesPerServing: 200, servingSize: '150g', protein: 20, carbs: 10, fats: 10, description: 'Snack' },
      { id: 'peanut-1', name: 'Peanut Butter', category: 'fats', caloriesPerServing: 588, servingSize: '2 tbsp', protein: 25, carbs: 20, fats: 50, description: 'Post-workout' }
    ]
  };

  const filteredFoods = foods.filter(food =>
    selectedCategory === 'all' || food.category === selectedCategory
  );

  const totalFoodCalories = samplePlan.foods.reduce((sum, food) => sum + food.caloriesPerServing, 0);

  return (
    <div className="diet-page min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            🍽️ Diet & Nutrition
          </h1>
          <p className="text-xl text-gray-600 mb-6">Fuel your workouts and gain weight the healthy way</p>

          <div className="bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2 justify-center">
              🎯 Set Your Daily Calorie Goal
            </h2>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <input
                type="number"
                value={dailyCalories}
                onChange={(e) => setDailyCalories(Number(e.target.value))}
                className="w-full md:w-48 px-4 py-3 border-2 border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-xl font-bold"
                min="1500"
                max="4000"
              />
              <span className="text-lg text-gray-600">calories/day</span>
            </div>
          </div>
        </header>

        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {(['all', 'protein', 'carbs', 'fats', 'vegetables', 'fruits', 'other'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-orange-600 border-2 border-orange-300 hover:bg-orange-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
            🥗 Food Database
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => (
              <div key={food.id} className="food-card bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl border border-orange-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{food.name}</h3>
                <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {food.category}
                </span>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calories:</span>
                    <span className="font-bold text-orange-600">{food.caloriesPerServing} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Serving:</span>
                    <span className="text-gray-700">{food.servingSize}</span>
                  </div>
                  {food.protein && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Protein:</span>
                      <span className="text-green-600 font-semibold">{food.protein}g</span>
                    </div>
                  )}
                  {food.carbs && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carbs:</span>
                      <span className="text-blue-600 font-semibold">{food.carbs}g</span>
                    </div>
                  )}
                  {food.fats && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fats:</span>
                      <span className="text-purple-600 font-semibold">{food.fats}g</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-3 italic">{food.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
              📋 My Diet Plan
            </h2>
            <div className="bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{samplePlan.name}</h3>
                </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-orange-600">{samplePlan.dailyCalories}</div>
                  <div className="text-gray-600">Daily Calories</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-600">{samplePlan.protein}g</div>
                  <div className="text-gray-600">Protein (g)</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-600">{samplePlan.carbs}g</div>
                  <div className="text-gray-600">Carbs (g)</div>
                </div>
              </div>

              <div className="space-y-3">
                {samplePlan.foods.map((food) => (
                  <div key={food.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{food.name}</h4>
                      <p className="text-sm text-gray-500">{food.servingSize} - {food.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">{food.caloriesPerServing} kcal</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Calories: </span>
                <span className="text-2xl font-bold text-orange-600">{totalFoodCalories} kcal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPage;