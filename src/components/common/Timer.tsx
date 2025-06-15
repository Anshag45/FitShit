import React from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface TimerProps {
  seconds: number;
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onReset: () => void;
  maxSeconds?: number;
}

export function Timer({ seconds, isActive, onStart, onPause, onStop, onReset, maxSeconds = 60 }: TimerProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((maxSeconds - seconds) / maxSeconds) * 100;
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <motion.div 
          className="relative w-48 h-48"
          animate={{ 
            scale: isActive ? [1, 1.05, 1] : 1,
          }}
          transition={{ 
            duration: 1,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              stroke="url(#timerGradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div 
                className="text-4xl font-bold text-white mb-2"
                animate={{ 
                  scale: seconds <= 5 && seconds > 0 ? [1, 1.2, 1] : 1,
                  color: seconds <= 5 && seconds > 0 ? ['#ffffff', '#ff4757', '#ffffff'] : '#ffffff'
                }}
                transition={{ duration: 0.5, repeat: seconds <= 5 && seconds > 0 ? Infinity : 0 }}
              >
                {formatTime(minutes, remainingSeconds)}
              </motion.div>
              <div className="text-white/60 text-sm font-medium">
                {isActive ? 'Training...' : 'Ready'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="flex space-x-4">
        {!isActive ? (
          <Button 
            onClick={onStart} 
            size="md" 
            variant="cosmic"
            className="flex items-center space-x-2"
            glowEffect
          >
            <Play className="w-5 h-5" />
            <span>Start</span>
          </Button>
        ) : (
          <Button 
            onClick={onPause} 
            size="md" 
            variant="outline" 
            className="flex items-center space-x-2"
          >
            <Pause className="w-5 h-5" />
            <span>Pause</span>
          </Button>
        )}
        <Button 
          onClick={onStop} 
          size="md" 
          variant="ghost" 
          className="flex items-center space-x-2"
        >
          <Square className="w-5 h-5" />
          <span>Stop</span>
        </Button>
      </div>
    </div>
  );
}