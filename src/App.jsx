import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Tutors from './pages/Tutors';
import TutorDetails from './pages/TutorDetails';
import AddTutor from './pages/AddTutor';
import MyTutors from './pages/MyTutors';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/tutor/:id" element={<TutorDetails />} />

            <Route element={<PrivateRoute />}>
              <Route path="/add-tutor" element={<AddTutor />} />
              <Route path="/my-tutors" element={<MyTutors />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;