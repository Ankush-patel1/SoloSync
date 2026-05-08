import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full glass-sm cursor-pointer select-none border border-white/5 hover:border-white/20 transition-all"
      
      title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
    >
      <span key={isDark ? 'moon' : 'sun'} className="text-lg">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
