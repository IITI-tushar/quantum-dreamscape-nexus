
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ChatAvatarProps = {
  src: string;
  alt: string;
  isAI?: boolean;
};

const ChatAvatar = ({ src, alt, isAI = false }: ChatAvatarProps) => {
  return (
    <div className="relative h-10 w-10 flex-shrink-0 mx-2">
      <Avatar className="h-10 w-10 border-2 border-hologram-purple/50">
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="bg-black-hole text-quantum-blue">
          {alt.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      
      {isAI && (
        <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-ai-green flex items-center justify-center text-xs text-black font-bold">
          AI
        </div>
      )}
    </div>
  );
};

export default ChatAvatar;
