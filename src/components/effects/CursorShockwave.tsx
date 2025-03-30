
import React, { useEffect, useRef, useState } from 'react';

export const CursorShockwave = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [rippleColor, setRippleColor] = useState('#4f00ff');
  const [lastPositions, setLastPositions] = useState<{ x: number, y: number }[]>([]);
  const [synapticMesh, setSynapticMesh] = useState<JSX.Element[]>([]);
  const [activeSynapses, setActiveSynapses] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top } = containerRef.current.getBoundingClientRect();
      const newPosition = {
        x: e.clientX - left,
        y: e.clientY - top
      };
      setPosition(newPosition);

      setLastPositions(prev => {
        const updated = [...prev, newPosition];
        if (updated.length > 5) {
          updated.shift();
        }
        return updated;
      });

      setIsActive(true);
      
      setTimeout(() => setIsActive(false), 1000);
      
      const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
      
      if (speed < 5) {
        setRippleColor('#8f00ff');
      } else if (speed < 20) {
        setRippleColor('#b300ff');
      } else {
        setRippleColor('#ff00e1');
      }
      
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    const handleScroll = (e: WheelEvent) => {
      const speed = Math.abs(e.deltaY);
      const direction = e.deltaY > 0 ? 'down' : 'up';
      
      createScrollRipple(position.x, position.y, speed, direction);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [position]);

  useEffect(() => {
    const generateSynapticMesh = () => {
      if (!containerRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const nodeCount = 15;
      const newMesh: JSX.Element[] = [];
      
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 2 + Math.random() * 4;
        const hue = Math.floor(Math.random() * 60) + 220;
        
        newMesh.push(
          <div 
            key={`node-${i}`}
            className="absolute rounded-full synaptic-node"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: `hsla(${hue}, 100%, 70%, 0.7)`,
              boxShadow: `0 0 ${size * 2}px hsla(${hue}, 100%, 70%, 0.5)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
        
        for (let j = 0; j < i; j++) {
          if (Math.random() > 0.7) continue;
          
          const startX = x;
          const startY = y;
          const endX = Math.random() * width;
          const endY = Math.random() * height;
          
          const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
          const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
          
          newMesh.push(
            <div 
              key={`connection-${i}-${j}`}
              className="absolute synaptic-connection"
              style={{
                left: `${startX}px`,
                top: `${startY}px`,
                width: `${length}px`,
                height: '1px',
                backgroundColor: `hsla(${hue}, 100%, 70%, 0.2)`,
                transformOrigin: '0 0',
                transform: `rotate(${angle}deg)`,
              }}
            />
          );
        }
      }
      
      setSynapticMesh(newMesh);
    };
    
    generateSynapticMesh();
    
    const meshInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setActiveSynapses(true);
        generateSynapticMesh();
        
        setTimeout(() => {
          setActiveSynapses(false);
        }, 5000);
      }
    }, 10000);
    
    return () => {
      clearInterval(meshInterval);
    };
  }, []);

  const createScrollRipple = (x: number, y: number, speed: number, direction: string) => {
    if (!containerRef.current) return;
    
    const ripple = document.createElement('div');
    ripple.classList.add('scroll-ripple');
    
    const size = Math.min(20 + speed / 2, 100);
    let rippleHue = 260;
    
    if (speed > 100) {
      rippleHue = 320;
    } else if (speed > 50) {
      rippleHue = 280;
    }
    
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.borderColor = `hsla(${rippleHue}, 100%, 70%, 0.7)`;
    
    ripple.classList.add(`scroll-${direction}`);
    
    containerRef.current.appendChild(ripple);
    
    setTimeout(() => {
      if (containerRef.current && containerRef.current.contains(ripple)) {
        containerRef.current.removeChild(ripple);
      }
    }, 1000);
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: activeSynapses ? 0.5 : 0 }}
      >
        {synapticMesh}
      </div>
      
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
      
      {lastPositions.map((pos, index) => (
        <div
          key={`trail-${index}`}
          className="absolute rounded-full opacity-20"
          style={{
            left: pos.x,
            top: pos.y,
            width: `${6 - index}px`,
            height: `${6 - index}px`,
            background: rippleColor,
            filter: 'blur(2px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      <style>
        {`
        .scroll-ripple {
          position: absolute;
          border-radius: 50%;
          border: 2px solid;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 100;
          animation: scroll-ripple-expand 1s cubic-bezier(0,0.2,0.8,1) forwards;
        }
        
        .scroll-down {
          border-style: solid;
        }
        
        .scroll-up {
          border-style: dashed;
        }
        
        @keyframes scroll-ripple-expand {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }
        
        .synaptic-node {
          opacity: 0.7;
          transition: opacity 0.5s, transform 0.5s;
        }
        
        .synaptic-connection {
          opacity: 0.2;
          transition: opacity 0.5s;
        }
        `}
      </style>
    </div>
  );
};
