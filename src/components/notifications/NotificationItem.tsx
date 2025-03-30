
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, User, MessageSquare, AtSign, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NotificationProps = {
  notification: {
    id: number;
    type: string;
    user: {
      name: string;
      avatar: string;
    };
    content: string;
    time: string;
    read: boolean;
  };
  onMarkAsRead: () => void;
};

const NotificationItem = ({ notification, onMarkAsRead }: NotificationProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-hologram-purple" />;
      case 'friend':
        return <User className="h-4 w-4 text-ai-green" />;
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'mention':
        return <AtSign className="h-4 w-4 text-quantum-blue" />;
      default:
        return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const getIconBackground = () => {
    switch (notification.type) {
      case 'message':
        return 'bg-hologram-purple/20';
      case 'friend':
        return 'bg-ai-green/20';
      case 'like':
        return 'bg-red-500/20';
      case 'mention':
        return 'bg-quantum-blue/20';
      default:
        return 'bg-gray-500/20';
    }
  };

  return (
    <div 
      className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300
        ${notification.read ? 'bg-transparent' : 'bg-quantum-blue/10'}
        hover:bg-black-hole/50 border border-quantum-blue/10
      `}
      onClick={!notification.read ? onMarkAsRead : undefined}
    >
      <Avatar className="h-10 w-10 border-2 border-hologram-purple/50">
        <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
        <AvatarFallback className="bg-black-hole text-quantum-blue">
          {notification.user.name.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{notification.user.name}</span>
          <span className="text-gray-400">{notification.content}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className={`h-5 w-5 rounded-full ${getIconBackground()} flex items-center justify-center`}>
            {getIcon()}
          </div>
          <span className="text-xs text-gray-400">{notification.time}</span>
        </div>
      </div>
      
      {!notification.read && (
        <div className="h-2 w-2 rounded-full bg-plasma-pink animate-pulse"></div>
      )}
    </div>
  );
};

export default NotificationItem;
