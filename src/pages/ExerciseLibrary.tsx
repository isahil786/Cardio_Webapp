import type { Exercise } from '../types';
import { useState } from 'react';

const ExerciseLibrary: React.FC = () => {
  // Mock exercise data - in a real app this would come from an API
  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Running',
      category: 'running',
      description: 'Outdoor or treadmill running - great for cardiovascular health and endurance',
      caloriesPerMinute: 10,
      equipmentNeeded: ['Running shoes']
    },
    {
      id: '2',
      name: 'Cycling',
      category: 'cycling',
      description: 'Stationary or outdoor cycling - low impact, great for leg strength',
      caloriesPerMinute: 8,
      equipmentNeeded: ['Bicycle', 'Helmet']
    },
    {
      id: '3',
      name: 'Swimming',
      category: 'swimming',
      description: 'Pool or open water swimming - full body workout, zero impact',
      caloriesPerMinute: 9,
      equipmentNeeded: ['Swimsuit', 'Goggles']
    },
    {
      id: '4',
      name: 'Rowing',
      category: 'rowing',
      description: 'Machine rowing - excellent for upper body and cardio',
      caloriesPerMinute: 7,
      equipmentNeeded: ['Rowing machine']
    },
    {
      id: '5',
      name: 'HIIT',
      category: 'hiit',
      description: 'High-intensity interval training - maximum calorie burn in short time',
      caloriesPerMinute: 12,
      equipmentNeeded: []
    },
    {
      id: '6',
      name: 'Jump Rope',
      category: 'other',
      description: 'Jump rope workout - portable, high intensity, great coordination',
      caloriesPerMinute: 11,
      equipmentNeeded: ['Jump rope']
    },
    {
      id: '7',
      name: 'Elliptical',
      category: 'other',
      description: 'Elliptical trainer - low impact, full body workout',
      caloriesPerMinute: 8,
      equipmentNeeded: ['Elliptical machine']
    },
    {
      id: '8',
      name: 'Stair Climbing',
      category: 'other',
      description: 'Stair climber or real stairs - excellent for leg power and cardio',
      caloriesPerMinute: 9,
      equipmentNeeded: ['Stair climber']
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter exercises based on search and category
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="exercise-library min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            🏋️ Exercise Library
          </h1>
          <p className="text-xl text-gray-600">
            Discover and learn about different cardio exercises to reach your fitness goals
          </p>
        </header>

        <div className="library-controls mb-12">
          <div className="search-box mb-6">
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="category-filter flex justify-center">
            <label htmlFor="category" className="mr-2 text-gray-700 font-medium">Filter by:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategory(value);
              }}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="all" className="text-gray-700">All Categories</option>
              <option value="running" className="text-gray-700">🏃 Running</option>
              <option value="cycling" className="text-gray-700">🚴 Cycling</option>
              <option value="swimming" className="text-gray-700">🏊 Swimming</option>
              <option value="rowing" className="text-gray-700">🚣 Rowing</option>
              <option value="hiit" className="text-gray-700">🔥 HIIT</option>
              <option value="other" className="text-gray-700">⚪ Other</option>
            </select>
          </div>
        </div>

        <div className="exercises-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.length === 0 ? (
            <p className="no-results text-center text-gray-500 text-lg col-span-full py-20">
              No exercises found matching your criteria.
            </p>
          ) : (
            filteredExercises.map((exercise) => (
              <div key={exercise.id} className="exercise-card bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 card">
                <div className="exercise-header mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    {exercise.name}
                  </h3>
                  <span className="category-tag inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {exercise.category}
                  </span>
                </div>

                <div className="exercise-info">
                  <p className="text-gray-600 mb-4 leading-relaxed">{exercise.description}</p>
                  <div className="exercise-details bg-gray-50 p-4 rounded-xl">
                    <div className="detail-item flex justify-between items-center mb-2 last:mb-0">
                      <span className="text-gray-500 font-medium">Calories/min:</span>
                      <strong className="text-blue-600 font-bold">{exercise.caloriesPerMinute}</strong>
                    </div>
                    {exercise.equipmentNeeded?.length && (
                      <div className="detail-item flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Equipment:</span>
                        <span className="text-gray-700">{exercise.equipmentNeeded.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseLibrary;