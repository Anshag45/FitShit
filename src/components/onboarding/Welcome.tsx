import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Button } from '../common/Button';
import { FloatingLogo } from '../effects/FloatingLogo';

interface WelcomeProps {
  onNext: () => void;
}

export function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingLogo />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.005] to-transparent" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
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
              className="text-8xl font-light text-white mb-8 tracking-tight"
            >
              FitQuest
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl text-white/60 mb-20 font-light max-w-2xl mx-auto"
            >
              Your epic gaming fitness adventure begins now
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: 'AI-Powered Workouts',
                description: 'Personalized routines that evolve with you',
                delay: 0.7
              },
              {
                title: 'Epic Rewards System',
                description: 'Level up, earn coins, unlock achievements',
                delay: 0.9
              },
              {
                title: 'Immersive Quests',
                description: 'Journey through space, become a ninja warrior',
                delay: 1.1
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                className="text-center"
              >
                <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.05] hover:border-white/10 transition-all duration-300">
                  <h3 className="font-light text-white text-xl mb-4">{feature.title}</h3>
                  <p className="text-white/60 text-base font-light leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="text-center"
          >
            <Button 
              onClick={onNext} 
              size="xl" 
              variant="primary"
              className="font-light text-lg py-6 px-12"
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