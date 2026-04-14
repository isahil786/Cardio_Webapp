import { useState } from 'react';
import type { User } from '../types';

interface ProfilePageProps {
  user: User | null;
  onLogin: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogin }) => {
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState({
    unitSystem: 'metric' as 'metric' | 'imperial',
    favoriteExercises: [] as string[]
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🔐 Please log in to view your profile</h1>
          <p className="text-gray-600">Start tracking your fitness journey today!</p>
        </div>
      </div>
    );
  }

  if (user && !editedUser) {
    setEditedUser({
      ...user,
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      workouts: user.workouts || [],
      preferences: {
        unitSystem: user.preferences?.unitSystem || 'metric',
        favoriteExercises: user.preferences?.favoriteExercises || []
      }
    });
    setPreferences({
      unitSystem: user.preferences?.unitSystem || 'metric',
      favoriteExercises: user.preferences?.favoriteExercises || []
    });
  }

  const handleSave = () => {
    if (editedUser) {
      const updatedUser = {
        ...editedUser,
        preferences
      };
      onLogin(updatedUser);
      setEditing(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            👤 Profile
          </h1>
          <p className="text-xl text-gray-600">Manage your account and preferences</p>
        </div>

        {!editing ? (
          // View Mode - Left aligned with beautiful styling
          <div className="space-y-8">
            {/* Profile Info Card */}
            <div className="bg-white/90 backdrop-blur-sm shadow-2xl p-8 rounded-2xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span>👤</span> Account Information
              </h2>
              <div className="space-y-6 text-left">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-xl text-gray-900 mt-1">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-xl text-gray-900 mt-1">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Member Since</label>
                  <p className="text-xl text-gray-900 mt-1">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl text-center border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">{user.workouts.length}</div>
                <div className="text-gray-600">Total Workouts</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl text-center border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {user.workouts.reduce((sum, w) => sum + (w.duration || 0), 0)}
                </div>
                <div className="text-gray-600">Total Minutes</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-2xl text-center border border-gray-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {user.workouts.reduce((sum, w) => sum + (w.calories || 0), 0)}
                </div>
                <div className="text-gray-600">Total Calories</div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white/90 backdrop-blur-sm shadow-xl p-8 rounded-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                ⚙️ Preferences
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Unit System</label>
                  <p className="text-lg text-gray-900 mt-1">
                    {preferences.unitSystem === 'metric' ? 'Metric (km, kg)' : 'Imperial (mi, lbs)'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Favorite Exercises</label>
                  <p className="text-lg text-gray-900 mt-1">
                    {preferences.favoriteExercises.length > 0
                      ? preferences.favoriteExercises.join(', ')
                      : 'None selected'}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setEditing(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl p-8 rounded-2xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span>✏️</span> Edit Profile
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editedUser?.name || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editedUser?.email || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                <select
                  value={preferences.unitSystem}
                  onChange={(e) => setPreferences(prev => ({ ...prev, unitSystem: e.target.value as 'metric' | 'imperial' }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="metric">Metric (km, kg)</option>
                  <option value="imperial">Imperial (mi, lbs)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Favorite Exercises</label>
                <div className="checkbox-group grid grid-cols-2 gap-3">
                  {[
                    { id: 'running', name: 'Running' },
                    { id: 'cycling', name: 'Cycling' },
                    { id: 'swimming', name: 'Swimming' },
                    { id: 'rowing', name: 'Rowing' },
                    { id: 'hiit', name: 'HIIT' },
                    { id: 'other', name: 'Other' }
                  ].map(exercise => (
                    <label key={exercise.id} className="checkbox-label flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={preferences.favoriteExercises.includes(exercise.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPreferences(prev => ({
                              ...prev,
                              favoriteExercises: [...prev.favoriteExercises, exercise.id]
                            }));
                          } else {
                            setPreferences(prev => ({
                              ...prev,
                              favoriteExercises: prev.favoriteExercises.filter((id) => id !== exercise.id)
                            }));
                          }
                        }}
                      />
                      {exercise.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-actions flex gap-4 justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-gray-200 text-gray-700 py-3 px-8 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;