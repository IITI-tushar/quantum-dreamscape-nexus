
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Video, User, Star, BarChart3, Layers } from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="w-10 h-10" />,
    title: "Sentiment Glow Chat Bubbles",
    description: "Messages ooze like liquid mercury, with colors shifting from blue (calm) to UV pink (excited) based on the emotional content of your messages.",
    gradient: "from-quantum-blue to-hologram-purple"
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    title: "AI-Generated Text Summaries",
    description: "Long chats trigger a holographic TL;DR. Neural network nodes pulse with key topics; tap to explode into keyword constellations.",
    gradient: "from-plasma-pink to-hologram-purple"
  },
  {
    icon: <User className="w-10 h-10" />,
    title: "Floating 3D Avatars",
    description: "Customizable metahuman models with AI Emotion Skin that blush, sweat, or glow based on chat tension via real-time simulation.",
    gradient: "from-ai-green to-biolum-teal"
  },
  {
    icon: <Video className="w-10 h-10" />,
    title: "Instant Video Reactions",
    description: "3-second clips auto-apply cyborg filters like T-1000 liquid metal eyes or Cyberpunk neon tattoos for quick emotional responses.",
    gradient: "from-biolum-teal to-quantum-blue"
  },
  {
    icon: <Layers className="w-10 h-10" />,
    title: "Parallax Message UI",
    description: "Chats float in 3D layers; tilt your device to see messages warp through a Tron-like grid with a black hole scrolling effect.",
    gradient: "from-hologram-purple to-plasma-pink"
  },
  {
    icon: <Star className="w-10 h-10" />,
    title: "Hyper-Responsive UI",
    description: "Buttons pre-light as your cursor approaches, and chat bubbles breathe when idle. Quantum animations trigger on hover.",
    gradient: "from-plasma-pink to-quantum-blue"
  }
];

export function FeaturesSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black-hole via-black-hole to-black-hole/80 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-blue to-plasma-pink text-glow">
              Beyond the Matrix
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Experience next-level communication with features pulled straight from 2077.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 rounded-xl`}></div>
              <div className="relative bg-black-hole/80 border border-hologram-purple/30 rounded-xl p-6 backdrop-blur-sm h-full transition-transform duration-300 group-hover:translate-y-[-5px]">
                <div className={`h-14 w-14 flex items-center justify-center bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
                
                {/* Corner Decorations */}
                <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-quantum-blue/50 rounded-tr"></div>
                <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-quantum-blue/50 rounded-bl"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
