import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            📚 MediQueue
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/tutors" className="hover:text-blue-600 transition">Tutors</Link>

            {user && (
              <>
                <Link to="/add-tutor" className="hover:text-blue-600 transition">Add Tutor</Link>
                <Link to="/my-tutors" className="hover:text-blue-600 transition">My Tutors</Link>
                <Link to="/my-bookings" className="hover:text-blue-600 transition">My Bookings</Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="px-5 py-2 text-blue-600 hover:bg-blue-50 rounded-2xl">Login</Link>
                <Link to="/register" className="px-5 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;