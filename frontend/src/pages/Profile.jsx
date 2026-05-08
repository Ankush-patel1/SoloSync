import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';


export default function Profile() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab]           = useState('bookings');
  const [bookings, setBookings]  = useState([]);
  const [myTrips, setMyTrips]    = useState([]);
  const [loadingB, setLoadingB]  = useState(true);
  const [loadingT, setLoadingT]  = useState(true);
  const [authOpen, setAuthOpen]  = useState(false);
  const [cancelId, setCancelId] = useState(null);

  // Redirect guests to open auth modal instead
  useEffect(() => {
    if (!isLoggedIn) setAuthOpen(true);
  }, [isLoggedIn]);

  // Load bookings
  useEffect(() => {
    if (!isLoggedIn) return;
    api.get('/bookings/me')
      .then(({ data }) => setBookings(data))
      .catch(() => setBookings([]))
      .finally(() => setLoadingB(false));
  }, [isLoggedIn]);

  // Load my hosted trips (for hosts)
  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'host') { setLoadingT(false); return; }
    api.get('/trips')
      .then(({ data }) => setMyTrips(data.filter(t => t.host_id === user.id)))
      .catch(() => setMyTrips([]))
      .finally(() => setLoadingT(false));
  }, [isLoggedIn, user]);

  const handleCancelBooking = async (bookingId) => {
    setCancelId(bookingId);
    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    } catch {
      // ignore
    } finally {
      setCancelId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const TABS = [
    { id: 'bookings', label: '🗺️ My Bookings' },
    ...(user?.role === 'host' ? [{ id: 'trips', label: '🏡 My Trips' }] : []),
    { id: 'account', label: '⚙️ Account' },
  ];

  return (
    <>
    <div className="min-h-screen pb-20">
      <Navbar onLoginClick={() => setAuthOpen(true)} />

      <main className="pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="section-title mb-3">
              Account <span className="gradient-text">Settings</span>
            </h1>
            <p className="section-subtitle" style={{ color: 'var(--text-muted)' }}>
              Manage your profile and travel preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left: Stats/Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="glass p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6 shadow-xl shadow-accent/20">
                  {initials}
                </div>
                <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{user?.name}</h2>
                <p className="text-xs mb-8" style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full btn-ghost text-red-400 border-red-400/20 hover:bg-red-400/10"
                >
                  Log Out
                </button>
              </div>
            </div>

            {/* Right: Tabs */}
            <div className="md:col-span-2">
              <div className="flex gap-4 mb-8">
                {TABS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                      tab === t.id 
                        ? 'shadow-lg' 
                        : 'hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: tab === t.id ? 'var(--accent)' : 'var(--bg-secondary)',
                      color:           tab === t.id ? 'var(--bg-primary)' : 'var(--text-muted)',
                    }}
                  >
                    {t.label.split(' ')[1]}
                  </button>
                ))}
              </div>

            {/* Tab Content */}
              {tab === 'bookings' && (
                <div key="bookings">
                  {loadingB ? (
                    <div className="grid gap-6">
                      {[1, 2].map(i => <div key={i} className="skeleton h-32 rounded-[2.5rem]" />)}
                    </div>
                  ) : bookings.length === 0 ? (
                    <EmptyState
                      icon="🎒"
                      title="No upcoming journeys"
                      desc="The mountains are calling. Find your next Indian escape on the Discover page."
                      cta="Start Exploring"
                      ctaHref="/discover"
                    />
                  ) : (
                    <div className="flex flex-col gap-6">
                      {bookings.map((b, i) => (
                        <div
                          key={b.id}
                          className="glass p-8 rounded-[2.5rem] flex items-center gap-6 group"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            {['🏔','🏜','🌆','🌊'][i % 4]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold mb-1 truncate" style={{ color: 'var(--text-primary)' }}>{b.trip?.title}</h3>
                            <div className="text-xs flex gap-4" style={{ color: 'var(--text-muted)' }}>
                              <span>📍 {b.trip?.location}</span>
                              <span>📅 {new Date(b.booked_at).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full bg-accent/10 text-accent">
                              {b.status}
                            </span>
                            <button onClick={() => handleCancelBooking(b.id)} disabled={cancelId === b.id} className="text-white/20 hover:text-red-400 transition-colors">
                              {cancelId === b.id ? '...' : 'Cancel'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === 'trips' && (
                <div key="trips">
                  {loadingT ? (
                    <div className="grid gap-6">
                      {[1, 2].map(i => <div key={i} className="skeleton h-32 rounded-[2.5rem]" />)}
                    </div>
                  ) : myTrips.length === 0 ? (
                    <EmptyState
                      icon="⛺"
                      title="No experiences listed"
                      desc="Share your expertise. Create a trip and lead solo travelers through India."
                      cta="Create a Trip"
                      ctaHref="/host"
                    />
                  ) : (
                    <div className="flex flex-col gap-6">
                      {myTrips.map((trip) => (
                        <div
                          key={trip.id}
                          className="glass p-8 rounded-[2.5rem] flex items-center gap-6"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">⛺</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold mb-1 truncate" style={{ color: 'var(--text-primary)' }}>{trip.title}</h3>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>📍 {trip.location}</p>
                          </div>
                          <a href="/host" className="btn-ghost text-xs px-6 py-2 rounded-full">Edit Trip</a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === 'account' && (
                <div key="account" className="flex flex-col gap-8">
                  {/* Personal Details */}
                  <div className="glass p-10 rounded-[3rem]">
                    <h2 className="text-2xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-primary)' }}>Personal Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      {[
                        { label: 'Full Name', value: user?.name },
                        { label: 'Email Address', value: user?.email },
                        { label: 'Account Status', value: user?.is_verified ? '🛡️ Verified Host' : '✅ Verified Explorer' },
                        { label: 'Member Since', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'Recent' },
                      ].map(({ label, value }) => (
                        <div key={label} className="border-b border-white/5 pb-4">
                          <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>{label}</label>
                          <p className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="glass p-10 rounded-[3rem]">
                    <h2 className="text-2xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-primary)' }}>Security</h2>
                    <div className="max-w-sm flex flex-col gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>Current Password</label>
                        <input
                          type="password"
                          id="current-password"
                          placeholder="••••••••"
                          className="input-field py-3 rounded-2xl w-full"
                          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-card-border)' }}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>New Password</label>
                        <div className="flex gap-4">
                          <input
                            type="password"
                            id="new-password"
                            placeholder="••••••••"
                            className="input-field py-3 rounded-2xl flex-1"
                            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-card-border)' }}
                          />
                          <button
                            onClick={async () => {
                              const currentPwd = document.getElementById('current-password').value;
                              const newPwd     = document.getElementById('new-password').value;
                              if (!currentPwd) return;
                              if (newPwd.length < 6) return;
                              try {
                                await api.put('/auth/password', { current_password: currentPwd, new_password: newPwd });
                                document.getElementById('current-password').value = '';
                                document.getElementById('new-password').value = '';
                              } catch (err) {
                                console.error('Password update failed:', err);
                              }
                            }}
                            className="btn-primary px-6 py-3 rounded-2xl text-xs"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    {authOpen && <AuthModal onClose={() => { setAuthOpen(false); if (!isLoggedIn) navigate('/'); }} />}
  </>
);
}

function EmptyState({ icon, title, desc, cta, ctaHref }) {
  return (
    <div className="glass p-20 text-center rounded-[3rem]">
      <div className="text-6xl mb-8 opacity-30">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="mb-10 max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
      <a href={ctaHref} className="btn-primary px-10 py-4 text-sm">{cta}</a>
    </div>
  );
}
