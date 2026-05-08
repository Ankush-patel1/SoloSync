import { useState, useEffect } from 'react';
import api from '../services/api';

const EMOJIS = ['🏝','🏔','🌆','🏜','🌊','🌿','🗻','🏕','🌴','🏖'];

export default function ExploreSection() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/trips')
      .then(({ data }) => setTrips(data.slice(0, 3)))
      .catch(() => setTrips([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-32 px-6" id="explore">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Discover <span className="gradient-text">Experiences</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Hand-picked journeys designed for solo travelers. Find your tribe and explore India like never before.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="skeleton h-80 rounded-[3rem]" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trips.map((trip, i) => (
              <div
                key={trip.id}
                className="glass p-6 rounded-[2.5rem] group cursor-pointer"
              >
                <div className="h-48 rounded-[2rem] overflow-hidden mb-6 relative">
                  {trip.cover_image_url ? (
                    <img src={trip.cover_image_url} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-white/5">{EMOJIS[i % EMOJIS.length]}</div>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2">{trip.title}</h3>
                <p className="text-sm opacity-60 mb-6">📍 {trip.location}</p>
                <a href="/discover" className="btn-ghost py-3 w-full justify-center">Join Tribe</a>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <a href="/discover" className="btn-primary px-10 py-4">View All Trips</a>
        </div>
      </div>
    </section>
  );
}
