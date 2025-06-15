import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Trophy, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

interface WelcomeProps {
  onNext: () => void;
}

export function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Vercel-style floating elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Zap className="w-10 h-10 text-black" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-7xl font-light text-white mb-6 tracking-tight"
          >
            FitQuest
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-white/60 mb-16 font-light"
          >
            Your epic gaming fitness adventure begins now
          </motion.p>

          <div className="space-y-8 mb-16">
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
                className="flex items-center space-x-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-white text-xl mb-1">{feature.title}</h3>
                  <p className="text-white/60 text-base">{feature.description}</p>
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
              variant="primary"
              className="w-full bg-white text-black hover:bg-white/90 font-medium text-lg py-4 px-8"
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