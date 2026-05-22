import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://mediqueue-server-txy3.onrender.com';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    document.title = 'MediQueue - My Bookings';
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/bookings/my-bookings`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setBookings(res.data));
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await axios.patch(`${API_URL}/api/bookings/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
      toast.success('Booking cancelled');
    } catch (err) {
      toast.error('Failed to cancel');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">My Booked Sessions</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-xl py-20">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white p-8 rounded-3xl shadow flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-semibold">{booking.tutor?.name}</h3>
                <p className="text-gray-600">{booking.studentName} • {booking.status}</p>
              </div>
              {booking.status === 'booked' && (
                <button 
                  onClick={() => handleCancel(booking._id)} 
                  className="px-8 py-4 bg-red-500 text-white rounded-3xl hover:bg-red-600"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;