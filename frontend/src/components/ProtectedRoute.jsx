import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — wraps routes that require authentication.
 * Redirects unauthenticated users to the home page.
 *
 * Usage in App.jsx:
 *   <Route path="/dashboard" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to home; the Navbar's AuthModal handles login
    return <Navigate to="/" replace />;
  }

  return children;
}
