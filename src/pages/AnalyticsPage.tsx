import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Workout } from '../types';
import { useMemo } from 'react';

interface AnalyticsPageProps {
  user: {
    workouts: Workout[];
  } | null;
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ user }) => {
  // Group workouts by week for trend chart
  const weeklyData = useMemo(() => {
    const weeklyMap = new Map<string, number>();

    (user?.workouts || []).forEach(workout => {
      const date = new Date(workout.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
      const weekKey = weekStart.toISOString().split('T')[0];

      weeklyMap.set(weekKey, (weeklyMap.get(weekKey) || 0) + (workout.duration || 0));
    });

    // Convert to array and sort by date
    return Array.from(weeklyMap.entries())
      .map(([date, duration]) => ({ date, value: duration }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [user?.workouts]);

  // Group by exercise type
  const exerciseBreakdown = useMemo(() => {
    const breakdownMap = new Map<string, number>();

    (user?.workouts || []).forEach(workout => {
      if (workout.type) {
        breakdownMap.set(workout.type, (breakdownMap.get(workout.type) || 0) + 1);
      }
    });

    return Array.from(breakdownMap.entries())
      .map(([name, count]) => ({ name, count }));
  }, [user?.workouts]);

  const totalWorkouts = user?.workouts?.length || 0;
  const totalDuration = user?.workouts?.reduce((sum, w) => sum + (w.duration || 0), 0) || 0;
  const totalCalories = user?.workouts?.reduce((sum, w) => sum + (w.calories || 0), 0) || 0;

  if (!user?.workouts || user.workouts.length === 0) {
    return (
      <div className="analytics-page min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg">
              📊 Your Analytics
            </h1>
            <p className="text-xl text-gray-600 mb-8">Track your progress over time</p>
            <div className="bg-white/90 backdrop-blur-sm shadow-2xl p-8 rounded-2xl border border-gray-100 max-w-2xl mx-auto text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                📈 No Data Available
              </h3>
              <p className="text-lg text-gray-600 mb-4">Start logging workouts to see your progress and analytics!</p>
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 italic">
                  Your analytics dashboard will show:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
                  <li>Weekly workout duration trends</li>
                  <li>Exercise type distribution</li>
                  <li>Total workouts, duration & calories</li>
                  <li>Progress over time</li>
                </ul>
              </div>
            </div>
          </header>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            📊 Your Analytics
          </h1>
          <p className="text-xl text-gray-600">Track your progress over time</p>
        </header>

        <div className="analytics-grid">
          {/* Summary Cards */}
          <div className="stats-summary grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="stat-card bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl border border-gray-100 text-left">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">{totalWorkouts}</h3>
              <p className="text-gray-600">Total Workouts</p>
            </div>
            <div className="stat-card bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl border border-gray-100 text-left">
              <h3 className="text-3xl font-bold text-green-600 mb-2">{totalDuration} min</h3>
              <p className="text-gray-600">Total Time</p>
            </div>
            <div className="stat-card bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl border border-gray-100 text-left">
              <h3 className="text-3xl font-bold text-purple-600 mb-2">{totalCalories}</h3>
              <p className="text-gray-600">Calories Burned</p>
            </div>
          </div>

          {/* Weekly Trend Chart */}
          <div className="chart-container bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              📈 Weekly Workout Duration Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Exercise Breakdown Chart */}
          <div className="chart-container bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              📊 Workout Distribution by Exercise Type
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={exerciseBreakdown}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;