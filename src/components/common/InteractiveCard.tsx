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
    vercel: 'bg-white/[0.01] backdrop-blur-sm rounded-2xl border border-white/[0.05]'
  };

  const CardContent = (
    <motion.div
      className={cn(
        variants[variant],
        'relative overflow-hidden transition-all duration-300',
        onClick && 'cursor-pointer',
        glowEffect && 'hover:shadow-lg hover:shadow-white/5',
        className
      )}
      onClick={onClick}
      whileHover={{ 
        scale: hoverScale,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)'
      }}
      whileTap={{ scale: 0.98 }}
      animate={pulseEffect ? {
        scale: [1, 1.01, 1],
        opacity: [0.8, 1, 0.8]
      } : {}}
      transition={{ 
        duration: pulseEffect ? 2 : 0.2,
        repeat: pulseEffect ? Infinity : 0
      }}
    >
      {children}
      
      {/* Subtle hover glow */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] rounded-2xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );

  if (magnetic && onClick) {
    return (
      <MagneticEffect strength={0.1}>
        {CardContent}
      </MagneticEffect>
    );
  }

  return CardContent;
}