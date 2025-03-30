
import React, { useState } from 'react';
import AppLayout from '../components/layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { 
  User, Settings as SettingsIcon, Shield, Bell, Eye, 
  Zap, Palette, Monitor, Volume2, VolumeX, 
  Lock, Upload, Download, Brain, Save,
  Camera, HardDrive, Laptop, Smartphone
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Settings = () => {
  const [retinaSafeMode, setRetinaSafeMode] = useState(false);
  const [gyroNavigation, setGyroNavigation] = useState(false);
  const [neuralScroll, setNeuralScroll] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [neonIntensity, setNeonIntensity] = useState(70);
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(50);
  const [ambientSoundVolume, setAmbientSoundVolume] = useState(30);
  const { toast } = useToast();
  
  const saveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated",
      duration: 3000,
    });
  };

  return (
    <AppLayout title="NeonChat - Settings">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black-hole/30 border-quantum-blue/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2 text-quantum-blue" />
              Settings
            </CardTitle>
            <CardDescription>Customize your NeonChat experience</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="appearance" className="mt-2">
              <TabsList className="bg-black-hole/50 border border-quantum-blue/20 mb-4">
                <TabsTrigger value="appearance" className="data-[state=active]:bg-quantum-blue/20">
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-quantum-blue/20">
                  <Zap className="h-4 w-4 mr-2" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="audio" className="data-[state=active]:bg-quantum-blue/20">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Audio
                </TabsTrigger>
                <TabsTrigger value="privacy" className="data-[state=active]:bg-quantum-blue/20">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="account" className="data-[state=active]:bg-quantum-blue/20">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
              </TabsList>
              
              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Display Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="retina-safe-mode" className="text-white">Retina Safe Mode</Label>
                        <p className="text-sm text-gray-400">Reduces neon intensity after extended use</p>
                      </div>
                      <Switch 
                        id="retina-safe-mode" 
                        checked={retinaSafeMode} 
                        onCheckedChange={setRetinaSafeMode} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="neon-intensity" className="text-white">Neon Intensity</Label>
                        <span className="text-sm text-gray-400">{neonIntensity}%</span>
                      </div>
                      <Slider 
                        id="neon-intensity"
                        min={0}
                        max={100}
                        step={1}
                        value={[neonIntensity]}
                        onValueChange={(value) => setNeonIntensity(value[0])}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Interface Options</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="gyro-navigation" className="text-white">Gyro-Aim Navigation</Label>
                        <p className="text-sm text-gray-400">Tilt device to aim and navigate menus</p>
                      </div>
                      <Switch 
                        id="gyro-navigation" 
                        checked={gyroNavigation} 
                        onCheckedChange={setGyroNavigation} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="neural-scroll" className="text-white">Neural Scroll</Label>
                        <p className="text-sm text-gray-400">Look at bottom of screen to auto-scroll</p>
                      </div>
                      <Switch 
                        id="neural-scroll" 
                        checked={neuralScroll} 
                        onCheckedChange={setNeuralScroll} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="haptic-feedback" className="text-white">Haptic Feedback</Label>
                        <p className="text-sm text-gray-400">Vibration feedback for UI interactions</p>
                      </div>
                      <Switch 
                        id="haptic-feedback" 
                        checked={hapticFeedback} 
                        onCheckedChange={setHapticFeedback} 
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Performance Tab */}
              <TabsContent value="performance">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">3D Rendering</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="webgpu" className="text-white">WebGPU Acceleration</Label>
                        <p className="text-sm text-gray-400">Uses your GPU for faster 3D rendering</p>
                      </div>
                      <Switch id="webgpu" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="low-poly" className="text-white">Low-Poly Ghost Avatars</Label>
                        <p className="text-sm text-gray-400">Load lightweight models first, then upgrade</p>
                      </div>
                      <Switch id="low-poly" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Network & Caching</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="preloading" className="text-white">Nanobot Pre-Loader</Label>
                        <p className="text-sm text-gray-400">AI predicts and pre-loads resources</p>
                      </div>
                      <Switch id="preloading" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="offline" className="text-white">EMP Shield (Offline Mode)</Label>
                        <p className="text-sm text-gray-400">Cache critical assets for offline use</p>
                      </div>
                      <Switch id="offline" defaultChecked />
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <Label className="text-white">Cache Storage</Label>
                        <p className="text-sm text-gray-400">1.2 GB used of 2.0 GB</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <HardDrive className="h-4 w-4 mr-2" />
                        Clear Cache
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Device Optimization</h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <Button variant="outline" className="flex flex-col h-24 space-y-2">
                        <Smartphone className="h-8 w-8 text-quantum-blue" />
                        <span>Mobile</span>
                      </Button>
                      <Button variant="default" className="flex flex-col h-24 space-y-2 bg-quantum-blue/50">
                        <Laptop className="h-8 w-8" />
                        <span>Balanced</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-24 space-y-2">
                        <Monitor className="h-8 w-8 text-plasma-pink" />
                        <span>Ultra</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Audio Tab */}
              <TabsContent value="audio">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Sound Effects</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sound-effects" className="text-white">Enable Sound Effects</Label>
                        <p className="text-sm text-gray-400">UI interaction sounds</p>
                      </div>
                      <Switch id="sound-effects" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sfx-volume" className="text-white">Sound Effects Volume</Label>
                        <span className="text-sm text-gray-400 flex items-center">
                          {soundEffectsVolume}%
                          <Volume2 className="h-4 w-4 ml-2" />
                        </span>
                      </div>
                      <Slider 
                        id="sfx-volume"
                        min={0}
                        max={100}
                        step={1}
                        value={[soundEffectsVolume]}
                        onValueChange={(value) => setSoundEffectsVolume(value[0])}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Ambient Sound</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ambient-sound" className="text-white">Enable Ambient Sound</Label>
                        <p className="text-sm text-gray-400">Background cyberpunk soundtrack</p>
                      </div>
                      <Switch id="ambient-sound" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ambient-volume" className="text-white">Ambient Volume</Label>
                        <span className="text-sm text-gray-400 flex items-center">
                          {ambientSoundVolume}%
                          <Volume2 className="h-4 w-4 ml-2" />
                        </span>
                      </div>
                      <Slider 
                        id="ambient-volume"
                        min={0}
                        max={100}
                        step={1}
                        value={[ambientSoundVolume]}
                        onValueChange={(value) => setAmbientSoundVolume(value[0])}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Haptic Narration</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="haptic-narration" className="text-white">Haptic Narration</Label>
                        <p className="text-sm text-gray-400">Vibration patterns for voice messages</p>
                      </div>
                      <Switch id="haptic-narration" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mute-all" className="text-white">Mute All Sounds</Label>
                        <p className="text-sm text-gray-400">Disable all audio output</p>
                      </div>
                      <Switch id="mute-all" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Privacy Tab */}
              <TabsContent value="privacy">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Privacy Controls</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ai-sentiment" className="text-white">AI Sentiment Analysis</Label>
                        <p className="text-sm text-gray-400">Analyze message emotions for visualizations</p>
                      </div>
                      <Switch id="ai-sentiment" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="espresso-mode" className="text-white">Espresso Mode (AR Graffiti)</Label>
                        <p className="text-sm text-gray-400">Share hidden AR messages with friends</p>
                      </div>
                      <Switch id="espresso-mode" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ai-wingman" className="text-white">AI Wingman</Label>
                        <p className="text-sm text-gray-400">AI-suggested flirtatious responses</p>
                      </div>
                      <Switch id="ai-wingman" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Data & Security</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-collection" className="text-white">AI Training Data Collection</Label>
                        <p className="text-sm text-gray-400">Help improve NeonChat AI systems</p>
                      </div>
                      <Switch id="data-collection" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="neural-tracking" className="text-white">Neural Tracking</Label>
                        <p className="text-sm text-gray-400">Enable webcam for Neural Scroll</p>
                      </div>
                      <Switch id="neural-tracking" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center justify-center">
                        <Download className="h-4 w-4 mr-2" />
                        Request My Data
                      </Button>
                      
                      <Button variant="outline" className="text-red-500 border-red-500/50 hover:bg-red-500/10">
                        <Lock className="h-4 w-4 mr-2" />
                        Security Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Account Tab */}
              <TabsContent value="account">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-24 w-24 border-2 border-quantum-blue">
                      <AvatarImage src="https://i.pravatar.cc/300?img=13" />
                      <AvatarFallback className="bg-black-hole text-quantum-blue text-xl">
                        U
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-medium text-white">Profile Image</h3>
                      <p className="text-sm text-gray-400">Update your avatar image</p>
                      
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="display-name" className="text-white">Display Name</Label>
                      <Input id="display-name" defaultValue="CyberUser_X9" className="bg-black-hole/50 border-quantum-blue/30" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white">Username</Label>
                      <Input id="username" defaultValue="neuro_hacker" className="bg-black-hole/50 border-quantum-blue/30" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input id="email" type="email" defaultValue="neuro@hacker.net" className="bg-black-hole/50 border-quantum-blue/30" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-white">Bio</Label>
                      <Input 
                        id="bio" 
                        defaultValue="Professional reality hacker and digital philosopher." 
                        className="bg-black-hole/50 border-quantum-blue/30" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-quantum-blue/20">
                    <Button onClick={saveChanges} className="w-full relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-quantum-blue to-plasma-pink"></span>
                      <Save className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10">Save Changes</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
