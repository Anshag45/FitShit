import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showLabel?: boolean;
  label?: string;
  color?: 'purple' | 'green' | 'blue' | 'orange';
}

export function ProgressBar({ 
  progress, 
  className, 
  showLabel = false, 
  label,
  color = 'purple' 
}: ProgressBarProps) {
  const colors = {
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
    green: 'bg-gradient-to-r from-green-500 to-emerald-500',
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    orange: 'bg-gradient-to-r from-orange-500 to-orange-600'
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={cn('h-full transition-all duration-500 ease-out', colors[color])}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}