import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://mediqueue-server-txy3.onrender.com';

const AddTutor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    subject: '',
    availableDays: '',
    availableTime: '',
    hourlyFee: '',
    totalSlot: 10,
    sessionStartDate: '',
    institution: '',
    experience: '',
    location: '',
    teachingMode: 'Online'
  });

  useEffect(() => {
    document.title = 'MediQueue - Add Tutor';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/tutors`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Tutor added successfully!');
      navigate('/my-tutors');
    } catch (error) {
      toast.error('Failed to add tutor');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Add New Tutor</h1>
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Tutor Name" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" required />
          <input type="text" placeholder="Photo URL" onChange={e => setFormData({...formData, photo: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" required />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <select onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" required>
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="English">English</option>
            <option value="Computer Science">Computer Science</option>
          </select>
          <select onChange={e => setFormData({...formData, teachingMode: e.target.value})} className="w-full px-6 py-4 border rounded-3xl">
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <input type="text" placeholder="Available Days" onChange={e => setFormData({...formData, availableDays: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" required />
          <input type="text" placeholder="Available Time" onChange={e => setFormData({...formData, availableTime: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" required />
          <input type="number" placeholder="Hourly Fee" onChange={e => setFormData({...formData, hourlyFee: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" required />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <input type="number" placeholder="Total Slots" value={formData.totalSlot} onChange={e => setFormData({...formData, totalSlot: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" />
          <input type="date" onChange={e => setFormData({...formData, sessionStartDate: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" required />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Institution" onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" required />
          <input type="text" placeholder="Experience" onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" required />
        </div>

        <input type="text" placeholder="Location (City)" onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-6 py-4 border rounded-3xl" required />

        <button type="submit" className="w-full bg-blue-600 text-white py-5 text-xl rounded-3xl font-semibold hover:bg-blue-700">
          Add Tutor
        </button>
      </form>
    </div>
  );
};

export default AddTutor;