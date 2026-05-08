import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS = {
  confirmed: { bg: 'rgba(52,211,153,0.15)', text: '#34d399' },
  pending:   { bg: 'rgba(245,166,35,0.15)',  text: '#f5a623' },
  cancelled: { bg: 'rgba(248,113,113,0.15)', text: '#f87171' },
};

const EMOJIS = ['🏝', '🏔', '🌆', '🏜', '🌊', '🌿', '🗻', '🏕', '🌴', '🏖'];

export default function Trips() {
  const { isLoggedIn } = useAuth();
  // const navigate = useNavigate();

  const [bookings,  setBookings]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [authOpen,  setAuthOpen]  = useState(false);
  const [cancelId,  setCancelId]  = useState(null);
  const [filter,    setFilter]    = useState('all'); // all | confirmed | pending | cancelled

  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return; }
    api.get('/bookings/me')
      .then(({ data }) => setBookings(data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleCancel = async (bookingId) => {
    setCancelId(bookingId);
    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b)
      );
    } catch {
      // silently fail — server may already have cancelled it
    } finally {
      setCancelId(null);
    }
  };

  const filtered = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  const counts = {
    all:       bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending:   bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <>
      <div className="min-h-screen pb-20">
        <Navbar onLoginClick={() => setAuthOpen(true)} />

        <main className="pt-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="section-title mb-3">
                My <span className="gradient-text">Bookings</span>
              </h1>
              <p className="section-subtitle" style={{ color: 'var(--text-muted)' }}>
                Manage your upcoming and past trips across India.
              </p>
            </div>

            {!isLoggedIn ? (
              <div className="glass p-20 text-center rounded-[3rem]">
                <div className="text-7xl mb-8">🗺️</div>
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Welcome back, traveler.
                </h2>
                <p className="max-w-md mx-auto mb-10 text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Sign in to access your booked experiences, manage your itinerary, and connect with your tribe.
                </p>
                <button onClick={() => setAuthOpen(true)} className="btn-primary px-10 py-4 text-base">
                  Sign In to Continue
                </button>
              </div>
            ) : (
              <>
                {/* Filter Tabs */}
                <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                  {['all', 'confirmed', 'pending', 'cancelled'].map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border ${
                        filter === f 
                          ? 'shadow-lg' 
                          : 'hover:opacity-80'
                      }`}
                      style={{
                        backgroundColor: filter === f ? 'var(--accent)' : 'var(--bg-secondary)',
                        borderColor:     filter === f ? 'var(--accent)' : 'var(--bg-card-border)',
                        color:           filter === f ? 'var(--bg-primary)' : 'var(--text-muted)',
                      }}
                    >
                      {f} ({counts[f]})
                    </button>
                  ))}
                </div>

                {loading ? (
                  <div className="flex flex-col gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="skeleton h-32 rounded-[2rem]" />)}
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="glass p-20 text-center rounded-[3rem]">
                    <div className="text-6xl mb-6 opacity-30">
                      {filter === 'cancelled' ? '🏜️' : '🎒'}
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                      {filter === 'all' ? 'Your journey starts here' : `No ${filter} adventures`}
                    </h3>
                    <p className="mb-10" style={{ color: 'var(--text-muted)' }}>
                      {filter === 'all'
                        ? 'Ready to explore India? Discover your next tribe and start booking.'
                        : `You have no experiences currently marked as ${filter}.`}
                    </p>
                    <a href="/discover" className="btn-ghost px-10 py-4">Explore Adventures</a>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                      {filtered.map((booking, i) => {
                        const trip = booking.trip || {};
                        const colors = STATUS_COLORS[booking.status] || STATUS_COLORS.pending;
                        
                        return (
                          <div
                            key={booking.id}
                            className="glass p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 group"
                          >
                            {/* Visual Indicator */}
                            <div className="w-20 h-20 rounded-[1.5rem] bg-accent/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                              {EMOJIS[i % EMOJIS.length]}
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center md:text-left">
                              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                  {trip.title || 'Adventure'}
                                </h3>
                                <span 
                                  className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter"
                                  style={{ background: colors.bg, color: colors.text }}
                                >
                                  {booking.status}
                                </span>
                              </div>
                              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                                <span>📍 {trip.location}</span>
                                {trip.start_date && (
                                  <span>📅 {new Date(trip.start_date).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</span>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                              {booking.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleCancel(booking.id)}
                                  disabled={cancelId === booking.id}
                                  className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest px-4 py-2"
                                >
                                  {cancelId === booking.id ? '...' : 'Cancel'}
                                </button>
                              )}
                              <button className="btn-ghost text-xs px-6 py-2 rounded-full border-white/10 hover:border-white/30">
                                Details
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
