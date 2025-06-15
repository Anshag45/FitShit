import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { Button } from '../common/Button';
import { BackButton } from '../common/BackButton';
import { InteractiveCard } from '../common/InteractiveCard';

interface FitnessLevelProps {
  onNext: (fitnessLevel: 'beginner' | 'intermediate' | 'advanced') => void;
  onBack: () => void;
}

export function FitnessLevel({ onNext, onBack }: FitnessLevelProps) {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);

  const levels = [
    {
      id: 'beginner' as const,
      title: 'Rookie Gamer',
      description: 'New to the fitness realm or returning after a break',
      emoji: '🎮',
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 'intermediate' as const,
      title: 'Pro Player',
      description: 'Regular training, ready for advanced challenges',
      emoji: '🏆',
      gradient: 'from-cyan-400 to-purple-500',
      bgGradient: 'from-cyan-500/20 to-purple-500/20'
    },
    {
      id: 'advanced' as const,
      title: 'Elite Champion',
      description: 'Master level fitness, seeking ultimate challenges',
      emoji: '👑',
      gradient: 'from-orange-400 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const handleContinue = () => {
    if (selectedLevel) {
      onNext(selectedLevel);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <BackButton onClick={onBack} variant="floating" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <Activity className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Choose Your Level
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300"
            >
              This determines your gaming difficulty
            </motion.p>
          </motion.div>

          <div className="space-y-4 mb-8">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <InteractiveCard
                  onClick={() => setSelectedLevel(level.id)}
                  className={`p-6 transition-all duration-300 ${
                    selectedLevel === level.id
                      ? 'border-cyan-400 bg-cyan-500/20 shadow-2xl ring-2 ring-cyan-400/50'
                      : 'border-gray-600/50 bg-gray-800/30 hover:border-cyan-400/50 hover:bg-gray-700/30'
                  }`}
                  hoverScale={1.03}
                  glowEffect={selectedLevel === level.id}
                >
                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${level.gradient} rounded-full flex items-center justify-center text-2xl shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {level.emoji}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-xl mb-1">{level.title}</h3>
                      <p className="text-gray-300 text-sm">{level.description}</p>
                    </div>
                    {selectedLevel === level.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              onClick={handleContinue} 
              disabled={!selectedLevel}
              size="lg"
              variant="cosmic"
              className="w-full"
              glowEffect
            >
              Activate Level
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}