import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://mediqueue-server-txy3.onrender.com';

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  document.title = 'MediQueue - All Tutors';
}, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/tutors`)
      .then(res => {
        setTutors(res.data);
        setFilteredTutors(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = tutors.filter(tutor =>
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTutors(filtered);
  }, [searchTerm, tutors]);

  if (loading) return <p className="text-center py-20 text-xl">Loading tutors...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">All Tutors</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by tutor name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-6 py-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTutors.map(tutor => (
          <div key={tutor._id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img src={tutor.photo} alt={tutor.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold">{tutor.name}</h3>
              <p className="text-blue-600 font-medium">{tutor.subject}</p>
              <div className="flex justify-between items-center mt-6">
                <div>
                  <span className="text-sm text-gray-500">Fee</span>
                  <p className="text-3xl font-bold text-green-600">৳{tutor.hourlyFee}</p>
                </div>
                <Link
                  to={`/tutor/${tutor._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-medium"
                >
                  Book Session
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutors;