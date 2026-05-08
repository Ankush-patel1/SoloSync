import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const REVIEWS = [
  {
    name: 'Ananya Iyer',
    text: 'SoloSync changed how I travel. Found my best friends on a trek in Spiti!',
    initials: 'AI'
  },
  {
    name: 'Rohan Mehra',
    text: 'The most immersive travel platform in India. Bir Billing was a dream.',
    initials: 'RM'
  }
];

export default function CommunityGrid({ onLoginClick }) {
  const { isLoggedIn } = useAuth();
  const [newReview, setNewReview] = useState('');
  const navigate = useNavigate();

  const handlePostReview = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      onLoginClick();
    } else {
      // In a real app, we would post to the backend here
      alert('Review posted! (Simulation)');
      setNewReview('');
    }
  };

  return (
    <section id="community" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[600px]">
          
          {/* Join Trips Card */}
          <div 
            onClick={() => navigate('/discover')}
            className="relative group rounded-3xl overflow-hidden cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop")' }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h3 className="text-3xl font-bold text-white mb-4">Join Trips</h3>
              <p className="text-white/80 text-sm max-w-[240px] mb-6">
                Discover curated Indian adventures and find your next group of friends.
              </p>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-white group-hover:text-black transition-all">
                →
              </div>
            </div>
          </div>

          {/* Travel Solo Card */}
          <div 
            onClick={() => navigate('/discover')}
            className="relative group rounded-3xl overflow-hidden cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop")' }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h3 className="text-3xl font-bold text-white mb-4">Travel Solo, Together</h3>
              <p className="text-white/80 text-sm max-w-[240px] mb-6">
                Experience the world on your terms while being part of a global community.
              </p>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-white group-hover:text-black transition-all">
                →
              </div>
            </div>
          </div>

          {/* Reviews & Leave a Review Column */}
          <div className="flex flex-col gap-6">
            {/* Reviews List */}
            <div className="glass p-8 rounded-3xl flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">✨</span> Reviews
              </h3>
              <div className="flex flex-col gap-6 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-accent-glow flex items-center justify-center text-[10px] font-bold text-accent">
                        {r.initials}
                      </div>
                      <span className="text-sm font-semibold">{r.name}</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      &ldquo;{r.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave a Review Form */}
            <div className="glass p-8 rounded-3xl">
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-accent">Leave a review</h4>
              <form onSubmit={handlePostReview} className="flex flex-col gap-4">
                <textarea
                  className="input-field min-h-[100px] text-sm py-4"
                  placeholder="Share your experience with the world..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <button 
                  type="submit" 
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
                    isLoggedIn 
                      ? 'bg-accent text-bg-primary hover:scale-[1.02]' 
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {isLoggedIn ? 'Post Review' : 'Login to Post'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
