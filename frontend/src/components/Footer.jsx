import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 no-underline">
              <span className="text-3xl">✈</span>
              <span className="font-display text-2xl font-bold tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                SoloSync
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: 'var(--text-muted)' }}>
              India&apos;s premier cinematic solo travel platform. We connect independent explorers with curated group experiences across the subcontinent.
            </p>
            <div className="flex gap-4">
              {['𝕏', '📸', '📽️', '💼'].map((icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  style={{ color: 'var(--text-muted)', borderColor: 'var(--bg-card-border)' }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {[
            {
              title: 'Discover',
              links: [
                { label: 'Discover',  to: '/discover'  },
                { label: 'Community', to: '/community' },
                { label: 'My Trips',  to: '/trips'     },
              ],
            },
            {
              title: 'Journey',
              links: [
                { label: 'About Us', to: '#' },
                { label: 'Safety', to: '#' },
                { label: 'Careers', to: '#' },
                { label: 'Contact', to: '#' },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-6" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                {col.title}
              </h4>
              <ul className="space-y-4 p-0 list-none">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm hover:opacity-100 transition-opacity no-underline font-medium"
                      style={{ color: 'var(--text-secondary)', opacity: 0.7 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal & Copyright */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
          <p>© {year} SoloSync India. Crafted for the restless soul.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-white transition-colors no-underline">Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors no-underline">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors no-underline">Safety</Link>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
}
