
import React, { useState } from 'react';
import AppLayout from '../components/layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, User, MessageSquare, Heart, Star, Settings, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '../hooks/use-toast';
import NotificationItem from '../components/notifications/NotificationItem';

// Sample notifications
const initialNotifications = [
  {
    id: 1,
    type: 'message',
    user: {
      name: 'Cyber Jack',
      avatar: 'https://i.pravatar.cc/150?img=24',
    },
    content: 'sent you a new message',
    time: '2 minutes ago',
    read: false
  },
  {
    id: 2,
    type: 'friend',
    user: {
      name: 'Neon Viper',
      avatar: 'https://i.pravatar.cc/150?img=36',
    },
    content: 'accepted your connection request',
    time: '1 hour ago',
    read: false
  },
  {
    id: 3,
    type: 'like',
    user: {
      name: 'Ghost Rider',
      avatar: 'https://i.pravatar.cc/150?img=45',
    },
    content: 'liked your post about neural interfaces',
    time: '3 hours ago',
    read: true
  },
  {
    id: 4,
    type: 'mention',
    user: {
      name: 'Digital Echo',
      avatar: 'https://i.pravatar.cc/150?img=51',
    },
    content: 'mentioned you in a comment',
    time: 'Yesterday',
    read: true
  },
  {
    id: 5,
    type: 'system',
    user: {
      name: 'NeonChat',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    content: 'Your profile has been viewed by 15 people this week',
    time: '2 days ago',
    read: true
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "Notifications Updated",
      description: "All notifications marked as read",
      duration: 3000,
    });
  };
  
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  return (
    <AppLayout title="NeonChat - Notifications">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-black-hole/30 border-quantum-blue/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Bell className="h-5 w-5 mr-2 text-plasma-pink" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-plasma-pink">
                    {unreadCount} new
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Stay updated with your network activity</CardDescription>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          
          <div className="px-6 pb-2 flex gap-2 overflow-x-auto">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-quantum-blue hover:bg-quantum-blue/80' : ''}
            >
              All
            </Button>
            <Button 
              variant={filter === 'unread' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('unread')}
              className={filter === 'unread' ? 'bg-plasma-pink hover:bg-plasma-pink/80' : ''}
            >
              Unread
            </Button>
            <Button 
              variant={filter === 'message' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('message')}
              className={filter === 'message' ? 'bg-hologram-purple hover:bg-hologram-purple/80' : ''}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Messages
            </Button>
            <Button 
              variant={filter === 'friend' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('friend')}
              className={filter === 'friend' ? 'bg-ai-green hover:bg-ai-green/80' : ''}
            >
              <User className="h-4 w-4 mr-1" />
              Connections
            </Button>
            <Button 
              variant={filter === 'like' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('like')}
              className={filter === 'like' ? 'bg-red-500 hover:bg-red-500/80' : ''}
            >
              <Heart className="h-4 w-4 mr-1" />
              Likes
            </Button>
          </div>
          
          <CardContent>
            <div className="space-y-1 mt-2">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(notification => (
                  <NotificationItem 
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={() => markAsRead(notification.id)}
                  />
                ))
              ) : (
                <div className="py-8 text-center">
                  <Bell className="h-12 w-12 mx-auto text-gray-500 mb-3" />
                  <h3 className="text-white text-lg font-medium mb-1">No notifications</h3>
                  <p className="text-gray-400">
                    {filter !== 'all' 
                      ? `You don't have any ${filter} notifications yet`
                      : 'When you have new notifications, they will appear here'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          
          {filteredNotifications.length > 5 && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </AppLayout>
  );
};

export default Notifications;
