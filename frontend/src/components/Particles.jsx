import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const PARTICLE_COUNT = 45;

function createParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2.5 + 0.5,
    speedX: (Math.random() - 0.5) * 0.35,
    speedY: -(Math.random() * 0.4 + 0.1),
    opacity: Math.random() * 0.5 + 0.15,
    life: Math.random(),
  };
}

export default function Particles() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animating = true;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height, isDarkRef.current)
      );
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      if (!animating) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark = isDarkRef.current;
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life += 0.003;

        // Fade out as they rise
        const alpha = p.opacity * Math.sin(p.life * Math.PI);

        // Wrap around
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; p.life = 0; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(180, 120, 255, ${alpha})`
          : `rgba(245, 166, 35, ${alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();
    return () => {
      animating = false;
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.6,
      }}
    />
  );
}
