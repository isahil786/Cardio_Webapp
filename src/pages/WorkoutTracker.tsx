import type { Workout } from '../types';

interface WorkoutTrackerProps {
  user: { workouts: Workout[] };
}

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ user }) => {
  if (user.workouts.length === 0) {
    return (
      <div className="workout-tracker max-w-2xl mx-auto mt-12 p-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          📊 Workout Tracker
        </h2>
        <p className="text-gray-600 mb-6">Track your workouts and monitor your progress</p>
        <p className="text-lg text-gray-500 italic">
          No workouts logged yet. Start your fitness journey today! 💪
        </p>
      </div>
    );
  }

  return (
    <div className="workout-tracker max-w-4xl mx-auto mt-12 px-4">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl shadow-2xl mb-8 text-center">
        <h2 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
          📊 Workout Tracker
        </h2>
        <p className="text-blue-100">Track your workouts and monitor your progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.workouts.map((workout: Workout) => (
          <div
            key={workout.id}
            className="workout-item bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                {workout.type}
              </h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{new Date(workout.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>{workout.duration} minutes</span>
              </div>
              {workout.distance && (
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 11h2m10-11l7 7m-7 7l7-7m-9 4l-4 4m0 0l4-4m-4 4V4" />
                  </svg>
                  <span>{workout.distance} km</span>
                </div>
              )}
              {workout.calories && (
                <div className="flex items-center gap-2 text-green-600 text-sm font-semibold mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  {workout.calories} calories burned
                </div>
              )}
              {workout.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600 italic">"{workout.notes}"</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutTracker;