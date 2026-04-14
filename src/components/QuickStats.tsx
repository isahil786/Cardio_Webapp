import type { Workout } from '../types';

interface QuickStatsProps {
  workouts: Workout[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ workouts }) => {
  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
  const favoriteType = workouts.reduce((acc, workout) => {
    if (!workout.type) return acc;
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonType = Object.entries(favoriteType)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'None';

  return (
    <div className="quick-stats text-center">
      <div className="stats-grid">
        <div className="stat-card">
          <h3 className="text-3xl font-bold text-blue-600 mb-1">{totalWorkouts}</h3>
          <p className="text-gray-500 text-sm">Workouts</p>
        </div>
        <div className="stat-card">
          <h3 className="text-3xl font-bold text-green-600 mb-1">{totalDuration} min</h3>
          <p className="text-gray-500 text-sm">Total Time</p>
        </div>
        <div className="stat-card">
          <h3 className="text-3xl font-bold text-purple-600 mb-1">{totalCalories}</h3>
          <p className="text-gray-500 text-sm">Calories Burned</p>
        </div>
        <div className="stat-card">
          <h3 className="text-3xl font-bold text-pink-600 mb-1">{mostCommonType}</h3>
          <p className="text-gray-500 text-sm">Favorite Exercise</p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;