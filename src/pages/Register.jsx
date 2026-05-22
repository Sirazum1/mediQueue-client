import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  document.title = 'MediQueue - Register';
}, []);

  const validatePassword = (pass) => {
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const isLongEnough = pass.length >= 6;
    return hasUpper && hasLower && isLongEnough;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.');
      toast.error('Invalid password format');
      return;
    }

    const success = await register(name, email, password, photoURL);
    if (success) navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-10 rounded-3xl shadow">
      <h2 className="text-4xl font-bold text-center mb-8">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-6 py-4 border rounded-3xl" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 border rounded-3xl" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 border rounded-3xl" required />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input type="text" placeholder="Photo URL (optional)" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} className="w-full px-6 py-4 border rounded-3xl" />
        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-3xl text-xl font-semibold">Register</button>
      </form>
      <p className="text-center mt-6">
        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
};

export default Register;