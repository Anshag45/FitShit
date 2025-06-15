import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Target } from 'lucide-react';
import { Button } from '../common/Button';
import { BackButton } from '../common/BackButton';

interface AICoachIntroProps {
  onNext: (data: { spiritAnimal: string; workoutStyle: string; motivation: string }) => void;
  onBack: () => void;
}

export function AICoachIntro({ onNext, onBack }: AICoachIntroProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'spiritAnimal',
      title: 'Choose Your Spirit Animal',
      subtitle: 'This will shape your AI coach\'s personality',
      options: [
        { id: 'cheetah', title: 'Cheetah', emoji: '🐆', description: 'Fast, intense, explosive workouts' },
        { id: 'turtle', title: 'Turtle', emoji: '🐢', description: 'Steady, consistent, mindful approach' },
        { id: 'eagle', title: 'Eagle', emoji: '🦅', description: 'Focused, precise, soaring to new heights' },
        { id: 'bear', title: 'Bear', emoji: '🐻', description: 'Strong, powerful, building raw strength' }
      ]
    },
    {
      id: 'workoutStyle',
      title: 'What\'s Your Vibe?',
      subtitle: 'How do you like to train?',
      options: [
        { id: 'intense', title: 'Intense', emoji: '🔥', description: 'Push limits, break barriers' },
        { id: 'balanced', title: 'Balanced', emoji: '⚖️', description: 'Mix of strength, cardio, and flexibility' },
        { id: 'zen', title: 'Zen', emoji: '🧘‍♀️', description: 'Mindful movement, inner peace' }
      ]
    },
    {
      id: 'motivation',
      title: 'What Drives You?',
      subtitle: 'Your motivation style shapes your journey',
      options: [
        { id: 'competition', title: 'Competition', emoji: '🏆', description: 'Leaderboards, challenges, beating others' },
        { id: 'personal', title: 'Personal Growth', emoji: '📈', description: 'Self-improvement, beating yesterday' },
        { id: 'social', title: 'Community', emoji: '👥', description: 'Friends, support, shared goals' }
      ]
    }
  ];

  const currentQ = questions[currentQuestion];

  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [currentQ.id]: optionId };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onNext({
        spiritAnimal: newAnswers.spiritAnimal,
        workoutStyle: newAnswers.workoutStyle,
        motivation: newAnswers.motivation
      });
    }
  };

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
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <BackButton onClick={onBack} className="absolute top-8 left-8" />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Meet Your AI Coach
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/70"
            >
              Answer 3 quick questions to create your perfect training companion
            </motion.p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
            >
              <h2 className="text-2xl font-bold text-white mb-2">{currentQ.title}</h2>
              <p className="text-white/70 mb-6">{currentQ.subtitle}</p>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    className="w-full p-4 rounded-2xl border-2 border-white/20 hover:border-purple-400 transition-all duration-200 text-left bg-white/5 hover:bg-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{option.emoji}</span>
                      <div>
                        <h3 className="font-bold text-white text-lg">{option.title}</h3>
                        <p className="text-white/60 text-sm">{option.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}