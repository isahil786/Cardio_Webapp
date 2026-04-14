import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

const LoginPage: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Simple validation - in reality would call backend
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0],
          email,
          createdAt: new Date().toISOString(),
          workouts: [],
          preferences: {
            unitSystem: 'metric',
            favoriteExercises: []
          }
        };

        onLogin(mockUser);
        navigate('/');
      } else {
        setError('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="auth-box bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50">
          {/* Header with left-aligned text */}
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              Welcome to CardioTrack
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Track your cardio workouts and achieve your fitness goals
            </p>
          </div>

          {/* Login Form - Left aligned */}
          <form onSubmit={handleSubmit} className="auth-form space-y-6">
            {/* Email Field */}
            <div className="form-group text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 outline-none bg-white/50"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="form-group text-left">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 outline-none bg-white/50"
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="error-message text-left text-sm text-red-600 bg-red-50/50 px-3 py-2 rounded-lg border border-red-100">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="submit-btn w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/30 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Signup Link - Left aligned */}
          <p className="signup-link text-left mt-8 text-sm text-gray-500">
            Don't have an account?{' '}
            <span className="text-blue-600 font-medium">Sign up coming soon!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;