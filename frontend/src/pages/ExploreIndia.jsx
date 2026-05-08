import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

const DESTINATIONS = [
  { id: 1, name: 'Spiti Valley', state: 'Himachal Pradesh', type: 'underrated', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Spiti_River_Kaza_Himachal_Jun18_D72_7232.jpg/1280px-Spiti_River_Kaza_Himachal_Jun18_D72_7232.jpg', description: 'A cold desert mountain valley.' },
  { id: 2, name: 'Ziro Valley', state: 'Arunachal Pradesh', type: 'underrated', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/A_cross_section_of_luch_green_valley_of_Ziro.jpg/1280px-A_cross_section_of_luch_green_valley_of_Ziro.jpg', description: 'Famous for its pine hills and rice fields.' },
  { id: 3, name: 'Varkala', state: 'Kerala', type: 'popular', image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Varkala_Beach%2C_Varkala%2C_Kerala.jpg', description: 'Cliff-side beaches and spirituality.' },
  { id: 4, name: 'Leh Ladakh', state: 'Ladakh', type: 'popular', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg/1280px-Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg', description: 'High-altitude desert and monasteries.' },
  { id: 5, name: 'Gokarna', state: 'Karnataka', type: 'underrated', image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Delight_india.jpg', description: 'Prisinte beaches and temple town.' },
  { id: 6, name: 'Munnar', state: 'Kerala', type: 'popular', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/1280px-Munnar_Overview.jpg', description: 'Tea plantations and misty hills.' },
  { id: 7, name: 'Rishikesh', state: 'Uttarakhand', type: 'popular', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/1280px-Trayambakeshwar_Temple_VK.jpg', description: 'The Yoga Capital of the World and gateway to the Himalayas.' },
  { id: 8, name: 'Hampi', state: 'Karnataka', type: 'popular', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg/1280px-Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg', description: 'Ancient ruins of the Vijayanagara Empire amidst a boulder-strewn landscape.' },
  { id: 9, name: 'Jaisalmer', state: 'Rajasthan', type: 'popular', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jaisalmer_Fort.jpg/1280px-Jaisalmer_Fort.jpg', description: 'The Golden City, famous for its yellow sandstone architecture and the Thar Desert.' },
  { id: 10, name: 'Tawang', state: 'Arunachal Pradesh', type: 'underrated', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/TawangMonastery-ArunachalPradesh-1.jpg/1280px-TawangMonastery-ArunachalPradesh-1.jpg', description: 'Home to one of the largest monasteries in the world and stunning Himalayan views.' },
  { id: 11, name: 'Majuli', state: 'Assam', type: 'underrated', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Doriya_River_of_Majuli.jpg/1280px-Doriya_River_of_Majuli.jpg', description: 'The largest river island in the world, rich in Assamese neo-Vaishnavite culture.' },
  { id: 12, name: 'Alleppey', state: 'Kerala', type: 'popular', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/1280px-Alappuzha_Boat_Beauty_W.jpg', description: 'Famous for its houseboat cruises through serene backwaters.' },
];

export default function ExploreIndia() {
  const [filter, setFilter] = useState('all');
  const [authOpen, setAuthOpen] = useState(false);

  const filtered = filter === 'all' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.type === filter);

  return (
    <>
      <div className="min-h-screen">
        <Navbar onLoginClick={() => setAuthOpen(true)} />
        
        <main className="pt-32 px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div
              
              
              className="mb-12 text-center"
            >
              <h1 className="section-title mb-6">
                Explore <span className="gradient-text">India</span>
              </h1>
              <p className="section-subtitle mx-auto">
                From the majestic Himalayas to the serene backwaters, discover the soul of the subcontinent.
              </p>
            </div>

            {/* Filters */}
            <div className="flex justify-center gap-4 mb-16">
              {['all', 'popular', 'underrated'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    filter === f ? 'bg-accent text-primary shadow-xl scale-105' : 'glass opacity-60 hover:opacity-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
                {filtered.map((dest) => (
                  <div
                    key={dest.id}
                    
                    
                    
                    
                    
                    className="glass rounded-[2.5rem] overflow-hidden group cursor-pointer"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img 
                        src={dest.image} 
                        alt={dest.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                          {dest.state}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{dest.name}</h3>
                      <p className="text-sm opacity-60 leading-relaxed mb-6">
                        {dest.description}
                      </p>
                      <button className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2 group/btn">
                        Learn More 
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              
            </div>
          </div>
        </main>

        <Footer />
      </div>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
