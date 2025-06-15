import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Trophy, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

interface WelcomeProps {
  onNext: () => void;
}

export function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-pink-500/20 rounded-full blur-xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
          >
            FitQuest
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-white/80 mb-12"
          >
            Your epic fitness adventure begins now
          </motion.p>

          <div className="space-y-6 mb-12">
            {[
              {
                icon: Target,
                title: 'AI-Powered Workouts',
                description: 'Personalized routines that evolve with you',
                delay: 0.7
              },
              {
                icon: Trophy,
                title: 'Epic Rewards System',
                description: 'Level up, earn coins, unlock achievements',
                delay: 0.9
              },
              {
                icon: Sparkles,
                title: 'Immersive Quests',
                description: 'Journey through space, become a ninja warrior',
                delay: 1.1
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: feature.delay }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-white text-lg">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <Button 
              onClick={onNext} 
              size="xl" 
              variant="cosmic"
              className="w-full"
              glowEffect
            >
              Begin Your Quest
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}