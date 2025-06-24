import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Patient Portal</h1>
          {user && (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.name}</span>
              <button 
                onClick={logout}
                className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
              >
                Logout
              </button>
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