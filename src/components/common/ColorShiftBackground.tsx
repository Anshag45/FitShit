import React from 'react';
import { motion } from 'framer-motion';

interface ColorShiftBackgroundProps {
  children: React.ReactNode;
  variant?: 'cosmic' | 'aurora' | 'nebula' | 'galaxy';
  intensity?: 'subtle' | 'medium' | 'intense';
}

export function ColorShiftBackground({ 
  children, 
  variant = 'cosmic',
  intensity = 'medium'
}: ColorShiftBackgroundProps) {
  const variants = {
    cosmic: {
      colors: [
        'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
        'linear-gradient(45deg, #764ba2, #f093fb, #4facfe)',
        'linear-gradient(45deg, #f093fb, #4facfe, #43e97b)',
        'linear-gradient(45deg, #4facfe, #43e97b, #667eea)'
      ]
    },
    aurora: {
      colors: [
        'linear-gradient(45deg, #00c9ff, #92fe9d, #ff9a9e)',
        'linear-gradient(45deg, #92fe9d, #ff9a9e, #a8edea)',
        'linear-gradient(45deg, #ff9a9e, #a8edea, #fecfef)',
        'linear-gradient(45deg, #a8edea, #fecfef, #00c9ff)'
      ]
    },
    nebula: {
      colors: [
        'linear-gradient(45deg, #ff6b6b, #ee5a24, #ff9ff3)',
        'linear-gradient(45deg, #ee5a24, #ff9ff3, #54a0ff)',
        'linear-gradient(45deg, #ff9ff3, #54a0ff, #5f27cd)',
        'linear-gradient(45deg, #54a0ff, #5f27cd, #ff6b6b)'
      ]
    },
    galaxy: {
      colors: [
        'linear-gradient(45deg, #2c3e50, #3498db, #9b59b6)',
        'linear-gradient(45deg, #3498db, #9b59b6, #e74c3c)',
        'linear-gradient(45deg, #9b59b6, #e74c3c, #f39c12)',
        'linear-gradient(45deg, #e74c3c, #f39c12, #2c3e50)'
      ]
    }
  };

  const intensityDurations = {
    subtle: 12,
    medium: 8,
    intense: 4
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      animate={{
        background: variants[variant].colors
      }}
      transition={{
        duration: intensityDurations[intensity],
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
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