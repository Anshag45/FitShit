import React from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { Button } from './Button';

interface TimerProps {
  seconds: number;
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onReset: () => void;
}

export function Timer({ seconds, isActive, onStart, onPause, onStop, onReset }: TimerProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCircleProgress = () => {
    // Assuming this is for exercise timer, calculate progress based on typical exercise duration
    const maxSeconds = 60; // Default max for visualization
    return ((maxSeconds - seconds) / maxSeconds) * 100;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - getCircleProgress() / 100)}`}
            className="text-purple-600 transition-all duration-1000 ease-linear"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">
            {formatTime(minutes, remainingSeconds)}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-3">
        {!isActive ? (
          <Button onClick={onStart} size="sm" className="flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Start</span>
          </Button>
        ) : (
          <Button onClick={onPause} size="sm" variant="outline" className="flex items-center space-x-2">
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </Button>
        )}
        <Button onClick={onStop} size="sm" variant="ghost" className="flex items-center space-x-2">
          <Square className="w-4 h-4" />
          <span>Stop</span>
        </Button>
      </div>
    </div>
  );
}