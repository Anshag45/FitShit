import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Star, Coins } from 'lucide-react';
import { Button } from '../common/Button';

interface CompleteProps {
  onComplete: () => void;
  userName: string;
}

export function Complete({ onComplete, userName }: CompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Celebration particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              opacity: 0
            }}
            animate={{ 
              y: -20,
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-2"
          >
            Welcome to the Galaxy, {userName}!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 mb-8 text-lg"
          >
            Your cosmic fitness adventure is ready to launch
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-xl font-bold text-white">Launch Rewards</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-400">100</div>
                <div className="text-sm text-white/60">XP Points</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-yellow-400">50</div>
                <div className="text-sm text-white/60">Cosmic Coins</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="text-white font-bold">1</div>
                </div>
                <div className="text-2xl font-bold text-blue-400">1</div>
                <div className="text-sm text-white/60">Level</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <Button 
              onClick={onComplete} 
              size="xl" 
              variant="legendary"
              className="w-full"
              glowEffect
            >
              Launch Into Space! 🚀
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}