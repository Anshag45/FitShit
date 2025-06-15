import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import { Button } from '../common/Button';
import { BackButton } from '../common/BackButton';
import { InteractiveCard } from '../common/InteractiveCard';

interface WeightInfoProps {
  onNext: (data: { currentWeight: number; targetWeight: number; weightGoal: 'lose' | 'gain' | 'maintain' }) => void;
  onBack: () => void;
}

export function WeightInfo({ onNext, onBack }: WeightInfoProps) {
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [weightGoal, setWeightGoal] = useState<'lose' | 'gain' | 'maintain' | ''>('');

  const weightGoals = [
    { id: 'lose', title: 'Lose Weight', emoji: '📉', color: 'from-red-400 to-pink-500' },
    { id: 'gain', title: 'Gain Weight', emoji: '📈', color: 'from-green-400 to-emerald-500' },
    { id: 'maintain', title: 'Maintain Weight', emoji: '⚖️', color: 'from-cyan-400 to-blue-500' }
  ];

  const handleContinue = () => {
    if (currentWeight && targetWeight && weightGoal) {
      onNext({
        currentWeight: parseFloat(currentWeight),
        targetWeight: parseFloat(targetWeight),
        weightGoal: weightGoal
      });
    }
  };

  const isFormValid = currentWeight && targetWeight && weightGoal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl"
          animate={{ 
            scale: [1.1, 1.3, 1.1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
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
              <Scale className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Weight Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300"
            >
              Help us track your transformation
            </motion.p>
          </motion.div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-cyan-500/30 shadow-2xl">
            <div className="space-y-6">
              {/* Current Weight Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your current weight"
                  min="30"
                  max="300"
                  step="0.1"
                />
              </div>

              {/* Target Weight Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Weight (kg)
                </label>
                <input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your target weight"
                  min="30"
                  max="300"
                  step="0.1"
                />
              </div>

              {/* Weight Goal Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Weight Goal
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {weightGoals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setWeightGoal(goal.id as 'lose' | 'gain' | 'maintain')}
                      className={`p-4 rounded-xl transition-all duration-300 border-2 ${
                        weightGoal === goal.id
                          ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/25'
                          : 'border-gray-600/50 bg-gray-800/30 hover:border-cyan-400/50 hover:bg-gray-700/30'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-full flex items-center justify-center text-xl shadow-lg`}>
                          {goal.emoji}
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-white text-lg">{goal.title}</h3>
                        </div>
                        {weightGoal === goal.id && (
                          <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Button 
              onClick={handleContinue} 
              disabled={!isFormValid}
              size="lg"
              variant="cosmic"
              className="w-full"
              glowEffect
            >
              Continue Journey
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}