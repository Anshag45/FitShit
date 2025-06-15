import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function FloatingLogo() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Main floating logo */}
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
        <div className="w-32 h-32 flex items-center justify-center opacity-[0.03]">
          <Zap className="w-full h-full text-white" strokeWidth={0.5} />
        </div>
      </motion.div>

      {/* Secondary floating logos */}
      {[...Array(3)].map((_, i) => (
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
          <div className="w-16 h-16 flex items-center justify-center opacity-[0.02]">
            <Zap className="w-full h-full text-white" strokeWidth={0.3} />
          </div>
        </motion.div>
      ))}

      {/* Text logos */}
      <motion.div
        className="absolute text-6xl font-light text-white opacity-[0.015] select-none"
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
        FitQuest
      </motion.div>

      <motion.div
        className="absolute text-4xl font-light text-white opacity-[0.01] select-none"
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
        FITNESS GAMING
      </motion.div>
    </div>
  );
}