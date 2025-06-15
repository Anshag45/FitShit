import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cosmic' | 'legendary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  isLoading?: boolean;
  glowEffect?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  isLoading = false,
  glowEffect = false,
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white hover:from-cyan-600 hover:via-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-cyan-500/25',
    secondary: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 shadow-2xl hover:shadow-emerald-500/25',
    outline: 'border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black backdrop-blur-sm',
    ghost: 'text-gray-300 hover:bg-gray-800/50 backdrop-blur-sm',
    cosmic: 'bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-600 text-white shadow-2xl hover:shadow-cyan-500/30 animate-pulse',
    legendary: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black shadow-2xl hover:shadow-yellow-500/30 animate-pulse'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl'
  };

  const glowClasses = glowEffect ? 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700' : '';

  return (
    <motion.button
      className={cn(baseClasses, variants[variant], sizes[size], glowClasses, className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}