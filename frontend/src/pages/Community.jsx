import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

const GALLERY = [
  {
    id: 1,
    title: 'Sunrise at Pangong Lake',
    author: 'Arjun Das',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop',
    avatar: 'AD'
  },
  {
    id: 2,
    title: 'Group Trek to Triund',
    author: 'Sanya Malhotra',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop',
    avatar: 'SM'
  },
  {
    id: 3,
    title: 'Rishikesh Rafting Squad',
    author: 'Vikram Singh',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2070&auto=format&fit=crop',
    avatar: 'VS'
  },
  {
    id: 4,
    title: 'Star Gazing in Spiti',
    author: 'Neha Kapoor',
    image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=2070&auto=format&fit=crop',
    avatar: 'NK'
  },
  {
    id: 5,
    title: 'Kerala Backwaters Bliss',
    author: 'Rahul Verma',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
    avatar: 'RV'
  },
  {
    id: 6,
    title: 'Jaipur Heritage Walk',
    author: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop',
    avatar: 'PS'
  }
];

export default function Community() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen pb-20">
      <Navbar onLoginClick={() => setAuthOpen(true)} />

      <main className="pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            
            
            className="text-center mb-16"
          >
            <h1 className="section-title mb-4">
              Our <span className="gradient-text">Community</span>
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Real people, real stories. Dive into the experiences of solo travelers who found their tribe with SoloSync.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {GALLERY.map((item) => (
              <div
                key={item.id}
                
                
                
                className="relative group rounded-[2.5rem] overflow-hidden break-inside-avoid glass border-white/5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                      {item.avatar}
                    </div>
                    <span className="text-white/80 text-sm font-medium">{item.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            
            
            className="mt-24 glass p-16 rounded-[4rem] text-center max-w-4xl mx-auto border-white/5"
          >
            <div className="text-5xl mb-8">📸</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Share Your Journey</h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Every trip has a story. Be the inspiration for someone&apos;s next adventure by sharing your SoloSync moments.
            </p>
            <button 
              onClick={() => setAuthOpen(true)}
              className="btn-primary px-10 py-4 text-base"
            >
              Upload Experience
            </button>
          </div>
        </div>
      </main>

      <Footer />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  );
}
