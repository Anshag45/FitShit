import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { MagneticEffect } from '../effects/MagneticEffect';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cosmic' | 'legendary' | 'vercel';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  isLoading?: boolean;
  glowEffect?: boolean;
  magnetic?: boolean;
}

export function Button({ 
  variant = 'vercel', 
  size = 'md', 
  className, 
  children, 
  isLoading = false,
  glowEffect = false,
  magnetic = true,
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-light rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden cursor-pointer border';
  
  const variants = {
    primary: 'bg-white text-black border-white hover:bg-white/90 shadow-lg',
    secondary: 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20',
    outline: 'border-white/20 text-white hover:bg-white/5 backdrop-blur-sm',
    ghost: 'text-white/80 hover:bg-white/5 backdrop-blur-sm border-transparent hover:text-white',
    cosmic: 'bg-white/10 text-white border-white/20 hover:bg-white/20',
    legendary: 'bg-white text-black border-white hover:bg-white/90',
    vercel: 'bg-white text-black border-white hover:bg-white/90 font-light'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl'
  };

  const glowClasses = glowEffect ? 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700' : '';

  const ButtonContent = (
    <motion.button
      className={cn(baseClasses, variants[variant], sizes[size], glowClasses, className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );

  if (magnetic) {
    return (
      <MagneticEffect strength={0.15}>
        {ButtonContent}
      </MagneticEffect>
    );
  }

  return ButtonContent;
}