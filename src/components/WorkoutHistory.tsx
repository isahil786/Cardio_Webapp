import type { Workout } from '../types';

interface WorkoutHistoryProps {
  workouts: Workout[];
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts }) => {
  // Group workouts by date
  const groupedWorkouts = workouts.reduce((acc, workout) => {
    const date = workout.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(workout);
    return acc;
  }, {} as Record<string, Workout[]>);

  const sortedDates = Object.keys(groupedWorkouts).sort().reverse();

  if (workouts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No workout history yet. Start logging your first workout!</p>
      </div>
    );
  }

  return (
    <div className="workout-history">
      <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
        📅 Workout History
      </h3>
      <div className="space-y-6">
        {sortedDates.map(date => {
          const dateWorkouts = groupedWorkouts[date];
          const dateObj = new Date(date);
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          return (
            <div key={date} className="workout-date-section">
              <h4 className="text-md font-bold text-gray-700 mb-3 bg-gray-50 py-2 px-4 rounded-lg">
                {formattedDate}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {dateWorkouts.map(workout => (
                  <div
                    key={workout.id}
                    className="workout-item bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="workout-header mb-2">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        {workout.type}
                      </span>
                    </div>
                    <div className="workout-stats">
                      <p className="text-sm text-gray-600">⏱️ Duration: {workout.duration} min</p>
                      {workout.distance && (
                        <p className="text-sm text-gray-600">📊 Distance: {workout.distance} km</p>
                      )}
                      {workout.calories && (
                        <p className="text-sm text-green-600 font-semibold">🔥 Calories: {workout.calories}</p>
                      )}
                      {workout.notes && (
                        <p className="text-sm text-gray-500 mt-1">📝 {workout.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutHistory;