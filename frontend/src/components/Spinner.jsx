/**
 * Spinner — reusable loading indicator using SoloSync theme accent color.
 *
 * Usage:
 *   <Spinner />               // default 40px
 *   <Spinner size={24} />     // custom size in px
 */
export default function Spinner({ size = 40 }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
      role="status"
      aria-label="Loading"
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `3px solid var(--bg-card-border)`,
          borderTopColor: 'var(--accent)',
          animation: 'spin 0.75s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
