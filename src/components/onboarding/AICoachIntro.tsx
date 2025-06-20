import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { BackButton } from '../common/BackButton';
import { InteractiveCard } from '../common/InteractiveCard';

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
      title: 'Choose Your Gaming Style',
      subtitle: 'This will shape your AI coach\'s personality',
      options: [
        { id: 'cheetah', title: 'Speed Demon', emoji: '🐆', description: 'Fast, intense, explosive workouts' },
        { id: 'turtle', title: 'Steady Grinder', emoji: '🐢', description: 'Consistent, methodical approach' },
        { id: 'eagle', title: 'Precision Master', emoji: '🦅', description: 'Focused, precise, soaring to new heights' },
        { id: 'bear', title: 'Power House', emoji: '🐻', description: 'Strong, powerful, building raw strength' }
      ]
    },
    {
      id: 'workoutStyle',
      title: 'What\'s Your Vibe?',
      subtitle: 'How do you like to train?',
      options: [
        { id: 'intense', title: 'Hardcore', emoji: '🔥', description: 'Push limits, break barriers' },
        { id: 'balanced', title: 'Balanced', emoji: '⚖️', description: 'Mix of strength, cardio, and flexibility' },
        { id: 'zen', title: 'Zen Mode', emoji: '🧘‍♀️', description: 'Mindful movement, inner peace' }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
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
          className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <BackButton onClick={onBack} variant="floating" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
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
              className="text-gray-300"
            >
              Answer 3 quick questions to create your perfect training companion
            </motion.p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-800/30 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
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
              className="bg-gray-800/30 backdrop-blur-lg rounded-3xl p-6 border border-cyan-500/30 shadow-2xl"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white mb-2"
              >
                {currentQ.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-300 mb-6"
              >
                {currentQ.subtitle}
              </motion.p>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <InteractiveCard
                      onClick={() => handleAnswer(option.id)}
                      className="p-4 border-2 border-gray-600/50 hover:border-cyan-400/50 bg-gray-800/30 hover:bg-gray-700/30"
                      hoverScale={1.02}
                      glowEffect
                    >
                      <div className="flex items-center space-x-4">
                        <motion.span 
                          className="text-3xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {option.emoji}
                        </motion.span>
                        <div>
                          <h3 className="font-bold text-white text-lg">{option.title}</h3>
                          <p className="text-gray-400 text-sm">{option.description}</p>
                        </div>
                      </div>
                    </InteractiveCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}