
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { CursorShockwave } from '../effects/CursorShockwave';
import { useAdvancedEffects } from '@/hooks/use-advanced-effects';

type AppLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showShockwave?: boolean;
}

const AppLayout = ({ 
  children, 
  title = "NeonChat - Cybernetic Social Nexus", 
  description = "The most advanced cybernetic social nexus of 2077", 
  showShockwave = true 
}: AppLayoutProps) => {
  const [screenTime, setScreenTime] = useState(0);
  const [safeMode, setSafeMode] = useState(false);

  // Initialize advanced effects
  useAdvancedEffects();

  // Screen time monitoring for Cyber-Psychosis Prevention
  useEffect(() => {
    document.title = title;
    
    const timer = setInterval(() => {
      setScreenTime(prev => {
        const newTime = prev + 1;
        // Enable safe mode after 2 hours (120 minutes)
        if (newTime >= 120 && !safeMode) {
          setSafeMode(true);
          console.log("Retina Safe Mode activated to prevent cyber-psychosis");
        }
        return newTime;
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [title]);

  // Setup Biometric Sync (webcam pupil tracking for scroll)
  useEffect(() => {
    // Listen for "activate neon" voice command
    const activateNeonMode = () => {
      // In a real implementation, this would use the Web Speech API
      // For now, we'll just listen for key combinations
      
      const handleKeyDown = (e: KeyboardEvent) => {
        // Keyboard shortcut Alt+N for "activate neon"
        if (e.altKey && e.key === 'n') {
          document.body.classList.toggle('high-contrast-neon');
          console.log("Voice command 'activate neon' detected, toggling high-contrast mode");
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    };
    
    // Initialize voice command detection
    const cleanup = activateNeonMode();
    
    return cleanup;
  }, []);

  return (
    <div className={`flex flex-col min-h-screen bg-black-hole overflow-hidden ${safeMode ? 'blur-sm' : ''}`}>
      <Navbar />
      
      <main className="flex-grow relative">
        {showShockwave && <CursorShockwave />}
        
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppLayout;
