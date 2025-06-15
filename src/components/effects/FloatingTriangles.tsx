import React from 'react';
import { motion } from 'framer-motion';

export function FloatingTriangles() {
  // Create multiple triangular shapes with different sizes and paths
  const triangles = [
    {
      id: 1,
      size: 120,
      opacity: 0.15,
      duration: 25,
      delay: 0,
      path: [
        { x: -100, y: window.innerHeight * 0.5 },
        { x: window.innerWidth * 0.3, y: window.innerHeight * 0.3 },
        { x: window.innerWidth * 0.7, y: window.innerHeight * 0.6 },
        { x: window.innerWidth + 100, y: window.innerHeight * 0.4 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.8 },
        { x: -100, y: window.innerHeight * 0.5 }
      ]
    },
    {
      id: 2,
      size: 80,
      opacity: 0.08,
      duration: 30,
      delay: 5,
      path: [
        { x: window.innerWidth + 50, y: window.innerHeight * 0.3 },
        { x: window.innerWidth * 0.6, y: window.innerHeight * 0.2 },
        { x: window.innerWidth * 0.2, y: window.innerHeight * 0.7 },
        { x: -50, y: window.innerHeight * 0.6 },
        { x: window.innerWidth * 0.4, y: window.innerHeight * 0.9 },
        { x: window.innerWidth + 50, y: window.innerHeight * 0.3 }
      ]
    },
    {
      id: 3,
      size: 60,
      opacity: 0.12,
      duration: 35,
      delay: 10,
      path: [
        { x: window.innerWidth * 0.5, y: -50 },
        { x: window.innerWidth * 0.8, y: window.innerHeight * 0.4 },
        { x: window.innerWidth * 0.1, y: window.innerHeight * 0.5 },
        { x: window.innerWidth * 0.6, y: window.innerHeight + 50 },
        { x: window.innerWidth * 0.3, y: window.innerHeight * 0.2 },
        { x: window.innerWidth * 0.5, y: -50 }
      ]
    }
  ];

  const createTrianglePath = (size: number) => {
    const height = (size * Math.sqrt(3)) / 2;
    return `M ${size/2} 0 L ${size} ${height} L 0 ${height} Z`;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {triangles.map((triangle) => (
        <motion.div
          key={triangle.id}
          className="absolute"
          initial={{ x: triangle.path[0].x, y: triangle.path[0].y }}
          animate={{
            x: triangle.path.map(p => p.x),
            y: triangle.path.map(p => p.y)
          }}
          transition={{
            duration: triangle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: triangle.delay
          }}
        >
          <svg
            width={triangle.size}
            height={triangle.size}
            viewBox={`0 0 ${triangle.size} ${triangle.size}`}
            className="drop-shadow-2xl"
          >
            <defs>
              <linearGradient id={`triangleGradient${triangle.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={triangle.opacity} />
                <stop offset="50%" stopColor="#ffffff" stopOpacity={triangle.opacity * 0.7} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={triangle.opacity * 0.3} />
              </linearGradient>
              <filter id={`glow${triangle.id}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <motion.path
              d={createTrianglePath(triangle.size)}
              fill={`url(#triangleGradient${triangle.id})`}
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity={triangle.opacity * 0.5}
              filter={`url(#glow${triangle.id})`}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: triangle.duration * 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </svg>
        </motion.div>
      ))}

      {/* Additional smaller triangular particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ]
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M 10 0 L 20 17.32 L 0 17.32 Z"
              fill="#ffffff"
              fillOpacity="0.03"
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeOpacity="0.05"
            />
          </svg>
        </motion.div>
      ))}

      {/* Wave-like flowing lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={`wave-${i}`}
            d={`M -100 ${window.innerHeight * (0.3 + i * 0.2)} Q ${window.innerWidth * 0.25} ${window.innerHeight * (0.2 + i * 0.2)} ${window.innerWidth * 0.5} ${window.innerHeight * (0.3 + i * 0.2)} T ${window.innerWidth + 100} ${window.innerHeight * (0.3 + i * 0.2)}`}
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
}