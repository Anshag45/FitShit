import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Target } from 'lucide-react';
import { Button } from '../common/Button';
import { BackButton } from '../common/BackButton';
import { InteractiveCard } from '../common/InteractiveCard';

interface WeightInfoProps {
  onNext: (data: { currentWeight: number; targetWeight: number; weightGoal: 'lose' | 'gain' | 'maintain' }) => void;
  onBack: () => void;
}

export function WeightInfo({ onNext, onBack }: WeightInfoProps) {
  const [weightData, setWeightData] = useState({
    currentWeight: '',
    targetWeight: '',
    weightGoal: '' as 'lose' | 'gain' | 'maintain' | ''
  });

  const weightGoals = [
    { id: 'lose', title: 'Lose Weight', emoji: '📉', color: 'from-red-400 to-orange-500' },
    { id: 'gain', title: 'Gain Weight', emoji: '📈', color: 'from-green-400 to-emerald-500' },
    { id: 'maintain', title: 'Maintain Weight', emoji: '⚖️', color: 'from-blue-400 to-cyan-500' }
  ];

  const handleContinue = () => {
    if (weightData.currentWeight && weightData.targetWeight && weightData.weightGoal) {
      onNext({
        currentWeight: parseFloat(weightData.currentWeight),
        targetWeight: parseFloat(weightData.targetWeight),
        weightGoal: weightData.weightGoal
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background */}
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
          className="absolute bottom-20 right-20 w-40 h-40 bg-pink-500/15 rounded-full blur-2xl"
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
              className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
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
              className="text-white/70"
            >
              Help us track your cosmic transformation
            </motion.p>
          </motion.div>

          <InteractiveCard className="p-6 mb-6" glowEffect>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Current Weight (kg)
                </label>
                <motion.input
                  type="number"
                  value={weightData.currentWeight}
                  onChange={(e) => setWeightData({ ...weightData, currentWeight: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your current weight"
                  min="30"
                  max="300"
                  step="0.1"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Target Weight (kg)
                </label>
                <motion.input
                  type="number"
                  value={weightData.targetWeight}
                  onChange={(e) => setWeightData({ ...weightData, targetWeight: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your target weight"
                  min="30"
                  max="300"
                  step="0.1"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-4">
                  Weight Goal
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {weightGoals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <InteractiveCard
                        onClick={() => setWeightData({ ...weightData, weightGoal: goal.id as any })}
                        className={`p-4 transition-all duration-300 ${
                          weightData.weightGoal === goal.id
                            ? 'border-white/50 bg-white/20 shadow-2xl ring-2 ring-purple-400/50'
                            : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
                        }`}
                        hoverScale={1.02}
                        glowEffect={weightData.weightGoal === goal.id}
                      >
                        <div className="flex items-center space-x-4">
                          <motion.div 
                            className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-full flex items-center justify-center text-xl shadow-lg`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            {goal.emoji}
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white text-lg">{goal.title}</h3>
                          </div>
                          {weightData.weightGoal === goal.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                            >
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </motion.div>
                          )}
                        </div>
                      </InteractiveCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </InteractiveCard>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Button 
              onClick={handleContinue} 
              disabled={!weightData.currentWeight || !weightData.targetWeight || !weightData.weightGoal}
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