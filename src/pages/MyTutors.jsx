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
    document.title = 'MediQueue - My Tutors';
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/tutors/my-tutors`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setTutors(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tutor?')) return;
    try {
      await axios.delete(`${API_URL}/api/tutors/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTutors(tutors.filter(t => t._id !== id));
      toast.success('Tutor deleted successfully');
    } catch (err) {
      toast.error('Failed to delete tutor');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/tutors/${editingTutor._id}`, editingTutor, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Tutor updated successfully');
      setEditingTutor(null);
      // Refresh list
      const res = await axios.get(`${API_URL}/api/tutors/my-tutors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTutors(res.data);
    } catch (err) {
      toast.error('Failed to update tutor');
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
                  <td className="p-6 text-center space-x-4">
                    <button 
                      onClick={() => setEditingTutor(tutor)} 
                      className="text-yellow-500 hover:text-yellow-600 font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(tutor._id)} 
                      className="text-red-500 hover:text-red-600 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingTutor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4">
            <h3 className="text-2xl font-bold mb-6">Edit Tutor</h3>
            <form onSubmit={handleUpdate} className="space-y-6">
              <input
                type="text"
                value={editingTutor.name}
                onChange={(e) => setEditingTutor({ ...editingTutor, name: e.target.value })}
                className="w-full px-6 py-4 border rounded-3xl"
                placeholder="Tutor Name"
              />
              <input
                type="number"
                value={editingTutor.hourlyFee}
                onChange={(e) => setEditingTutor({ ...editingTutor, hourlyFee: Number(e.target.value) })}
                className="w-full px-6 py-4 border rounded-3xl"
                placeholder="Hourly Fee"
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setEditingTutor(null)}
                  className="flex-1 py-4 border rounded-3xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-4 rounded-3xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTutors;