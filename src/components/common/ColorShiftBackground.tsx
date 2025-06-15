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
    },
    cyberpunk: {
      colors: [
        'linear-gradient(45deg, #0f0f23, #1a1a2e, #16213e)',
        'linear-gradient(45deg, #1a1a2e, #16213e, #0f3460)',
        'linear-gradient(45deg, #16213e, #0f3460, #533483)',
        'linear-gradient(45deg, #0f3460, #533483, #0f0f23)'
      ]
    },
    neon: {
      colors: [
        'linear-gradient(45deg, #000000, #1a0033, #330066)',
        'linear-gradient(45deg, #1a0033, #330066, #4d0099)',
        'linear-gradient(45deg, #330066, #4d0099, #6600cc)',
        'linear-gradient(45deg, #4d0099, #6600cc, #000000)'
      ]
    },
    vercel: {
      colors: [
        '#000000',
        '#000000',
        '#000000',
        '#000000'
      ]
    }
  };

  const intensityDurations = {
    subtle: 20,
    medium: 12,
    intense: 6
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
      {/* Vercel-style floating elements */}
      {variant === 'vercel' && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-white/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Other variant particles */}
      {variant !== 'vercel' && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
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
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}