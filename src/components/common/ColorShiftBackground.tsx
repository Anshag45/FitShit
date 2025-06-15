import React from 'react';
import { motion } from 'framer-motion';

interface ColorShiftBackgroundProps {
  children: React.ReactNode;
  variant?: 'cosmic' | 'aurora' | 'nebula' | 'galaxy' | 'cyberpunk' | 'neon' | 'vercel';
  intensity?: 'subtle' | 'medium' | 'intense';
}

export function ColorShiftBackground({ 
  children, 
  variant = 'vercel',
  intensity = 'subtle'
}: ColorShiftBackgroundProps) {
  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-black"
    >
      {/* Vercel-style floating elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white/5 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}