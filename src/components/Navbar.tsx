import { Link } from 'react-router-dom';

interface NavbarProps {
  user: {
    name: string;
    email: string;
  } | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="navbar-container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="navbar-logo text-white font-bold text-xl hover:text-blue-200 transition-colors">
            💪 CardioTrack
          </Link>
          <div className="navbar-links flex items-center space-x-6">
            <Link to="/workouts" className="text-white hover:text-blue-200 transition-colors font-medium">Workouts</Link>
            <Link to="/exercises" className="text-white hover:text-blue-200 transition-colors font-medium">Exercises</Link>
            <Link to="/analytics" className="text-white hover:text-blue-200 transition-colors font-medium">Analytics</Link>
            <Link to="/profile" className="text-white hover:text-blue-200 transition-colors font-medium">Profile</Link>
            {user ? (
              <button
                onClick={onLogout}
                className="bg-white text-blue-600 hover:bg-blue-50 transition-colors font-semibold py-2 px-4 rounded-lg shadow-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-600 hover:bg-blue-50 transition-colors font-semibold py-2 px-4 rounded-lg shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;