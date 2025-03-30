
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!gridRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      
      if (gridRef.current) {
        gridRef.current.style.transform = `perspective(1000px) rotateY(${x * 3}deg) rotateX(${y * -3}deg)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section className="relative min-h-screen pt-24 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-hologram-radial z-0"></div>
      
      <div 
        ref={gridRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full transition-transform duration-500 ease-out"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-r from-quantum-blue to-plasma-pink p-0.5 shadow-neon-blue">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-black-hole rounded-full m-0.5 flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">N</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-blue via-hologram-purple to-plasma-pink text-glow">
              NeonChat
            </span>
            <span className="block text-white mt-2 text-2xl md:text-3xl">Cybernetic Social Nexus</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10"
          >
            Experience communication from 2077. Connect in a futuristic social platform where messages glow with sentiment, avatars express emotions, and interfaces adapt to your unique digital identity.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="relative overflow-hidden group h-14 px-10 rounded-full text-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-plasma-pink to-hologram-purple transition-transform duration-300 group-hover:scale-105"></span>
              <span className="relative z-10 flex items-center">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="2" width="20" height="20" rx="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Join The Nexus
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="relative overflow-hidden group border-quantum-blue h-14 px-8 rounded-full text-lg hover:text-white"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-quantum-blue to-hologram-purple opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10">
                Explore Features
              </span>
            </Button>
          </motion.div>
        </div>
        
        {/* Interactive 3D UI Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative mt-12 max-w-5xl mx-auto"
        >
          <div className="relative bg-black-hole rounded-lg overflow-hidden border border-quantum-blue/30 shadow-neon-blue">
            <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
            
            {/* Chat Interface Preview */}
            <div className="p-6">
              <div className="flex flex-col space-y-6">
                {/* Chat Message 1 */}
                <div className="chat-bubble chat-bubble-received animate-flow-up w-3/4 max-w-md">
                  <div className="text-sm opacity-80 mb-1">NEONA Bot • Just now</div>
                  <p>Welcome to NeonChat. The future of communication has arrived. How can I assist you in the cybervoid today?</p>
                </div>
                
                {/* Chat Message 2 */}
                <div className="chat-bubble chat-bubble-sent animate-flow-up w-3/4 max-w-md">
                  <div className="text-sm opacity-80 mb-1">You • Just now</div>
                  <p>Show me how the sentiment analysis works in this chat system.</p>
                </div>
                
                {/* Chat Message 3 */}
                <div className="chat-bubble chat-bubble-received animate-flow-up w-3/4 max-w-md">
                  <div className="text-sm opacity-80 mb-1">NEONA Bot • Just now</div>
                  <div className="relative">
                    <p>Of course! Watch how these messages change colors based on your emotions. Try saying something excited or something calm to see the difference.</p>
                    <div className="absolute -right-3 -bottom-3 h-6 w-6 rounded-full bg-ai-green flex items-center justify-center text-xs animate-pulse-neon" style={{--color: "var(--ai-green)"}}>AI</div>
                  </div>
                </div>
                
                {/* Input Area */}
                <div className="relative mt-4">
                  <input 
                    type="text" 
                    placeholder="Type your message here..." 
                    className="w-full bg-black-hole/50 border border-quantum-blue/40 rounded-full px-6 py-3 text-white focus:outline-none focus:border-plasma-pink/60 focus:ring-1 focus:ring-plasma-pink/50"
                  />
                  <Button 
                    size="icon" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-quantum-blue to-hologram-purple rounded-full h-10 w-10"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-3 -right-3 h-12 w-12 bg-gradient-to-br from-plasma-pink to-hologram-purple rounded-br-xl rounded-tl-xl transform rotate-45 blur-sm"></div>
            <div className="absolute -bottom-3 -left-3 h-12 w-12 bg-gradient-to-br from-quantum-blue to-biolum-teal rounded-br-xl rounded-tl-xl transform -rotate-45 blur-sm"></div>
          </div>
          
          {/* Reflection Effect */}
          <div className="relative h-20 mt-1 mx-12 opacity-30 bg-gradient-to-b from-quantum-blue/10 to-transparent rounded-b-lg blur-sm"></div>
        </motion.div>
      </div>
      
      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-hologram-purple/20 to-transparent"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-quantum-blue animate-float opacity-20"
            style={{
              width: `${Math.random() * 6 + 2}px`, 
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
