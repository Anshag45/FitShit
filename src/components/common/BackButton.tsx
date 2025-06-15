import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  variant?: 'default' | 'floating' | 'minimal';
}

export function BackButton({ onClick, label = 'Back', className = '', variant = 'default' }: BackButtonProps) {
  const variants = {
    default: 'flex items-center space-x-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20',
    floating: 'fixed top-6 left-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 shadow-lg',
    minimal: 'flex items-center space-x-2 text-white/80 hover:text-white transition-colors'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ArrowLeft className="w-5 h-5" />
      {variant !== 'floating' && <span className="font-medium">{label}</span>}
    </motion.button>
  );
}