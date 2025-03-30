
import { useEffect, useRef } from 'react';
import { createHolographicEffect, createGlitchEffect, initQuantumRipple, initCyberspaceWeather } from '../utils/advancedAnimations';
import '../components/effects/AdvancedEffects.css';

export function useAdvancedEffects() {
  const effectsInitialized = useRef(false);

  useEffect(() => {
    if (effectsInitialized.current) return;
    
    // Initialize quantum ripple effect (cursor trails and black hole buttons)
    initQuantumRipple();
    
    // Set up schedule for weather events
    const setupWeatherSchedule = () => {
      // Initial delay before first weather event
      const initialDelay = 30000 + Math.random() * 60000;
      
      setTimeout(() => {
        // Start the weather system
        initCyberspaceWeather();
        
        // Schedule next weather event
        const nextDelay = 120000 + Math.random() * 180000; // 2-5 minutes
        setTimeout(setupWeatherSchedule, nextDelay);
      }, initialDelay);
    };
    
    // Start the weather schedule
    setupWeatherSchedule();
    
    effectsInitialized.current = true;
  }, []);
  
  // Custom hook to apply holographic effect to text elements
  const applyHolographicEffect = (ref: React.RefObject<HTMLElement>) => {
    useEffect(() => {
      if (ref.current) {
        createHolographicEffect(ref.current);
      }
    }, [ref]);
  };
  
  // Custom hook to apply glitch effect
  const applyGlitchEffect = (ref: React.RefObject<HTMLElement>) => {
    useEffect(() => {
      if (ref.current) {
        createGlitchEffect(ref.current);
      }
    }, [ref]);
  };
  
  return { applyHolographicEffect, applyGlitchEffect };
}

// Component for easily applying effects to any text
export function HolographicText({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Apply effects
  useEffect(() => {
    if (elementRef.current) {
      createHolographicEffect(elementRef.current);
    }
  }, []);
  
  return (
    <div ref={elementRef} className={`holographic-text ${className}`}>
      {children}
    </div>
  );
}

export function GlitchText({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Apply effects
  useEffect(() => {
    if (elementRef.current) {
      createGlitchEffect(elementRef.current);
    }
  }, []);
  
  return (
    <div 
      ref={elementRef} 
      className={`glitch-text ${className}`}
      data-text={typeof children === 'string' ? children : ''}
    >
      {children}
    </div>
  );
}
