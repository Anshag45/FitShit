import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let animationFrame: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TrailPoint = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };

      setTrail(prev => [...prev.slice(-30), newPoint]);
      setIsMoving(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    const cleanupTrail = () => {
      const now = Date.now();
      setTrail(prev => prev.filter(point => now - point.timestamp < 2000));
      animationFrame = requestAnimationFrame(cleanupTrail);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationFrame = requestAnimationFrame(cleanupTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {trail.length > 1 && (
          <motion.path
            d={`M ${trail.map((point, index) => {
              if (index === 0) return `${point.x} ${point.y}`;
              const prevPoint = trail[index - 1];
              const cpx = (prevPoint.x + point.x) / 2;
              const cpy = (prevPoint.y + point.y) / 2;
              return `Q ${prevPoint.x} ${prevPoint.y} ${cpx} ${cpy}`;
            }).join(' ')}`}
            stroke="url(#trailGradient)"
            strokeWidth={isMoving ? "4" : "2"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: isMoving ? 0.9 : 0.3,
              strokeWidth: isMoving ? 4 : 2
            }}
            transition={{ 
              pathLength: { duration: 0.4 },
              opacity: { duration: 0.3 },
              strokeWidth: { duration: 0.3 }
            }}
          />
        )}
      </svg>

      {/* Flowing particles */}
      <AnimatePresence>
        {trail.slice(-15).map((point, index) => (
          <motion.div
            key={point.id}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{
              left: point.x - 2,
              top: point.y - 2,
              background: '#ffffff',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isMoving ? 1 : 0.3, 
              opacity: isMoving ? 0.8 - (index * 0.05) : 0.2 - (index * 0.02)
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor glow */}
      {trail.length > 0 && (
        <motion.div
          className="absolute w-12 h-12 rounded-full pointer-events-none"
          style={{
            left: trail[trail.length - 1]?.x - 24,
            top: trail[trail.length - 1]?.y - 24,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
            filter: 'blur(8px)'
          }}
          animate={{
            scale: isMoving ? [1, 1.4, 1] : [1, 1.2, 1],
            opacity: isMoving ? 0.8 : 0.4
          }}
          transition={{
            scale: { duration: 1, repeat: Infinity },
            opacity: { duration: 0.4 }
          }}
        />
      )}
    </div>
  );
}