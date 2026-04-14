import { useState } from 'react';
import type { Workout, User } from '../types';
import WorkoutForm from '../components/WorkoutForm';
import RecentWorkouts from '../components/RecentWorkouts';
import WorkoutHistory from '../components/WorkoutHistory';
import QuickStats from '../components/QuickStats';

const HomePage: React.FC<{ user: User | null; onLogin: (user: User) => void }> = ({ user, onLogin }) => {
  const [workouts, setWorkouts] = useState<Workout[]>(user?.workouts || []);

  const addWorkout = (workout: Workout) => {
    setWorkouts(prev => [workout, ...prev]);
    // In a real app, this would update the user via API
    if (user) {
      onLogin({ ...user, workouts: [workout, ...(user.workouts || [])] });
    }
  };

  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get yesterday's date for comparison
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDate = yesterday.toISOString().split('T')[0];
  const yesterdayWorkouts = workouts.filter(w => w.date === yesterdayDate);

  return (
    <div className="home-page bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Welcome Section - Left Aligned */}
        <header className="text-left mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight drop-shadow-lg">
            Welcome back, {user?.name}! 💪
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
            Ready to crush your cardio goals? Let's get moving! 🏃
          </p>
        </header>

        {/* Date Card - Centered */}
        <div className="mb-8 text-center">
          <div className="date-card bg-white/80 backdrop-blur-sm shadow-xl p-6 rounded-2xl border border-white/50 hover:shadow-2xl transition-shadow duration-300 mx-auto max-w-md">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Current Date</h3>
            <p className="text-2xl font-semibold text-gray-800">{currentDate}</p>
          </div>
        </div>

        {/* Yesterday's Progress - Centered */}
        {yesterdayWorkouts.length > 0 && (
          <div className="mb-8 text-center">
            <div className="yesterday-card bg-green-50/80 backdrop-blur-sm shadow-lg p-6 rounded-2xl border border-green-200 hover:shadow-xl transition-shadow duration-300 mx-auto max-w-2xl">
              <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center justify-center gap-2">
                🎉 Yesterday's Progress
                <span className="text-2xl">🏃</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {yesterdayWorkouts.map(workout => (
                  <div key={workout.id} className="text-center">
                    <p className="text-sm font-bold text-green-700">{workout.type}</p>
                    <p className="text-xs text-green-600">{workout.duration} min</p>
                    {workout.calories && (
                      <p className="text-xs text-green-500">{workout.calories} cal</p>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => console.log('View yesterday details')}
                className="view-yesterday-btn w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
              >
                View Full History →
              </button>
            </div>
          </div>
        )}

        {/* Dashboard - Left Aligned */}
        <div className="dashboard text-left mb-12">
          <QuickStats workouts={workouts} />
        </div>

        {/* Workout History Section - Centered */}
        <div className="mb-12">
          <WorkoutHistory workouts={workouts} />
        </div>

        {/* Cards Grid - Centered */}
        <div className="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Log Workout Card */}
            <div className="card bg-white/80 backdrop-blur-sm shadow-xl p-6 rounded-2xl border border-white/50 hover:shadow-2xl transition-shadow duration-300 mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2 justify-center">
                📝 Log New Workout
              </h2>
              <WorkoutForm onAddWorkout={addWorkout} />
            </div>

            {/* Recent Workouts Card */}
            <div className="card bg-white/80 backdrop-blur-sm shadow-xl p-6 rounded-2xl border border-white/50 hover:shadow-2xl transition-shadow duration-300 mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2 justify-center">
                📊 Recent Workouts
              </h2>
              <RecentWorkouts workouts={workouts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;