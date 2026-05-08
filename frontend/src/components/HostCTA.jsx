import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HostCTA({ onLoginClick }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleHostClick = () => {
    if (!isLoggedIn) {
      onLoginClick();
    } else {
      navigate('/host');
    }
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[3rem] overflow-hidden flex flex-col lg:flex-row min-h-[550px]">
          {/* Image Side */}
          <div className="lg:w-1/2 relative min-h-[400px] bg-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
              alt="Indian Mountains Trekking"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Explore+India';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:hidden" />
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-white/5 backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-6">
              <span className="w-8 h-[1px] bg-accent"></span>
              Become a Lead
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Want to add people to your trip? <br />
              <span className="gradient-text">Host your own.</span>
            </h2>
            <p className="text-muted text-lg mb-12 leading-relaxed">
              Share your Indian travel expertise. From the peaks of Himachal to the beaches of Varkala, lead a tribe of solo travelers on an unforgettable journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleHostClick}
                className="btn-primary px-10 py-4 text-base"
              >
                Start Hosting Now
              </button>
              <button 
                onClick={() => navigate('/explore')}
                className="btn-ghost px-10 py-4 text-base"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
