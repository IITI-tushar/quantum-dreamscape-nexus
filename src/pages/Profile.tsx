
import React, { useState } from 'react';
import AppLayout from '../components/layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Edit, Settings, Activity, MessageSquare, Camera, Upload } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import ProfileBioHelix from '../components/profile/ProfileBioHelix';

const Profile = () => {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/300?img=13");
  const [coverImage, setCoverImage] = useState("/images/cyberpunk-cover.jpg");
  const [hologramMode, setHologramMode] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const { toast } = useToast();
  
  // Stats for the Cyber-DNA visualization
  const stats = [
    { trait: "Humor", value: 78 },
    { trait: "Empathy", value: 92 },
    { trait: "Creativity", value: 85 },
    { trait: "Logic", value: 64 },
    { trait: "Charisma", value: 72 },
    { trait: "Technical", value: 88 },
  ];

  // User activity data
  const activities = [
    { type: "message", content: "Shared a cybernetic enhancement idea", timestamp: "2 hours ago" },
    { type: "reaction", content: "Reacted to Neo's post about AI ethics", timestamp: "Yesterday" },
    { type: "join", content: "Joined the Quantum Computing group", timestamp: "3 days ago" },
    { type: "post", content: "Posted an article about neural interfaces", timestamp: "1 week ago" },
  ];

  const handleAvatarClick = () => {
    setTapCount(prev => {
      const newCount = prev + 1;
      
      // Triple-tap to activate Espresso Mode (holographic AR graffiti)
      if (newCount === 3) {
        setHologramMode(true);
        toast({
          title: "Espresso Mode Activated",
          description: "Holographic AR graffiti now visible to your friends",
          duration: 3000,
        });
        return 0; // Reset counter
      }
      return newCount;
    });
  };

  return (
    <AppLayout title="NeonChat - Profile">
      <div className="max-w-4xl mx-auto">
        {/* Cover Image */}
        <div className="relative h-60 md:h-80 rounded-t-lg overflow-hidden mb-16 border border-quantum-blue/20">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${coverImage || "/images/cyberpunk-cover.jpg"})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black-hole to-transparent"></div>
          </div>
          
          {/* Change Cover Button */}
          <Button 
            size="sm"
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70"
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
          
          {/* Profile Avatar */}
          <div 
            className={`absolute -bottom-16 left-8 h-32 w-32 rounded-full border-4 cursor-pointer
              ${hologramMode ? 'border-ai-green animate-pulse' : 'border-quantum-blue'}`}
            onClick={handleAvatarClick}
          >
            <Avatar className="h-full w-full">
              <AvatarImage src={avatar} alt="User" />
              <AvatarFallback className="bg-black-hole text-quantum-blue text-2xl">
                U
              </AvatarFallback>
            </Avatar>
            
            {hologramMode && (
              <div className="absolute -inset-2 rounded-full border border-ai-green/50 animate-pulse-slow pointer-events-none"></div>
            )}
          </div>
          
          {/* Edit Profile Button */}
          <div className="absolute right-4 -bottom-12">
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="px-4 pt-16 pb-5">
          <h1 className="text-3xl font-bold text-white mb-1 flex items-center">
            CyberUser_X9
            {hologramMode && <span className="ml-2 text-ai-green text-xs">Espresso Mode</span>}
          </h1>
          <p className="text-gray-400 mb-4">@neuro_hacker | San Francisco, Neo-California</p>
          
          <p className="text-white/80 mb-6">
            Professional reality hacker and digital philosopher. Exploring the boundaries between human and machine consciousness since 2072. Augmented perception enthusiast.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="outline" size="sm" className="border-quantum-blue/50 text-quantum-blue">
              Cybernetics
            </Button>
            <Button variant="outline" size="sm" className="border-hologram-purple/50 text-hologram-purple">
              Neural Interfaces
            </Button>
            <Button variant="outline" size="sm" className="border-plasma-pink/50 text-plasma-pink">
              Digital Art
            </Button>
            <Button variant="outline" size="sm" className="border-ai-green/50 text-ai-green">
              AI Ethics
            </Button>
          </div>
        </div>
        
        {/* Tabs for Profile Sections */}
        <Tabs defaultValue="bio" className="mb-8">
          <TabsList className="bg-black-hole/50 border border-quantum-blue/20">
            <TabsTrigger value="bio" className="data-[state=active]:bg-quantum-blue/20">
              <User className="h-4 w-4 mr-2" />
              Bio DNA
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-quantum-blue/20">
              <Activity className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="connections" className="data-[state=active]:bg-quantum-blue/20">
              <MessageSquare className="h-4 w-4 mr-2" />
              Connections
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bio" className="mt-4">
            <Card className="bg-black-hole/30 border-quantum-blue/20">
              <CardHeader>
                <CardTitle className="text-white">Cyber-DNA Profile</CardTitle>
                <CardDescription>Your digital personality traits visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 relative">
                  <ProfileBioHelix stats={stats} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-4">
            <Card className="bg-black-hole/30 border-quantum-blue/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription>Your digital footprint in the network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-quantum-blue/10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-quantum-blue to-plasma-pink flex items-center justify-center text-white">
                        {activity.type === 'message' && <MessageSquare className="h-5 w-5" />}
                        {activity.type === 'reaction' && <Activity className="h-5 w-5" />}
                        {activity.type === 'join' && <User className="h-5 w-5" />}
                        {activity.type === 'post' && <Edit className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white">{activity.content}</p>
                        <p className="text-sm text-gray-400">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Load More</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="connections" className="mt-4">
            <Card className="bg-black-hole/30 border-quantum-blue/20">
              <CardHeader>
                <CardTitle className="text-white">Neural Network</CardTitle>
                <CardDescription>Your connections in the digital realm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-quantum-blue/20 rounded-lg bg-black-hole/50">
                      <Avatar className="h-12 w-12 border-2 border-hologram-purple/50">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${20 + i}`} />
                        <AvatarFallback className="bg-black-hole text-quantum-blue">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-white">Cyber Friend {i+1}</h3>
                        <p className="text-sm text-gray-400">Connected 2 weeks ago</p>
                      </div>
                      
                      <Button size="sm" variant="ghost" className="text-quantum-blue">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Connections</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
