
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-hologram-radial z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black-hole/90 via-black-hole/70 to-black-hole/90 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-black-hole/60 backdrop-blur-md rounded-2xl p-8 md:p-12 overflow-hidden border border-quantum-blue/30"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-quantum-blue via-hologram-purple to-plasma-pink"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-plasma-pink to-transparent"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-hologram-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-quantum-blue/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-plasma-pink via-hologram-purple to-quantum-blue text-glow">
                    Ready to Enter the Cybervoid?
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                  Join thousands of digital pioneers already communicating from the future. NeonChat is more than an app—it's a neural interface from 2077.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button 
                  size="lg" 
                  className="relative overflow-hidden group h-14 px-10 rounded-full text-lg w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-plasma-pink to-hologram-purple transition-transform duration-300 group-hover:scale-105"></span>
                  <span className="relative z-10 flex items-center">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="2" y="2" width="20" height="20" rx="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Create Your Neural Link
                  </span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="relative overflow-hidden group border-quantum-blue h-14 px-8 rounded-full text-lg hover:text-white w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-quantum-blue to-hologram-purple opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <span className="relative z-10">
                    Watch Demo
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 text-center"
              >
                <p className="text-white/60 text-sm">
                  By joining, you agree to our <span className="text-biolum-teal hover:text-white cursor-pointer">Cybernetic Terms</span> and <span className="text-biolum-teal hover:text-white cursor-pointer">Quantum Privacy Policy</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
