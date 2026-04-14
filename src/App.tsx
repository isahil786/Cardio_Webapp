import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { User } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExerciseLibrary from './pages/ExerciseLibrary';
import WorkoutTracker from './pages/WorkoutTracker';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import DietPage from './pages/DietPage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication - in a real app, this would come from an API
  useEffect(() => {
    const checkStoredUser = () => {
      const storedUser = localStorage.getItem('cardioUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkStoredUser();
  }, []); // Empty deps - runs once on mount

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('cardioUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cardioUser');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {user ? (
          <>
            <Navbar user={user} onLogout={logout} />
            <main className="main-content text-left">
              <Routes>
                <Route path="/" element={<HomePage user={user} onLogin={login} />} />
                <Route path="/exercises" element={<ExerciseLibrary />} />
                <Route path="/workouts" element={<WorkoutTracker user={user} />} />
                <Route path="/analytics" element={<AnalyticsPage user={user} />} />
                <Route path="/profile" element={<ProfilePage user={user} onLogin={login} />} />
                <Route path="/diet" element={<DietPage />} />
                <Route path="/login" element={<LoginPage onLogin={login} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </>
        ) : (
          <LoginPage onLogin={login} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;