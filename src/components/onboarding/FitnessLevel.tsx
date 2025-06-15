import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { Button } from '../common/Button';
import { BackButton } from '../common/BackButton';

interface FitnessLevelProps {
  onNext: (fitnessLevel: 'beginner' | 'intermediate' | 'advanced') => void;
  onBack: () => void;
}

export function FitnessLevel({ onNext, onBack }: FitnessLevelProps) {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);

  const levels = [
    {
      id: 'beginner' as const,
      title: 'Space Cadet',
      description: 'New to the fitness galaxy or returning after a break',
      emoji: '🚀',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'intermediate' as const,
      title: 'Cosmic Explorer',
      description: 'Regular training, ready for interstellar challenges',
      emoji: '🌟',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      id: 'advanced' as const,
      title: 'Galactic Warrior',
      description: 'Elite fitness level, seeking the ultimate cosmic trials',
      emoji: '⚡',
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  const handleContinue = () => {
    if (selectedLevel) {
      onNext(selectedLevel);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          <BackButton onClick={onBack} className="absolute top-8 left-8" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Activity className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Choose Your Power Level</h2>
            <p className="text-white/70">This determines your cosmic training intensity</p>
          </motion.div>

          <div className="space-y-4 mb-8">
            {levels.map((level, index) => (
              <motion.button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
                  selectedLevel === level.id
                    ? 'border-white/50 bg-white/20 shadow-2xl'
                    : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${level.gradient} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                    {level.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl mb-1">{level.title}</h3>
                    <p className="text-white/70 text-sm">{level.description}</p>
                  </div>
                </div>
                
                {selectedLevel === level.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
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
              Activate Power Level
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}