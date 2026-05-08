import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Host() {
  const { user, isLoggedIn, updateUser } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [form, setForm] = useState({ title: '', location: '', description: '', price: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('ss_token');

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) { setAuthOpen(true); return; }
    setLoading(true);
    try {
      await api.post('/trips', { ...form, price: Number(form.price) });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className="min-h-screen pb-20">
        <Navbar onLoginClick={() => setAuthOpen(true)} />
        
        <main className="pt-32 px-6">
            <div className="max-w-2xl mx-auto">
            <div>
              <div className="text-5xl mb-6">⛺</div>
              <h1 className="section-title mb-4">
                Host a <span className="gradient-text">Trip</span>
              </h1>
              <p className="section-subtitle mb-12" style={{ color: 'var(--text-muted)' }}>
                Lead a group of solo explorers. Share your expertise and build your community.
              </p>

              {!isLoggedIn ? (
                <div className="glass p-16 text-center rounded-[3rem]">
                  <h2 className="text-2xl font-bold mb-6">Sign in to Host</h2>
                  <button onClick={() => setAuthOpen(true)} className="btn-primary px-8">Login</button>
                </div>
              ) : submitted ? (
                <div className="glass p-16 text-center rounded-[3rem]">
                  <div className="text-6xl mb-6">🎊</div>
                  <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Journey Registered!</h2>
                  <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Your experience is now live. Travelers can discover and join your tribe from the Discover page.
                  </p>
                  <div className="mt-10 flex gap-4 justify-center">
                    <a href="/explore" className="btn-primary px-8">View Listings</a>
                    <button onClick={() => setSubmitted(false)} className="btn-ghost px-8">Host Another</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass p-10 rounded-[3rem] flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { key: 'title',    label: 'Experience Title', ph: 'e.g. Spiti Valley Expedition', type: 'text' },
                      { key: 'location', label: 'Destination',      ph: 'e.g. Kaza, Himachal Pradesh',  type: 'text' },
                    ].map(({ key, label, ph, type }) => (
                      <div key={key}>
                        <label className="block text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                          {label}
                        </label>
                        <input
                          id={`host-${key}`}
                          className="input-field py-4 rounded-2xl"
                          style={{ 
                            backgroundColor: 'var(--bg-secondary)', 
                            borderColor: 'var(--bg-card-border)',
                            color: 'var(--text-primary)'
                          }}
                          type={type}
                          placeholder={ph}
                          value={form[key]}
                          onChange={e => update(key, e.target.value)}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                      Detailed Itinerary & Vibe
                    </label>
                    <textarea
                      id="host-description"
                      className="input-field py-4 rounded-2xl min-h-[160px]"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--bg-card-border)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder="Share the magic. What's the plan? What makes this trip special? Who's it for?..."
                      value={form.description}
                      onChange={e => update('description', e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 bg-red-400/10 rounded-2xl px-6 py-4 border border-red-400/20">{error}</p>
                  )}

                  <button
                    id="host-submit-btn"
                    type="submit"
                    className="btn-primary py-5 rounded-[1.5rem] text-base font-bold shadow-2xl shadow-accent/20"
                    disabled={loading}
                  >
                    {loading ? 'Publishing...' : token ? 'Publish Experience' : 'Sign In to Publish'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
        <Footer />
        {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      </div>
    </>
  );
}
