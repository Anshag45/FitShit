import React from 'react';
import { motion } from 'framer-motion';

export function FloatingLogo() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Main floating triangular logo */}
      <motion.div
        className="absolute"
        initial={{ x: -100, y: window.innerHeight / 2 }}
        animate={{
          x: [
            -100,
            window.innerWidth * 0.2,
            window.innerWidth * 0.8,
            window.innerWidth + 100,
            window.innerWidth * 0.6,
            window.innerWidth * 0.3,
            -100
          ],
          y: [
            window.innerHeight / 2,
            window.innerHeight * 0.3,
            window.innerHeight * 0.7,
            window.innerHeight * 0.4,
            window.innerHeight * 0.8,
            window.innerHeight * 0.2,
            window.innerHeight / 2
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-[0.03]">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 40 5 L 75 65 L 5 65 Z"
            fill="url(#logoGradient)"
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.1"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>

      {/* Secondary floating triangular elements */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight 
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ]
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 8
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-[0.02]">
            <path
              d="M 20 2 L 38 34 L 2 34 Z"
              fill="#ffffff"
              fillOpacity="0.3"
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
          </svg>
        </motion.div>
      ))}

      {/* Text logos floating */}
      <motion.div
        className="absolute text-4xl font-light text-white opacity-[0.008] select-none tracking-wider"
        initial={{ x: window.innerWidth, y: window.innerHeight * 0.6 }}
        animate={{
          x: [-200, window.innerWidth + 200],
          y: [
            window.innerHeight * 0.6,
            window.innerHeight * 0.4,
            window.innerHeight * 0.8,
            window.innerHeight * 0.6
          ]
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        FITQUEST
      </motion.div>

      <motion.div
        className="absolute text-2xl font-light text-white opacity-[0.005] select-none tracking-widest"
        initial={{ x: -300, y: window.innerHeight * 0.3 }}
        animate={{
          x: [window.innerWidth + 300, -300],
          y: [
            window.innerHeight * 0.3,
            window.innerHeight * 0.7,
            window.innerHeight * 0.2,
            window.innerHeight * 0.3
          ]
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
          delay: 10
        }}
      >
        FITNESS × GAMING
      </motion.div>
    </div>
  );
}