import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverScale?: number;
  glowEffect?: boolean;
  pulseEffect?: boolean;
}

export function InteractiveCard({ 
  children, 
  className, 
  onClick, 
  hoverScale = 1.02,
  glowEffect = false,
  pulseEffect = false
}: InteractiveCardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 cursor-pointer relative overflow-hidden',
        glowEffect && 'shadow-lg hover:shadow-2xl hover:shadow-purple-500/20',
        className
      )}
      onClick={onClick}
      whileHover={{ 
        scale: hoverScale,
        boxShadow: glowEffect ? '0 20px 40px rgba(139, 92, 246, 0.3)' : undefined
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
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-2xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}