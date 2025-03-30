
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { CursorShockwave } from '../effects/CursorShockwave';

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
