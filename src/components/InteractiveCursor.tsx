import React, { useEffect, useState, useRef } from 'react';

export const InteractiveCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPosition, setFollowerPosition] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const followerRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on pointer-fine devices (not touch screens)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over a clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('button, a, input, select, textarea, [role="button"], label');
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Spring interpolation for smooth follower ring
    let animationFrameId: number;
    const animate = () => {
      const ease = 0.2;
      followerRef.current.x += (targetRef.current.x - followerRef.current.x) * ease;
      followerRef.current.y += (targetRef.current.y - followerRef.current.y) * ease;
      setFollowerPosition({ x: followerRef.current.x, y: followerRef.current.y });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Central pearl point */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out shadow-sm"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHoveringClickable ? '8px' : '5px',
          height: isHoveringClickable ? '8px' : '5px',
          backgroundColor: isHoveringClickable ? '#C5A059' : '#0B192C',
        }}
      />

      {/* Floating pearl ring follower with specular shine */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 ease-out"
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          width: isHoveringClickable ? '44px' : '26px',
          height: isHoveringClickable ? '44px' : '26px',
          borderColor: isHoveringClickable ? 'rgba(197, 160, 89, 0.7)' : 'rgba(11, 25, 44, 0.25)',
          backgroundColor: isHoveringClickable ? 'rgba(197, 160, 89, 0.08)' : 'transparent',
          transform: `translate(-50%, -50%) scale(${isHoveringClickable ? 1.15 : 1})`,
        }}
      />
    </div>
  );
};
