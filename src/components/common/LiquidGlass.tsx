import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  colorShift?: boolean;
  animated?: boolean;
}

export function LiquidGlass({ 
  children, 
  className, 
  intensity = 'medium',
  colorShift = false,
  animated = true
}: LiquidGlassProps) {
  const intensityClasses = {
    light: 'bg-gray-900/20 backdrop-blur-sm border-gray-600/20',
    medium: 'bg-gray-800/30 backdrop-blur-lg border-gray-500/30',
    heavy: 'bg-gray-700/40 backdrop-blur-xl border-gray-400/40'
  };

  const colorShiftAnimation = colorShift ? {
    background: [
      'linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(147, 51, 234, 0.1))',
      'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
      'linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))',
      'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))'
    ]
  } : {};

  return (
    <motion.div
      className={cn(
        'rounded-2xl border relative overflow-hidden',
        intensityClasses[intensity],
        className
      )}
      animate={animated ? colorShiftAnimation : {}}
      transition={animated ? {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      } : {}}
    >
      {/* Liquid glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />
      
      {/* Animated light reflection */}
      {animated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
          style={{ transform: 'skewX(-20deg)' }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}