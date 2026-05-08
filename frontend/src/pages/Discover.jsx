import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const EMOJIS = ['🏝','🏔','🌆','🏜','🌊','🌿','🗻','🏕','🌴','🏖'];

export default function Explore() {
  const { isLoggedIn } = useAuth();

  const [trips,    setTrips]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [search,   setSearch]   = useState('');
  const [sort] = useState('Newest');

  // Booking state
  const [bookingId,  setBookingId]  = useState(null);  // trip id being booked
  const [booked,     setBooked]     = useState({});     // { tripId: true }
  const [bookError,  setBookError]  = useState({});     // { tripId: "msg" }
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    api.get('/trips')
      .then(({ data }) => setTrips(data))
      .catch(() => setTrips(DEMO_TRIPS))
      .finally(() => setLoading(false));
  }, []);

  // Sorted + filtered
  const displayed = trips
    .filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'Price ↑') return Number(a.price) - Number(b.price);
      if (sort === 'Price ↓') return Number(b.price) - Number(a.price);
      return 0; // newest — already sorted by server
    });

  const handleBook = async (trip) => {
    if (!isLoggedIn) { setAuthOpen(true); return; }
    if (booked[trip.id]) return; // already booked

    setBookingId(trip.id);
    setBookError(prev => ({ ...prev, [trip.id]: '' }));
    try {
      await api.post('/bookings', { trip_id: trip.id });
      setBooked(prev => ({ ...prev, [trip.id]: true }));
      setSelectedTrip(trip);
    } catch (err) {
      const msg = err.response?.data?.detail || 'Booking failed. Try again.';
      setBookError(prev => ({ ...prev, [trip.id]: msg }));
    } finally {
      setBookingId(null);
    }
  };

  return (
    <>
    <div className="min-h-screen pb-20">
      <Navbar onLoginClick={() => setAuthOpen(true)} />

      <main className="pt-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            
            
            className="mb-12"
          >
            <h1 className="section-title mb-3">
              Discover Your <span className="gradient-text">Next Tribe</span>
            </h1>
            <p className="section-subtitle" style={{ color: 'var(--text-muted)' }}>
              From the peaks of the Himalayas to the golden sands of Goa, find a group of friends waiting to explore India with you.
            </p>

            {/* Search + Sort */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
                <input
                  id="explore-search"
                  className="input-field pl-12 py-4 rounded-2xl"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--bg-card-border)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Search by destination..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-80 rounded-[2rem]" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayed.map((trip, i) => {
                  const isBooking = bookingId === trip.id;
                  const isBooked  = booked[trip.id];
                  const errMsg    = bookError[trip.id];

                  return (
                    <div
                      key={trip.id}
                      className="glass rounded-[2.5rem] p-6 hover:translate-y-[-8px] transition-all duration-500 group"
                      
                      
                      
                    >
                      {/* Image Area */}
                      <div className="h-48 rounded-[2rem] overflow-hidden mb-6 relative bg-slate-900">
                        {trip.cover_image_url ? (
                          <img
                            src={trip.cover_image_url}
                            alt={trip.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl opacity-50">
                            {EMOJIS[i % EMOJIS.length]}
                          </div>
                        )}
                        
                        {isBooked && (
                          <div className="absolute inset-0 bg-accent/80 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-white font-bold tracking-widest uppercase text-xs">Booked</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-3 text-[10px] font-bold uppercase tracking-widest text-accent">
                        <span>📍 {trip.location}</span>
                        {trip.start_date && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                            <span>📅 {new Date(trip.start_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-3 leading-tight" style={{ color: 'var(--text-primary)' }}>
                        {trip.title}
                      </h3>

                      <p className="text-sm line-clamp-2 mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {trip.description}
                      </p>

                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                          3 days group trip
                        </span>
                        <button
                          onClick={() => handleBook(trip)}
                          disabled={isBooking || isBooked}
                          className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                            isBooked 
                              ? 'opacity-40' 
                              : 'hover:scale-105 active:scale-95 shadow-lg'
                          }`}
                          style={{
                            backgroundColor: isBooked ? 'var(--bg-secondary)' : 'var(--accent)',
                            color:           isBooked ? 'var(--text-muted)' : 'var(--bg-primary)'
                          }}
                        >
                          {isBooking ? '...' : isBooked ? 'Reserved' : 'Join Trip'}
                        </button>
                      </div>
                      
                      {errMsg && (
                        <p className="text-[10px] text-red-400 mt-3 text-center">{errMsg}</p>
                      )}
                    </div>
                  );
                })}

                {displayed.length === 0 && (
                  <div className="col-span-full text-center py-32 opacity-30">
                    <div className="text-6xl mb-6">🏜️</div>
                    <p className="text-xl font-medium tracking-tight">No adventures found here yet.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Booking success overlay */}
      
        {selectedTrip && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedTrip(null)}
          >
            <div
              
              
              
              
              className="glass w-full max-w-md mx-4 p-10 text-center"
              style={{ zIndex: 201 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold gradient-text mb-2">
                You&apos;re going!
              </h2>
              <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                Your booking for
              </p>
              <p className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                {selectedTrip.title}
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                📍 {selectedTrip.location}
              </p>
              <div className="flex gap-3 justify-center">
                <a href="/trips" className="btn-primary">View My Trips</a>
                <button onClick={() => setSelectedTrip(null)} className="btn-ghost">
                  Continue Exploring
                </button>
              </div>
            </div>
          </div>
        )}
      

      <Footer />
    </div>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}

// Fallback demo data when backend isn't running
const DEMO_TRIPS = [];

