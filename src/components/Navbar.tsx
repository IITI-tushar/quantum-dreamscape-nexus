
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, User, Bell, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from '@/hooks/use-mobile';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black-hole/80 backdrop-blur-lg border-b border-quantum-blue/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2"
        >
          <div className="relative h-10 w-10 rounded-full bg-gradient-to-r from-quantum-blue to-plasma-pink p-0.5 shadow-neon-blue">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-black-hole rounded-full m-0.5 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-blue via-hologram-purple to-plasma-pink animate-pulse-neon">
              NeonChat
            </span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6">
            <NavItem to="/messages" icon={<MessageSquare className="w-4 h-4 mr-2" />} label="Messages" />
            <NavItem to="/profile" icon={<User className="w-4 h-4 mr-2" />} label="Profile" />
            <NavItem to="/notifications" icon={<Bell className="w-4 h-4 mr-2" />} label="Notifications" />
          </nav>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {!isMobile ? (
            <>
              <Button
                variant="ghost"
                className="relative rounded-full overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-quantum-blue to-plasma-pink opacity-70 blur-sm"></span>
                <span className="absolute inset-0 bg-black-hole rounded-full m-px"></span>
                <span className="relative text-white z-10">Log In</span>
              </Button>
              
              <Button 
                className="relative overflow-hidden rounded-full"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-plasma-pink to-hologram-purple"></span>
                <span className="relative z-10">Sign Up</span>
              </Button>
              
              <Avatar className="border-2 border-hologram-purple/50 h-10 w-10 ml-4">
                <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="User" />
                <AvatarFallback className="bg-black-hole text-quantum-blue">U</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-hologram-purple/20"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black-hole/95 backdrop-blur-lg border-b border-quantum-blue/20 p-4 animate-flow-up">
          <nav className="flex flex-col gap-4">
            <MobileNavItem to="/messages" icon={<MessageSquare className="w-5 h-5 mr-3" />} label="Messages" />
            <MobileNavItem to="/profile" icon={<User className="w-5 h-5 mr-3" />} label="Profile" />
            <MobileNavItem to="/notifications" icon={<Bell className="w-5 h-5 mr-3" />} label="Notifications" />
            
            <div className="border-t border-hologram-purple/20 my-2 pt-2"></div>
            
            <Button 
              variant="ghost" 
              className="justify-start text-lg py-3"
            >
              Log In
            </Button>
            
            <Button 
              className="relative overflow-hidden rounded-md justify-start text-lg py-3"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-plasma-pink to-hologram-purple"></span>
              <span className="relative z-10">Sign Up</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

// Navigation Item for Desktop
const NavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <Link 
    to={to} 
    className="text-white/80 hover:text-plasma-pink transition-colors flex items-center animated-underline"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

// Navigation Item for Mobile
const MobileNavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <Link 
    to={to} 
    className="text-white/80 hover:text-plasma-pink transition-colors flex items-center text-lg py-2"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
