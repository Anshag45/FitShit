import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipForward, CheckCircle, Star } from 'lucide-react';
import { Button } from '../common/Button';
import { BackButton } from '../common/BackButton';
import { InteractiveCard } from '../common/InteractiveCard';
import { InteractiveWorkout } from '../games/InteractiveWorkout';
import { ParticleSystem } from '../effects/ParticleSystem';
import { useApp } from '../../contexts/AppContext';

interface WorkoutSessionProps {
  onBack: () => void;
  onComplete: () => void;
}

export function WorkoutSession({ onBack, onComplete }: WorkoutSessionProps) {
  const { state, dispatch } = useApp();
  const { currentWorkout, currentExerciseIndex } = state;
  const [useInteractiveMode, setUseInteractiveMode] = useState(true);

  const currentExercise = currentWorkout?.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === currentWorkout?.exercises.length - 1;
  const progress = ((currentExerciseIndex + 1) / currentWorkout?.exercises.length) * 100;

  const handleCompleteExercise = (score?: number) => {
    if (isLastExercise) {
      const xpEarned = score ? Math.floor(score / 100) : 50;
      const coinsEarned = score ? Math.floor(score / 200) : 10;
      
      dispatch({ type: 'UPDATE_STATS', payload: {
        xp: state.userStats.xp + xpEarned,
        coins: state.userStats.coins + coinsEarned,
        totalWorkouts: state.userStats.totalWorkouts + 1,
        totalTime: state.userStats.totalTime + currentWorkout.duration
      }});
      
      dispatch({ type: 'END_WORKOUT' });
      onComplete();
    } else {
      dispatch({ type: 'NEXT_EXERCISE' });
    }
  };

  const handleSkipExercise = () => {
    handleCompleteExercise();
  };

  if (!currentWorkout || !currentExercise) {
    return null;
  }

  if (useInteractiveMode) {
    return (
      <InteractiveWorkout
        exercise={currentExercise}
        onComplete={handleCompleteExercise}
        onSkip={handleSkipExercise}
      />
    );
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${currentWorkout.backgroundGradient.join(', ')})`
      }}
    >
      <ParticleSystem count={300} color="#00d4ff" speed={1} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <BackButton onClick={onBack} variant="floating" />

      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm px-4 py-4 mt-16">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bold text-white text-lg"
          >
            {currentWorkout.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-sm"
          >
            Exercise {currentExerciseIndex + 1} of {currentWorkout.exercises.length}
          </motion.p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 px-4 py-2 bg-black/10">
        <div className="w-full bg-gray-800/30 rounded-full h-4 overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Exercise Content */}
      <div className="relative z-10 flex-1 p-4">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExerciseIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {/* Exercise Image */}
              <InteractiveCard className="p-4 mb-6 border border-gray-600/30 bg-gray-800/30" glowEffect>
                <motion.img
                  src={currentExercise.imageUrl}
                  alt={currentExercise.name}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {currentExercise.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 mb-4"
                >
                  {currentExercise.description}
                </motion.p>
                
                {/* Exercise Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between text-sm text-gray-300 bg-gray-900/50 rounded-2xl p-3"
                >
                  {currentExercise.sets && (
                    <div className="text-center">
                      <div className="font-bold text-white text-lg">{currentExercise.sets}</div>
                      <div>Sets</div>
                    </div>
                  )}
                  {currentExercise.reps && (
                    <div className="text-center">
                      <div className="font-bold text-white text-lg">{currentExercise.reps}</div>
                      <div>Reps</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">{currentExercise.duration}s</div>
                    <div>Duration</div>
                  </div>
                </motion.div>
              </InteractiveCard>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <InteractiveCard className="p-4 mb-6 border border-gray-600/30 bg-gray-800/30" glowEffect>
                  <h3 className="font-bold text-white text-lg mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-cyan-400" />
                    Mission Instructions
                  </h3>
                  <ol className="space-y-3">
                    {currentExercise.instructions.map((instruction, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-300">{instruction}</span>
                      </motion.li>
                    ))}
                  </ol>
                </InteractiveCard>
              </motion.div>

              {/* Mode Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="mb-6"
              >
                <InteractiveCard className="p-4 border border-gray-600/30 bg-gray-800/30" glowEffect>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Interactive Gaming Mode</span>
                    <button
                      onClick={() => setUseInteractiveMode(!useInteractiveMode)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        useInteractiveMode ? 'bg-cyan-500' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 bg-white rounded-full"
                        animate={{ x: useInteractiveMode ? 26 : 2 }}
                        transition={{ duration: 0.2 }}
                      />
                    </button>
                  </div>
                </InteractiveCard>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex space-x-3"
              >
                <Button
                  onClick={handleSkipExercise}
                  variant="outline"
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>Skip</span>
                </Button>
                
                <Button
                  onClick={() => handleCompleteExercise()}
                  variant="legendary"
                  className="flex-2 flex items-center justify-center space-x-2"
                  glowEffect
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isLastExercise ? 'Complete Mission' : 'Next Exercise'}</span>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}