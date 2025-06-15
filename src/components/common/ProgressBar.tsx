import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  color?: 'purple' | 'green' | 'blue' | 'orange' | 'cosmic' | 'legendary' | 'cyan';
  animated?: boolean;
  glowEffect?: boolean;
}

export function ProgressBar({ 
  progress, 
  className, 
  showLabel = false, 
  label,
  color = 'cyan',
  animated = true,
  glowEffect = false
}: ProgressBarProps) {
  const colors = {
    purple: 'from-purple-500 to-purple-600',
    green: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    cosmic: 'from-cyan-500 via-purple-500 to-pink-500',
    legendary: 'from-yellow-400 via-orange-500 to-red-500',
    cyan: 'from-cyan-400 to-cyan-600'
  };

  const glowColors = {
    purple: 'shadow-purple-500/50',
    green: 'shadow-emerald-500/50',
    blue: 'shadow-blue-500/50',
    orange: 'shadow-orange-500/50',
    cosmic: 'shadow-cyan-500/50',
    legendary: 'shadow-yellow-500/50',
    cyan: 'shadow-cyan-500/50'
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span className="font-medium">{label}</span>
          <span className="font-bold">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-800/30 rounded-full h-4 overflow-hidden backdrop-blur-sm">
        <motion.div
          className={cn(
            'h-full bg-gradient-to-r transition-all duration-500',
            colors[color],
            glowEffect && `shadow-lg ${glowColors[color]}`
          )}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          transition={{ duration: animated ? 1 : 0, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}