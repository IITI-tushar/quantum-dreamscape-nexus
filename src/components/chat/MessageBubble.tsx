
import React, { useState } from 'react';

type MessageBubbleProps = {
  message: string;
  sender: string;
  sentiment: string;
  timestamp: string;
};

const MessageBubble = ({ message, sender, sentiment, timestamp }: MessageBubbleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
  
  return (
    <div 
      className={`max-w-xs mx-2 p-3 rounded-lg relative transition-all duration-300 chat-bubble
        ${sender === 'User' ? 'ml-auto' : 'mr-auto'}
        ${isHovered ? 'scale-105' : ''}
      `}
      style={{
        background: `linear-gradient(135deg, var(--${sentiment === 'flirty' ? 'plasma-pink' : 'quantum-blue'}) 0%, var(--${sentiment === 'excited' ? 'plasma-pink' : 'hologram-purple'}) 100%)`,
        boxShadow: `0 0 10px 1px var(--${sentiment === 'excited' || sentiment === 'flirty' ? 'plasma-pink' : 'quantum-blue'}, 0.3)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* DNA Splice Effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-quantum-blue to-transparent animate-dna-splice"></div>
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-hologram-purple to-transparent animate-dna-splice delay-100"></div>
        </div>
      )}
      
      <p className="text-white relative z-10">{message}</p>
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
    </div>
  );
};

export default MessageBubble;
