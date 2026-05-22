import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://mediqueue-server-txy3.onrender.com';

const TutorDetails = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: '',
    phone: ''
  });
  useEffect(() => {
  document.title = 'MediQueue - Tutor Details';
}, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/tutors/${id}`)
      .then(res => {
        setTutor(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/bookings`, {
        tutorId: id,
        studentName: formData.studentName,
        phone: formData.phone
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      toast.success('Session booked successfully!');
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <p className="text-center py-20">Loading tutor details...</p>;
  if (!tutor) return <p className="text-center py-20 text-red-500">Tutor not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <img src={tutor.photo} alt={tutor.name} className="rounded-3xl shadow-2xl w-full" />

        <div>
          <h1 className="text-5xl font-bold">{tutor.name}</h1>
          <p className="text-3xl text-blue-600 mt-2">{tutor.subject}</p>

          <div className="mt-8 space-y-6">
            <div>
              <span className="font-medium">Available:</span>
              <p>{tutor.availableDays} • {tutor.availableTime}</p>
            </div>
            <div>
              <span className="font-medium">Hourly Fee:</span>
              <p className="text-4xl font-bold text-green-600">৳{tutor.hourlyFee}</p>
            </div>
            <div>
              <span className="font-medium">Total Slots:</span>
              <p className="text-xl">{tutor.totalSlot} remaining</p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-12 w-full py-6 text-xl bg-blue-600 text-white rounded-3xl font-semibold hover:bg-blue-700"
          >
            Book Session
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
            <h2 className="text-3xl font-bold mb-6">Book with {tutor.name}</h2>
            <form onSubmit={handleBooking} className="space-y-6">
              <input
                type="text"
                placeholder="Your Full Name"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-5 py-4 border rounded-2xl"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-5 py-4 border rounded-2xl"
                required
              />
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 border rounded-3xl">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-3xl">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDetails;