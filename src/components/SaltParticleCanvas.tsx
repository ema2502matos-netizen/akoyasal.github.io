import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  alpha: number;
  rotation: number;
  rotSpeed: number;
  shape: 'cube' | 'diamond' | 'circle';
  shine: number;
  shineSpeed: number;
}

interface SaltParticleCanvasProps {
  density?: number;
  interactive?: boolean;
}

export const SaltParticleCanvas: React.FC<SaltParticleCanvasProps> = ({
  density = 45,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    // Initialize particles
    const particles: Particle[] = [];
    const count = Math.min(density, Math.floor((width * height) / 35000));

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1.2;
      const shapes: ('cube' | 'diamond' | 'circle')[] = ['cube', 'diamond', 'circle'];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        size,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.35 + 0.15, // gently drift downward
        alpha: Math.random() * 0.35 + 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        shine: Math.random() * Math.PI,
        shineSpeed: Math.random() * 0.03 + 0.015,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.shine += p.shineSpeed;

        // Interactive mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 2.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Wrap around boundaries
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Dynamic sparkle intensity
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.shine));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Draw glittering crystal particle in soft salt white / pale gold
        const isGold = i % 5 === 0;
        ctx.fillStyle = isGold 
          ? `rgba(197, 160, 89, ${currentAlpha})` 
          : `rgba(255, 255, 255, ${currentAlpha * 1.2})`;
        
        ctx.shadowColor = isGold ? 'rgba(197, 160, 89, 0.4)' : 'rgba(255, 255, 255, 0.6)';
        ctx.shadowBlur = p.size * 1.5;

        if (p.shape === 'cube') {
          // Cubic crystal grain
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.shape === 'diamond') {
          // Rhombus diamond facet
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.2);
          ctx.lineTo(p.size * 0.8, 0);
          ctx.lineTo(0, p.size * 1.2);
          ctx.lineTo(-p.size * 0.8, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          // Rounded fleck
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-75"
      aria-hidden="true"
    />
  );
};
