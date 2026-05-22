import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = 'MediQueue - 404';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-4 mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-10 py-4 rounded-3xl text-xl inline-block hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;