import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { MagneticEffect } from '../effects/MagneticEffect';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverScale?: number;
  glowEffect?: boolean;
  pulseEffect?: boolean;
  magnetic?: boolean;
  variant?: 'default' | 'vercel';
}

export function InteractiveCard({ 
  children, 
  className, 
  onClick, 
  hoverScale = 1.02,
  glowEffect = false,
  pulseEffect = false,
  magnetic = true,
  variant = 'vercel'
}: InteractiveCardProps) {
  const variants = {
    default: 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20',
    vercel: 'bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10'
  };

  const CardContent = (
    <motion.div
      className={cn(
        variants[variant],
        'relative overflow-hidden',
        onClick && 'cursor-pointer',
        glowEffect && 'shadow-lg hover:shadow-2xl hover:shadow-white/10',
        className
      )}
      onClick={onClick}
      whileHover={{ 
        scale: hoverScale,
        boxShadow: glowEffect ? '0 20px 40px rgba(255, 255, 255, 0.1)' : undefined
      }}
      whileTap={{ scale: 0.98 }}
      animate={pulseEffect ? {
        scale: [1, 1.02, 1],
        opacity: [0.8, 1, 0.8]
      } : {}}
      transition={{ 
        duration: pulseEffect ? 2 : 0.2,
        repeat: pulseEffect ? Infinity : 0
      }}
    >
      {children}
      
      {/* Hover glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-2xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );

  if (magnetic && onClick) {
    return (
      <MagneticEffect strength={0.15}>
        {CardContent}
      </MagneticEffect>
    );
  }

  return CardContent;
}