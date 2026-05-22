import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://mediqueue-server-txy3.onrender.com';

const MyTutors = () => {
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [editingTutor, setEditingTutor] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/tutors/my-tutors`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setTutors(res.data));
  }, []);

  useEffect(() => {
  document.title = 'MediQueue - My Tutors';
}, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tutor?')) return;
    try {
      await axios.delete(`${API_URL}/api/tutors/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTutors(tutors.filter(t => t._id !== id));
      toast.success('Tutor deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">My Tutors</h1>
      {tutors.length === 0 ? (
        <p className="text-center text-xl py-20">You haven't added any tutors yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-3xl shadow">
            <thead>
              <tr className="border-b">
                <th className="p-6 text-left">Name</th>
                <th className="p-6 text-left">Subject</th>
                <th className="p-6 text-left">Fee</th>
                <th className="p-6 text-left">Slots</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map(tutor => (
                <tr key={tutor._id} className="border-b last:border-none">
                  <td className="p-6">{tutor.name}</td>
                  <td className="p-6">{tutor.subject}</td>
                  <td className="p-6">৳{tutor.hourlyFee}</td>
                  <td className="p-6">{tutor.totalSlot}</td>
                  <td className="p-6 text-center">
                    <button onClick={() => setEditingTutor(tutor)} className="text-yellow-500 mx-2">Edit</button>
                    <button onClick={() => handleDelete(tutor._id)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTutors;