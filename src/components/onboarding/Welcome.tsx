import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { FloatingTriangles } from '../effects/FloatingTriangles';

interface WelcomeProps {
  onNext: () => void;
}

export function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingTriangles />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <div className="text-white/60 text-sm font-light tracking-wide">FEATURES</div>
            <div className="text-white/60 text-sm font-light tracking-wide">WORKOUTS</div>
            <div className="text-white/60 text-sm font-light tracking-wide">GAMES</div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-black transform rotate-45"></div>
            </div>
            <span className="text-white font-light text-lg tracking-wide">FitQuest</span>
            <div className="text-white/40 text-xs bg-white/10 px-2 py-1 rounded border border-white/20">25</div>
          </motion.div>
          
          <div className="flex items-center space-x-8">
            <div className="text-white/60 text-sm font-light tracking-wide">WATCH DEMO</div>
            <div className="text-white/60 text-sm font-light tracking-wide">SIGN UP</div>
            <div className="text-white/60 text-sm font-light tracking-wide">LOGIN</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-7xl lg:text-8xl font-light text-white mb-8 leading-none tracking-tight"
            >
              FitQuest's one-day
              <br />
              event for fitness
              <br />
              and gaming leaders
            </motion.h1>
            
            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-8 mb-12"
            >
              <div>
                <div className="text-white/60 text-sm font-light tracking-wide mb-2">NEW YORK CITY</div>
                <div className="text-white/60 text-sm font-light tracking-wide">AND ONLINE</div>
              </div>
              <div>
                <div className="text-white/60 text-sm font-light tracking-wide mb-2">JUNE 25, 2025</div>
                <div className="text-white/60 text-sm font-light tracking-wide">THE GLASSHOUSE</div>
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-end space-x-16 mb-12"
            >
              <div>
                <div className="text-white/60 text-sm font-light tracking-wide mb-2">ONLINE</div>
                <div className="text-white/60 text-sm font-light tracking-wide">FREE</div>
              </div>
              <div>
                <div className="text-white/60 text-sm font-light tracking-wide mb-2">IN-PERSON TICKETS</div>
                <div className="text-white/60 text-sm font-light tracking-wide">$600</div>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  onClick={onNext}
                  variant="primary"
                  className="bg-white text-black hover:bg-white/90 px-8 py-3 font-light tracking-wide flex items-center space-x-2"
                >
                  <span>BEGIN QUEST</span>
                  <span>→</span>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Triangle visualization area */}
          <div className="relative h-96 lg:h-full">
            {/* This space is for the floating triangles to be more prominent */}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}