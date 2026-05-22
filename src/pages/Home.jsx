import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';

const API_URL = 'https://mediqueue-server-txy3.onrender.com';

const Home = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'MediQueue - Home';
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/tutors`)
      .then(res => {
        setTutors(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Banner / Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Book Your Next<br />Learning Session
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Connect with expert tutors. Learn from the best. Simple, secure, and instant booking.
          </p>
          <Link
            to="/tutors"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-4 rounded-3xl text-xl font-semibold hover:scale-105 transition"
          >
            Browse Tutors
            <ArrowRight />
          </Link>
        </div>
      </div>

      {/* Available Tutors Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Available Tutors</h2>

        {loading ? (
          <p className="text-center text-xl">Loading tutors...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map(tutor => (
              <div key={tutor._id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <img src={tutor.photo} alt={tutor.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{tutor.name}</h3>
                  <p className="text-blue-600 font-medium">{tutor.subject}</p>
                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <span className="text-sm text-gray-500">Hourly Fee</span>
                      <p className="text-3xl font-bold text-green-600">৳{tutor.hourlyFee}</p>
                    </div>
                    <Link
                      to={`/tutor/${tutor._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-medium transition"
                    >
                      Book Session
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Extra Sections */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8">Why Choose MediQueue?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-3xl shadow">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-semibold mb-3">Secure Booking</h3>
              <p className="text-gray-600">Instant confirmation with digital session token</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-2xl font-semibold mb-3">No Time Conflicts</h3>
              <p className="text-gray-600">Real-time slot availability checking</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-semibold mb-3">Expert Tutors</h3>
              <p className="text-gray-600">Verified tutors from top institutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;