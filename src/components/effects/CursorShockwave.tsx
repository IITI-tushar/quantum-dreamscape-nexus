
import React, { useEffect, useRef, useState } from 'react';

export const CursorShockwave = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [rippleColor, setRippleColor] = useState('#4f00ff');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top } = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - left,
        y: e.clientY - top
      });

      // Activate shockwave
      setIsActive(true);
      
      // Reset after animation completes
      setTimeout(() => setIsActive(false), 1000);
      
      // Bio-Luminescent Scroll - Color based on movement speed
      const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
      
      if (speed < 5) {
        setRippleColor('#8f00ff'); // Purple for slow
      } else if (speed < 20) {
        setRippleColor('#b300ff'); // Medium purple
      } else {
        setRippleColor('#ff00e1'); // Pink supernova for fast
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {isActive && (
        <div
          className="absolute rounded-full animate-ripple opacity-30"
          style={{
            left: position.x,
            top: position.y,
            width: '10px',
            height: '10px',
            background: `radial-gradient(circle, ${rippleColor} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </div>
  );
};
