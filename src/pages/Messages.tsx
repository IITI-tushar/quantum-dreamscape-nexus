
import React, { useState, useEffect } from 'react';
import AppLayout from '../components/layouts/AppLayout';
import { useToast } from '../hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, Mic, Smile, PlusCircle, Image } from 'lucide-react';
import MessageBubble from '../components/chat/MessageBubble';
import ChatAvatar from '../components/chat/ChatAvatar';

// Sample messages for demo
const initialMessages = [
  { id: 1, sender: 'NEONA', avatar: 'https://i.pravatar.cc/150?img=32', message: 'Welcome to NeonChat! How can I assist you today?', sentiment: 'neutral', timestamp: new Date().toISOString() },
  { id: 2, sender: 'User', avatar: 'https://i.pravatar.cc/150?img=13', message: 'I\'m looking for some chat features.', sentiment: 'curious', timestamp: new Date(Date.now() - 60000).toISOString() },
  { id: 3, sender: 'NEONA', avatar: 'https://i.pravatar.cc/150?img=32', message: 'Try our new DNA Splice hover effect and anti-gravity pulse animations!', sentiment: 'excited', timestamp: new Date(Date.now() - 120000).toISOString() },
];

// Contact list for the sidebar
const contacts = [
  { id: 1, name: 'NEONA', avatar: 'https://i.pravatar.cc/150?img=32', status: 'online', isAI: true, lastMessage: 'Ready to assist!' },
  { id: 2, name: 'Cyber Jack', avatar: 'https://i.pravatar.cc/150?img=24', status: 'online', lastMessage: 'Did you see the new mods?' },
  { id: 3, name: 'Neon Viper', avatar: 'https://i.pravatar.cc/150?img=36', status: 'away', lastMessage: 'Meeting at the digital oasis later?' },
  { id: 4, name: 'Ghost Rider', avatar: 'https://i.pravatar.cc/150?img=45', status: 'offline', lastMessage: 'Let me know when the networks up' },
  { id: 5, name: 'Digital Echo', avatar: 'https://i.pravatar.cc/150?img=51', status: 'online', lastMessage: 'Check my new avatar!' },
];

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isFliRTMode, setIsFlirtMode] = useState(false);
  const { toast } = useToast();
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Check for /flirt command
    if (newMessage.startsWith('/flirt')) {
      setIsFlirtMode(true);
      toast({
        title: "AI Wingman Activated",
        description: "Your next messages will have ✨ extra charm ✨",
        duration: 3000,
      });
      setNewMessage('');
      return;
    }
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'User',
      avatar: 'https://i.pravatar.cc/150?img=13',
      message: isFliRTMode ? `${newMessage} ✨` : newMessage,
      sentiment: isFliRTMode ? 'flirty' : 'neutral',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'NEONA',
        avatar: 'https://i.pravatar.cc/150?img=32',
        message: isFliRTMode 
          ? "I must say, your communication patterns are quite... fascinating. Care to explore more digital landscapes together? ✨"
          : "Your message has been processed. The neural networks are adapting to your communication style.",
        sentiment: isFliRTMode ? 'flirty' : 'neutral',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Reset flirt mode after one use
      if (isFliRTMode) {
        setIsFlirtMode(false);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Voice Recording Started",
        description: "Haptic Narration enabled - feeling your emotions",
        duration: 2000,
      });
    } else {
      toast({
        title: "Voice Recording Stopped",
        description: "Emotion analysis complete",
        duration: 2000,
      });
    }
  };

  return (
    <AppLayout title="NeonChat - Messages">
      <div className="flex h-[calc(100vh-10rem)] rounded-lg overflow-hidden border border-quantum-blue/20">
        {/* Contact Sidebar */}
        <div className="w-80 bg-black-hole border-r border-quantum-blue/20 flex flex-col">
          <div className="p-4 border-b border-quantum-blue/20">
            <h2 className="text-lg font-bold text-white mb-4">Connections</h2>
            <div className="relative">
              <Input 
                placeholder="Search contacts..." 
                className="bg-black-hole/50 border-quantum-blue/30 text-white"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="h-4 w-4 bg-gradient-to-r from-quantum-blue to-plasma-pink rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
            {contacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-300 hover:bg-quantum-blue/10 ${selectedContact.id === contact.id ? 'bg-quantum-blue/20' : ''}`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-hologram-purple/50">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="bg-black-hole text-quantum-blue">
                      {contact.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border border-black-hole ${
                    contact.status === 'online' ? 'bg-green-500' : 
                    contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white truncate">
                      {contact.name} {contact.isAI && <span className="text-xs ml-1 text-ai-green">AI</span>}
                    </h3>
                    <span className="text-xs text-gray-400">12m</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-black-hole to-black-hole/90">
          {/* Chat Header */}
          <div className="p-4 border-b border-quantum-blue/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-hologram-purple/50">
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback className="bg-black-hole text-quantum-blue">
                  {selectedContact.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-bold text-white">
                  {selectedContact.name} {selectedContact.isAI && <span className="text-xs ml-1 text-ai-green">AI</span>}
                </h3>
                <p className="text-xs text-gray-400">{selectedContact.status === 'online' ? 'Online' : selectedContact.status}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-white hover:bg-hologram-purple/20">
                <Image className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-hologram-purple/20">
                <Smile className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender !== 'User' && (
                    <ChatAvatar 
                      src={msg.avatar} 
                      alt={msg.sender} 
                      isAI={msg.sender === 'NEONA'}
                    />
                  )}
                  
                  <MessageBubble 
                    message={msg.message} 
                    sender={msg.sender} 
                    sentiment={msg.sentiment}
                    timestamp={msg.timestamp}
                  />
                  
                  {msg.sender === 'User' && (
                    <ChatAvatar 
                      src={msg.avatar} 
                      alt={msg.sender} 
                      isAI={false}
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-quantum-blue/20">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-hologram-purple/20">
                <PlusCircle className="h-5 w-5" />
              </Button>
              
              <div className="flex-1 relative">
                <Input 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="bg-black-hole/50 border-quantum-blue/30 text-white pr-12"
                />
                
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isFliRTMode && <span className="text-pink-500 mr-2">✨</span>}
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={`text-white ${isRecording ? 'bg-plasma-pink text-white' : 'hover:bg-hologram-purple/20'}`}
                onClick={toggleVoiceRecording}
              >
                <Mic className="h-5 w-5" />
              </Button>
              
              <Button 
                onClick={handleSendMessage}
                className="relative overflow-hidden rounded-full"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-plasma-pink to-hologram-purple"></span>
                <Send className="h-5 w-5 relative z-10" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
