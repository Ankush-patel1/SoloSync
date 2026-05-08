import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const { isDark } = useTheme();

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(to bottom, #0f172a, #1e293b, #334155)'
          : 'linear-gradient(to bottom, #bce0f0, #e6edd9, #f7ecd7)'
      }}
      id="hero"
    >
      {/* Floating Image element */}
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 hidden lg:block z-0">
        <img 
          src="/hero_umbrella.png" 
          alt="Umbrella on sand" 
          className="w-64 h-64 object-cover shadow-2xl -rotate-12 rounded-sm opacity-90 transition-transform duration-700 hover:rotate-0 hover:scale-105"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mt-16">
        {/* Title */}
        <h1 
          className="text-6xl md:text-8xl font-bold tracking-tight mb-4"
          style={{
            color: isDark ? '#e2e8f0' : '#1e4b6d',
            textShadow: isDark 
              ? '2px 4px 6px rgba(0,0,0,0.5), -1px -1px 0 rgba(255,255,255,0.1)'
              : '2px 4px 6px rgba(0,0,0,0.2), -1px -1px 0 rgba(255,255,255,0.5)',
          }}
        >
          SoloSync
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm md:text-base font-medium mb-12" style={{ color: isDark ? '#94a3b8' : '#335c7a' }}>
          Find your next trip, or host one yourself.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-lg flex items-center shadow-lg rounded-2xl bg-white/80 backdrop-blur-md px-4 py-3 transition-shadow hover:shadow-xl">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-gray-500 mr-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Where to next?" 
            className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 font-medium text-sm md:text-base"
          />
          <button className="ml-2 bg-[#0a2342] text-white p-2 rounded-lg hover:bg-[#123158] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a2342]">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] mb-3 uppercase" style={{ color: isDark ? '#94a3b8' : '#57768e' }}>
          Scroll to explore
        </span>
        <div className="w-[1px] h-8 bg-current" style={{ color: isDark ? '#94a3b8' : '#57768e' }}></div>
      </div>
    </div>
  );
}
