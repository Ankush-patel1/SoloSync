import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider }  from './context/ThemeContext';
import { AuthProvider }   from './context/AuthContext';
import ErrorBoundary      from './components/ErrorBoundary';
import ProtectedRoute     from './components/ProtectedRoute';
import Home               from './pages/Home';
import Discover           from './pages/Discover';
import Community          from './pages/Community';
import Trips              from './pages/Trips';
import History            from './pages/History';
import Host               from './pages/Host';
import Profile            from './pages/Profile';
import ExploreIndia       from './pages/ExploreIndia';
import NotFound           from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              {/* Public routes */}
              <Route path="/"              element={<Home         />} />
              <Route path="/discover"      element={<Discover     />} />
              <Route path="/community"     element={<Community    />} />
              <Route path="/explore-india" element={<ExploreIndia />} />

              {/* Protected routes — redirect to home if not logged in */}
              <Route path="/my-trips"  element={<ProtectedRoute><Trips   /></ProtectedRoute>} />
              <Route path="/history"   element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/host"      element={<ProtectedRoute><Host    /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

              {/* 404 catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
