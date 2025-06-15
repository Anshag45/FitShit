import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function BackButton({ onClick, label = 'Back', className = '' }: BackButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center space-x-2 text-white/80 hover:text-white transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </motion.button>
  );
}