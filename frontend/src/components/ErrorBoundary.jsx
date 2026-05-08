import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production you'd send this to an error reporting service (e.g. Sentry)
    console.error('[SoloSync] Uncaught error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

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
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚠️</div>

        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 800,
            margin: '0 0 0.75rem',
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            maxWidth: '440px',
            lineHeight: 1.7,
            margin: '0 0 2rem',
          }}
        >
          An unexpected error occurred. Try refreshing the page — if the problem persists, please contact support.
        </p>

        <button
          className="btn-primary"
          onClick={() => window.location.reload()}
          style={{ fontSize: '0.95rem' }}
        >
          🔄 Refresh Page
        </button>
      </div>
    );
  }
}
