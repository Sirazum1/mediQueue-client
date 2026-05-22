import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">📚 MediQueue</h3>
            <p className="text-gray-400">Book your next learning session with expert tutors.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/tutors" className="hover:text-white">Find Tutors</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/my-bookings" className="hover:text-white">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Tutors</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/add-tutor" className="hover:text-white">Add Tutor</Link></li>
              <li><Link to="/my-tutors" className="hover:text-white">My Tutors</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          © 2026 MediQueue. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;