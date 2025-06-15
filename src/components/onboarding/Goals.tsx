import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { Button } from '../common/Button';
import { BackButton } from '../common/BackButton';

interface GoalsProps {
  onNext: (goals: string[]) => void;
  onBack: () => void;
}

export function Goals({ onNext, onBack }: GoalsProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { id: 'weight_loss', title: 'Lose Weight', emoji: '🔥', gradient: 'from-red-400 to-orange-500' },
    { id: 'strength', title: 'Build Strength', emoji: '💪', gradient: 'from-purple-400 to-indigo-500' },
    { id: 'endurance', title: 'Boost Endurance', emoji: '🏃‍♂️', gradient: 'from-blue-400 to-cyan-500' },
    { id: 'flexibility', title: 'Increase Flexibility', emoji: '🧘‍♀️', gradient: 'from-green-400 to-emerald-500' },
    { id: 'health', title: 'General Health', emoji: '❤️', gradient: 'from-pink-400 to-rose-500' },
    { id: 'energy', title: 'Boost Energy', emoji: '⚡', gradient: 'from-yellow-400 to-orange-500' }
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      onNext(selectedGoals);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-20 left-20 w-36 h-36 bg-green-500/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
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
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Target className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Set Your Mission</h2>
            <p className="text-white/70">Choose your cosmic objectives (select all that apply)</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {goals.map((goal, index) => (
              <motion.button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                  selectedGoals.includes(goal.id)
                    ? 'border-white/50 bg-white/20 shadow-2xl scale-105'
                    : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: selectedGoals.includes(goal.id) ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-r ${goal.gradient} rounded-full flex items-center justify-center text-xl mx-auto mb-3 shadow-lg`}>
                    {goal.emoji}
                  </div>
                  <span className="text-sm font-bold text-white">{goal.title}</span>
                </div>
                
                {selectedGoals.includes(goal.id) && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button 
              onClick={handleContinue} 
              disabled={selectedGoals.length === 0}
              size="lg"
              variant="cosmic"
              className="w-full"
              glowEffect
            >
              Launch Mission ({selectedGoals.length} selected)
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}