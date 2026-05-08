import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function History() {
  const { isLoggedIn } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return; }
    api.get('/bookings/me')
      .then(({ data }) => {
        // Show only cancelled or past trips
        const now = new Date();
        const past = data.filter(b => b.status === 'cancelled' || (b.trip?.start_date && new Date(b.trip.start_date) < now));
        setBookings(past);
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  return (
    <>
      <div className="min-h-screen">
        <Navbar onLoginClick={() => setAuthOpen(true)} />
        
        <main className="pt-32 px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div
              
              
              className="mb-12"
            >
              <h1 className="section-title mb-2">
                Trip <span className="gradient-text">History</span>
              </h1>
              <p className="section-subtitle">Memories from your past solo adventures.</p>
            </div>

            {!isLoggedIn ? (
              <div className="glass p-20 text-center rounded-[3rem]">
                <h2 className="text-2xl font-bold mb-6">Login to view your history</h2>
                <button onClick={() => setAuthOpen(true)} className="btn-primary">Sign In</button>
              </div>
            ) : loading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map(i => <div key={i} className="skeleton h-32 rounded-3xl" />)}
              </div>
            ) : bookings.length === 0 ? (
              <div className="glass p-20 text-center rounded-[3rem]">
                <p className="opacity-60 italic">No past trips yet. Time to start a new journey!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="glass p-8 rounded-3xl flex items-center justify-between opacity-70 grayscale-[0.5] hover:grayscale-0 transition-all">
                    <div>
                      <h3 className="text-xl font-bold">{booking.trip?.title || 'Adventure'}</h3>
                      <p className="text-sm opacity-60">📍 {booking.trip?.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black uppercase tracking-widest block mb-1">
                        {booking.status === 'cancelled' ? '❌ Cancelled' : '✅ Completed'}
                      </span>
                      <p className="text-xs opacity-40">{booking.trip?.start_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
