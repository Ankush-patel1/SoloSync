import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ onClose }) {
  const [tab, setTab]       = useState('login');
  const [form, setForm]     = useState({ name: '', email: '', password: '', role: 'traveler' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { login } = useAuth();
  const navigate  = useNavigate();

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (tab === 'login') {
        const { data } = await api.post('/auth/login', {
          email:    form.email,
          password: form.password,
        });
        login(data.access_token, data.user);
        setSuccess('Welcome back! ✈');
        setTimeout(() => {
          onClose();
          navigate('/discover');
        }, 900);
      } else {
        await api.post('/auth/register', {
          name:     form.name,
          email:    form.email,
          password: form.password,
          role:     form.role,
        });
        setSuccess('Account created! Please sign in.');
        setTimeout(() => { setTab('login'); setSuccess(''); }, 1200);
      }
    } catch (err) {
      console.error('Auth Error:', err);
      if (!err.response) {
        setError('Could not connect to the server. Please check your connection.');
      } else {
        const data = err.response.data;
        const detail = data?.detail;
        
        if (Array.isArray(detail)) {
          // Handle FastAPI validation error list
          setError(detail[0]?.msg || 'Validation failed.');
        } else if (typeof detail === 'string') {
          setError(detail);
        } else if (data?.message) {
          setError(data.message);
        } else {
          setError(JSON.stringify(data) || 'Something went wrong. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        
        
        
        
        className="glass w-full max-w-md mx-4 p-8 relative"
        style={{ zIndex: 201 }}
      >
        {/* Close */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-lg"
          style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}
        >
          ✕
        </button>

        {/* Title */}
        <div className="mb-6">
          <span className="text-2xl">✈</span>
          <h2 className="text-2xl font-bold mt-2 gradient-text">
            {tab === 'login' ? 'Welcome Back' : 'Join SoloSync'}
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {tab === 'login'
              ? 'Sign in to access your trips and bookings.'
              : 'Create a free account and start exploring.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl p-1 mb-6" style={{ background: 'var(--bg-secondary)' }}>
          {['login', 'register'].map(t => (
            <button
              key={t}
              id={`auth-tab-${t}`}
              onClick={() => { setTab(t); setError(''); setSuccess(''); }}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize"
              style={{
                background: tab === t ? 'var(--accent)' : 'transparent',
                color:      tab === t ? 'var(--bg-primary)' : 'var(--text-muted)',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Full Name
              </label>
              <input
                id="auth-name"
                className="input-field"
                type="text"
                placeholder="Alex Johnson"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Email
            </label>
            <input
              id="auth-email"
              className="input-field"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Password
            </label>
            <input
              id="auth-password"
              className="input-field"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => update('password', e.target.value)}
              required
              minLength={6}
            />
          </div>

          {tab === 'register' && (
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                I want to…
              </label>
              <div className="flex gap-3">
                {[
                  { val: 'traveler', label: '🧭 Travel' },
                  { val: 'host',     label: '🏡 Host'   },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => update('role', val)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background:  form.role === val ? 'var(--accent)' : 'var(--bg-secondary)',
                      color:       form.role === val ? 'var(--bg-primary)' : 'var(--text-muted)',
                      border:      '1.5px solid',
                      borderColor: form.role === val ? 'var(--accent)' : 'var(--bg-card-border)',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm rounded-xl px-4 py-2.5" style={{ color: '#E57373', background: 'rgba(229,115,115,0.1)' }}>
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm rounded-xl px-4 py-2.5" style={{ color: '#34d399', background: 'rgba(52,211,153,0.1)' }}>
              {success}
            </p>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            className="btn-primary justify-center mt-1"
            disabled={loading}
          >
            {loading ? 'Please wait…' : tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
