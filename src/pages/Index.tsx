
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "NeonChat - Cybernetic Social Nexus";
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-black-hole">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
