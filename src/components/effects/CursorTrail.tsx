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

      setTrail(prev => [...prev.slice(-15), newPoint]); // Keep last 15 points
      setIsMoving(true);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set moving to false after 100ms of no movement
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    // Clean up old trail points
    const cleanupTrail = () => {
      const now = Date.now();
      setTrail(prev => prev.filter(point => now - point.timestamp < 1000));
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
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
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
              opacity: isMoving ? 0.8 : 0.3,
              strokeWidth: isMoving ? 4 : 2
            }}
            transition={{ 
              pathLength: { duration: 0.3 },
              opacity: { duration: 0.2 },
              strokeWidth: { duration: 0.2 }
            }}
          />
        )}
      </svg>

      {/* Trail particles */}
      <AnimatePresence>
        {trail.slice(-8).map((point, index) => (
          <motion.div
            key={point.id}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              left: point.x - 4,
              top: point.y - 4,
              background: `linear-gradient(45deg, #00d4ff, #8b5cf6, #ec4899)`,
              boxShadow: '0 0 10px rgba(0, 212, 255, 0.6)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isMoving ? 1 : 0.5, 
              opacity: isMoving ? 0.8 - (index * 0.1) : 0.3 - (index * 0.05)
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor glow */}
      {trail.length > 0 && (
        <motion.div
          className="absolute w-6 h-6 rounded-full pointer-events-none"
          style={{
            left: trail[trail.length - 1]?.x - 12,
            top: trail[trail.length - 1]?.y - 12,
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(236, 72, 153, 0.2) 100%)',
            filter: 'blur(8px)'
          }}
          animate={{
            scale: isMoving ? [1, 1.5, 1] : [1, 1.2, 1],
            opacity: isMoving ? 0.8 : 0.4
          }}
          transition={{
            scale: { duration: 0.6, repeat: Infinity },
            opacity: { duration: 0.3 }
          }}
        />
      )}
    </div>
  );
}