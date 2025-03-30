
import React, { useEffect, useRef, useState } from 'react';

type ProfileBioHelixProps = {
  stats: {
    trait: string;
    value: number;
  }[];
};

const ProfileBioHelix = ({ stats }: ProfileBioHelixProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredTrait, setHoveredTrait] = useState<string | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Function to draw the DNA helix
    const drawHelix = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const amplitude = canvas.width / 4;
      const frequency = 0.02;
      const verticalSpacing = canvas.height / (stats.length + 1);
      
      // Draw the backbones
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1'; // Primary strand
      ctx.lineWidth = 2;
      
      for (let y = 0; y < canvas.height; y += 5) {
        const x = centerX + Math.sin(y * frequency) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      ctx.beginPath();
      ctx.strokeStyle = '#ec4899'; // Secondary strand
      ctx.lineWidth = 2;
      
      for (let y = 0; y < canvas.height; y += 5) {
        const x = centerX + Math.sin(y * frequency + Math.PI) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Draw the nodes for each trait
      stats.forEach((stat, index) => {
        const y = verticalSpacing * (index + 1);
        const x1 = centerX + Math.sin(y * frequency) * amplitude;
        const x2 = centerX + Math.sin(y * frequency + Math.PI) * amplitude;
        
        // Calculate node size based on trait value
        const nodeSize = (stat.value / 100) * 20 + 10;
        const isHovered = hoveredTrait === stat.trait;
        const glowSize = isHovered ? 10 : 5;
        
        // Draw the connecting line between nodes
        ctx.beginPath();
        ctx.strokeStyle = isHovered ? '#22d3ee' : '#a78bfa';
        ctx.lineWidth = isHovered ? 3 : 1;
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
        
        // Draw glow for primary node
        ctx.beginPath();
        const primaryGradient = ctx.createRadialGradient(x1, y, 0, x1, y, nodeSize + glowSize);
        primaryGradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
        primaryGradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = primaryGradient;
        ctx.arc(x1, y, nodeSize + glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw primary node
        ctx.beginPath();
        ctx.fillStyle = isHovered ? '#818cf8' : '#6366f1';
        ctx.arc(x1, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw glow for secondary node
        ctx.beginPath();
        const secondaryGradient = ctx.createRadialGradient(x2, y, 0, x2, y, nodeSize + glowSize);
        secondaryGradient.addColorStop(0, 'rgba(236, 72, 153, 0.8)');
        secondaryGradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
        ctx.fillStyle = secondaryGradient;
        ctx.arc(x2, y, nodeSize + glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw secondary node
        ctx.beginPath();
        ctx.fillStyle = isHovered ? '#f472b6' : '#ec4899';
        ctx.arc(x2, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Add trait label
        ctx.font = isHovered ? 'bold 14px sans-serif' : '12px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'right';
        ctx.fillText(stat.trait, x1 - nodeSize - 10, y + 4);
        
        // Add value label
        ctx.textAlign = 'left';
        ctx.fillText(`${stat.value}%`, x2 + nodeSize + 10, y + 4);
      });
    };
    
    // Initial draw
    drawHelix();
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      drawHelix();
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle hover detection
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const centerX = canvas.width / 2;
      const amplitude = canvas.width / 4;
      const frequency = 0.02;
      const verticalSpacing = canvas.height / (stats.length + 1);
      
      let hoveredTrait: string | null = null;
      
      stats.forEach((stat, index) => {
        const y = verticalSpacing * (index + 1);
        const x1 = centerX + Math.sin(y * frequency) * amplitude;
        const x2 = centerX + Math.sin(y * frequency + Math.PI) * amplitude;
        const nodeSize = (stat.value / 100) * 20 + 10;
        
        // Check if mouse is over either node
        const distToNode1 = Math.sqrt(Math.pow(mouseX - x1, 2) + Math.pow(mouseY - y, 2));
        const distToNode2 = Math.sqrt(Math.pow(mouseX - x2, 2) + Math.pow(mouseY - y, 2));
        
        if (distToNode1 <= nodeSize + 5 || distToNode2 <= nodeSize + 5) {
          hoveredTrait = stat.trait;
        }
      });
      
      setHoveredTrait(hoveredTrait);
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [stats, hoveredTrait]);
  
  return (
    <div className="w-full h-full relative">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-pointer"
      />
      
      {hoveredTrait && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black-hole/90 border border-quantum-blue/30 p-2 rounded-lg">
          <p className="text-white text-center">
            {hoveredTrait} represents your {hoveredTrait.toLowerCase()} level in digital interactions
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileBioHelix;
