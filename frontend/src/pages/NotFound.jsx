import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'Inter, system-ui, sans-serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      {/* Animated 404 */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <p
          style={{
            fontSize: 'clamp(6rem, 20vw, 12rem)',
            fontWeight: 900,
            lineHeight: 1,
            background: 'var(--gradient-accent)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-0.04em',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        >
          404
        </p>
        {/* Glow behind */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--accent-glow)',
            filter: 'blur(60px)',
            borderRadius: '50%',
            zIndex: -1,
          }}
        />
      </div>

      <h1
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          fontWeight: 800,
          margin: '0 0 0.75rem',
          color: 'var(--text-primary)',
        }}
      >
        Page not found
      </h1>

      <p
        style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '440px',
          lineHeight: 1.7,
          margin: '0 0 2.5rem',
        }}
      >
        Looks like this destination doesn&apos;t exist on the map. Let&apos;s get you back to somewhere familiar.
      </p>

      <Link
        to="/"
        className="btn-primary"
        style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}
      >
        ✈️ Back to Home
      </Link>
    </div>
  );
}
