import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Patient Portal</h1>
          
          {user && (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <Link 
                  to="/tests" 
                  className={`px-3 py-2 rounded transition-colors ${
                    isActive('/tests') 
                      ? 'bg-blue-800 text-white' 
                      : 'hover:bg-blue-700 text-blue-100'
                  }`}
                >
                  Browse Tests
                </Link>
                <Link 
                  to="/bookings" 
                  className={`px-3 py-2 rounded transition-colors ${
                    isActive('/bookings') 
                      ? 'bg-blue-800 text-white' 
                      : 'hover:bg-blue-700 text-blue-100'
                  }`}
                >
                  My Bookings
                </Link>
              </div>
              
              <div className="flex items-center gap-4 border-l border-blue-500 pl-4">
                <span className="text-sm">Welcome, {user.name}</span>
                <button 
                  onClick={logout}
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;