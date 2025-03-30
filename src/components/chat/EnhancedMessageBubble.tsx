
import React, { useState, useRef, useEffect } from 'react';
import { GlitchText } from '@/hooks/use-advanced-effects';

type EnhancedMessageBubbleProps = {
  message: string;
  sender: string;
  sentiment: string;
  timestamp: string;
};

const EnhancedMessageBubble = ({ message, sender, sentiment, timestamp }: EnhancedMessageBubbleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Determine bubble color based on sentiment
  const getBubbleColor = () => {
    switch (sentiment) {
      case 'excited':
        return 'from-plasma-pink to-hologram-purple';
      case 'flirty':
        return 'from-plasma-pink to-pink-400';
      case 'curious':
        return 'from-quantum-blue to-blue-400';
      case 'neutral':
        return 'from-gray-600 to-gray-700';
      default:
        return sender === 'User' 
          ? 'from-quantum-blue to-hologram-purple' 
          : 'from-gray-800 to-gray-900';
    }
  };
  
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  // Handle double click for 3D text portal
  const handleDoubleClick = () => {
    setIs3DMode(!is3DMode);
  };
  
  // Create semantic particle burst on selection
  const handleSelection = () => {
    if (!particlesRef.current || !bubbleRef.current) return;
    
    // Clear previous particles
    particlesRef.current.innerHTML = '';
    
    // Get selected text
    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === '') return;
    
    setShowParticles(true);
    
    // Create particles based on selected text
    const selectedText = selection.toString();
    const words = selectedText.split(/\s+/);
    
    // Determine emoji based on text content
    const getEmoji = (word: string) => {
      const lowerWord = word.toLowerCase();
      if (lowerWord.match(/love|heart|like/)) return '❤️';
      if (lowerWord.match(/happy|joy|smile/)) return '😊';
      if (lowerWord.match(/sad|unhappy/)) return '😢';
      if (lowerWord.match(/angry|mad/)) return '😠';
      if (lowerWord.match(/surprise|wow/)) return '😮';
      if (lowerWord.match(/cool|awesome/)) return '😎';
      if (lowerWord.match(/fire|hot/)) return '🔥';
      if (lowerWord.match(/star|shine/)) return '✨';
      return ['🌟', '💫', '⚡', '✨', '💥', '🚀', '🔮'][Math.floor(Math.random() * 7)];
    };
    
    words.forEach((word) => {
      if (word.trim() === '') return;
      
      // Create 2-3 particles per word
      const particleCount = 2 + Math.floor(Math.random());
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.textContent = getEmoji(word);
        
        // Random direction
        particle.style.setProperty('--x', `${(Math.random() * 2 - 1).toFixed(2)}`);
        particle.style.setProperty('--y', `${(Math.random() * 2 - 1).toFixed(2)}`);
        
        if (particlesRef.current) {
          particlesRef.current.appendChild(particle);
        }
      }
    });
    
    // Clear particles after animation
    setTimeout(() => {
      setShowParticles(false);
    }, 1000);
  };
  
  // Reset selection on mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (window.getSelection) {
      window.getSelection()?.empty();
    }
  };

  // Apply kinetic typography effect
  useEffect(() => {
    if (!bubbleRef.current || !isHovered) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!bubbleRef.current) return;
      
      const rect = bubbleRef.current.getBoundingClientRect();
      const spans = bubbleRef.current.querySelectorAll('span');
      
      spans.forEach((span) => {
        const spanRect = span.getBoundingClientRect();
        const spanCenterX = spanRect.left + spanRect.width / 2;
        const spanCenterY = spanRect.top + spanRect.height / 2;
        
        const distX = e.clientX - spanCenterX;
        const distY = e.clientY - spanCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        const gravityRadius = 100; // Distance at which gravity affects the letters
        
        if (distance < gravityRadius) {
          const force = 1 - distance / gravityRadius;
          const moveX = distX * force * -0.2;
          const moveY = distY * force * -0.2;
          
          span.style.transform = `translate(${moveX}px, ${moveY}px)`;
          span.style.transition = 'transform 0.1s ease-out';
        } else {
          span.style.transform = 'translate(0, 0)';
          span.style.transition = 'transform 0.5s ease-out';
        }
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);
  
  // Split text into spans for kinetic typography
  useEffect(() => {
    if (!bubbleRef.current) return;
    
    const textNode = bubbleRef.current.querySelector('.message-text');
    if (!textNode || isHovered) return;
    
    const text = textNode.textContent || '';
    textNode.innerHTML = '';
    
    // Split into characters with spans
    [...text].forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.transition = 'transform 0.5s ease-out';
      textNode.appendChild(span);
    });
  }, [isHovered]);
  
  return (
    <div 
      ref={bubbleRef}
      className={`max-w-xs mx-2 p-3 rounded-lg relative transition-all duration-300 chat-bubble
        ${sender === 'User' ? 'ml-auto' : 'mr-auto'}
        ${isHovered ? 'scale-105' : ''}
        ${is3DMode ? 'text-portal text-portal-active' : ''}
      `}
      style={{
        background: `linear-gradient(135deg, var(--${sentiment === 'flirty' ? 'plasma-pink' : 'quantum-blue'}) 0%, var(--${sentiment === 'excited' ? 'plasma-pink' : 'hologram-purple'}) 100%)`,
        boxShadow: `0 0 10px 1px var(--${sentiment === 'excited' || sentiment === 'flirty' ? 'plasma-pink' : 'quantum-blue'}, 0.3)`,
        transformStyle: is3DMode ? 'preserve-3d' : 'flat',
        perspective: is3DMode ? '1000px' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleSelection}
    >
      {/* DNA Splice Effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-quantum-blue to-transparent animate-dna-splice"></div>
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-hologram-purple to-transparent animate-dna-splice delay-100"></div>
        </div>
      )}
      
      <div className="message-text relative z-10 text-white">
        {is3DMode ? (
          // 3D Text Portal mode
          <div className="text-center">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `translateZ(${i * -15}px)`,
                  opacity: 1 - i * 0.2,
                }}
              >
                {message}
              </div>
            ))}
            <div className="relative">{message}</div>
          </div>
        ) : (
          // Regular or glitch mode
          <GlitchText>{message}</GlitchText>
        )}
      </div>
      
      <span className="text-xs text-white/70 mt-1 block text-right relative z-10">{formattedTime}</span>
      
      {/* Hidden emoji chromosomes revealed on hover */}
      {isHovered && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs opacity-20 pointer-events-none z-20">
          {sentiment === 'excited' && '🔥'}
          {sentiment === 'flirty' && '✨'}
          {sentiment === 'curious' && '🔍'}
          {sentiment === 'neutral' && '✓'}
        </div>
      )}
      
      {/* Particle container for semantic burst */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 overflow-visible pointer-events-none"
        style={{ display: showParticles ? 'block' : 'none' }}
      ></div>
    </div>
  );
};

export default EnhancedMessageBubble;
