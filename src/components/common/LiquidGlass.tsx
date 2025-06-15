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
    light: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-lg border-white/20',
    heavy: 'bg-white/20 backdrop-blur-xl border-white/30'
  };

  const colorShiftAnimation = colorShift ? {
    background: [
      'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
      'linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))',
      'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
      'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(139, 92, 246, 0.1))'
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
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
      
      {/* Animated light reflection */}
      {animated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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