import type { Workout } from '../types';

interface RecentWorkoutsProps {
  workouts: Workout[];
}

const RecentWorkouts: React.FC<RecentWorkoutsProps> = ({ workouts }) => {
  if (workouts.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl text-center">
        <p className="text-gray-500 text-lg">No workouts logged yet. Start your first workout!</p>
      </div>
    );
  }

  const recentWorkouts = workouts.slice(0, 5);

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        📊 Recent Workouts
      </h2>
      <div className="space-y-4">
        {recentWorkouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 capitalize">{workout.type}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(workout.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{workout.duration} min</p>
                {workout.distance && (
                  <p className="text-sm text-gray-500">{workout.distance} km</p>
                )}
                {workout.calories && (
                  <p className="text-sm font-semibold text-green-600">{workout.calories} cal</p>
                )}
              </div>
            </div>
            {workout.notes && (
              <p className="text-sm text-gray-600 mt-2 italic">"{workout.notes}"</p>
            )}
          </div>
        ))}
        {workouts.length > 5 && (
          <div className="text-center mt-4">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All Workouts →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentWorkouts;