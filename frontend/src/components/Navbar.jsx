import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
// import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';



export default function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  // const { isDark } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropRef = useRef(null);

  const navLinks = isLoggedIn ? [
    { label: 'Find Trips', to: '/discover' },
    { label: 'My Trips', to: '/my-trips' },
    { label: 'History', to: '/history' },
    { label: 'Host a Trip', to: '/host' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Explore India', to: '/explore-india' },
  ] : [
    { label: 'Home', to: '/' },
    { label: 'Explore', to: '/#explore' },
    { label: 'Community', to: '/#community' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const handleLogout = () => {
    logout();
    setDropOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${(scrolled || location.pathname !== '/')
          ? 'py-4 shadow-2xl border-b'
          : 'py-6 bg-transparent'
        }`}
      style={{
        backgroundColor: (scrolled || location.pathname !== '/') ? 'var(--bg-navbar)' : 'transparent',
        borderColor: (scrolled || location.pathname !== '/') ? 'var(--bg-card-border)' : 'transparent',
        backdropFilter: (scrolled || location.pathname !== '/') ? 'blur(20px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-2xl no-underline group"
        >
          <span className="text-3xl transition-transform group-hover:rotate-12 duration-300">✈</span>
          <span
            className="tracking-tight"
            style={{ color: (scrolled || location.pathname !== '/') ? 'var(--text-primary)' : 'white' }}
          >
            SoloSync
          </span>
        </Link>        {/* Center: Navigation */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ label, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                onClick={(e) => {
                  if (to.includes('#')) {
                    const id = to.split('#')[1];
                    const el = document.getElementById(id);
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="relative py-2 text-sm font-bold transition-colors no-underline group px-2"
                style={{
                  color: isActive
                    ? ((scrolled || location.pathname !== '/') ? 'var(--accent)' : 'white')
                    : ((scrolled || location.pathname !== '/') ? 'var(--text-primary)' : 'rgba(255,255,255,0.9)')
                }}
              >
                <span className="group-hover:opacity-100 transition-opacity drop-shadow-md">{label}</span>
                {isActive && (
                  <div
                    
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 xl:gap-6">
          <ThemeToggle />

          {isLoggedIn ? (
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen(p => !p)}
                className="flex items-center gap-2 p-1 pl-3 rounded-full bg-black/20 backdrop-blur-md border border-white/20 hover:bg-black/30 transition-all group"
              >
                <span className="text-xs font-bold hidden sm:block truncate max-w-[100px]" style={{ color: 'white' }}>
                  {user?.name || 'User'}
                </span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg group-hover:scale-105 transition-transform"
                  style={{ background: 'var(--gradient-accent)' }}
                >
                  {initials}
                </div>
              </button>

              
                {dropOpen && (
                  <div
                    className="absolute right-0 mt-4 w-56 glass rounded-3xl py-3 border border-white/10 shadow-2xl overflow-hidden"
                  >
                    <Link 
                      to="/dashboard"
                      className="block px-5 py-3 mb-2 border-b border-white/5 no-underline hover:bg-white/5 transition-colors"
                      onClick={() => setDropOpen(false)}
                    >
                      <div className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{user?.name}</div>
                      <div className="text-[10px] uppercase tracking-widest mt-1 opacity-60" style={{ color: 'var(--text-secondary)' }}>{user?.role}</div>
                      <div className="text-[9px] font-bold text-accent mt-2 uppercase tracking-tighter">Edit Profile →</div>
                    </Link>

                    <div className="mt-2 pt-2 border-t border-white/5">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 relative"
          >
            <div
              className={`w-6 h-0.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2 bg-white' : ''}`}
              style={{ backgroundColor: menuOpen ? 'white' : (scrolled || location.pathname !== '/') ? 'var(--text-primary)' : 'white' }}
            />
            <div
              className={`w-6 h-0.5 transition-all ${menuOpen ? 'opacity-0 bg-white' : ''}`}
              style={{ backgroundColor: menuOpen ? 'white' : (scrolled || location.pathname !== '/') ? 'var(--text-primary)' : 'white' }}
            />
            <div
              className={`w-6 h-0.5 transition-all ${menuOpen ? '-rotate-45 -translate-y-2 bg-white' : ''}`}
              style={{ backgroundColor: menuOpen ? 'white' : (scrolled || location.pathname !== '/') ? 'var(--text-primary)' : 'white' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      
        {menuOpen && (
          <div
            
            
            
            
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col p-8 pt-32 lg:hidden"
          >
            {navLinks.map(({ label, to }) => (
              <div
                
                
                
                key={label}
              >
                <Link
                  to={to}
                  className="text-3xl font-bold text-white py-4 no-underline block"
                >
                  {label}
                </Link>
              </div>
            ))}

            <div className="mt-auto border-t border-white/10 pt-8 flex flex-col gap-6">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="text-xl text-red-400 font-medium">Logout</button>
              ) : (
                <button onClick={onLoginClick} className="btn-primary text-xl py-4 justify-center">Login</button>
              )}
            </div>
          </div>
        )}
      
    </nav>
  );
}
