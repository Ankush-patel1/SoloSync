import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CommunityGrid from '../components/CommunityGrid';
import ExploreSection from '../components/ExploreSection';
import HostCTA from '../components/HostCTA';
import Footer from '../components/Footer';
import Particles from '../components/Particles';
import AuthModal from '../components/AuthModal';

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/discover');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Particles />
      <div className="min-h-screen">
        <Navbar onLoginClick={() => setAuthOpen(true)} />
        <main>
          <Hero onLoginClick={() => setAuthOpen(true)} />
          <ExploreSection />
          <CommunityGrid onLoginClick={() => setAuthOpen(true)} />
          <HostCTA onLoginClick={() => setAuthOpen(true)} />
        </main>
        <Footer />
      </div>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
