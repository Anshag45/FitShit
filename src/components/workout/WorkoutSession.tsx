import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipForward, CheckCircle, Star, Play, Pause, Timer } from 'lucide-react';
import { Button } from '../common/Button';
import { BackButton } from '../common/BackButton';
import { InteractiveCard } from '../common/InteractiveCard';
import { useApp } from '../../contexts/AppContext';

interface WorkoutSessionProps {
  onBack: () => void;
  onComplete: () => void;
}

export function WorkoutSession({ onBack, onComplete }: WorkoutSessionProps) {
  const { state, dispatch } = useApp();
  const { currentWorkout, currentExerciseIndex } = state;
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [exerciseStarted, setExerciseStarted] = useState(false);

  const currentExercise = currentWorkout?.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === (currentWorkout?.exercises.length || 0) - 1;
  const progress = ((currentExerciseIndex + 1) / (currentWorkout?.exercises.length || 1)) * 100;

  useEffect(() => {
    if (currentExercise && !exerciseStarted) {
      setTimeLeft(currentExercise.duration);
    }
  }, [currentExercise, exerciseStarted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
      handleCompleteExercise();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const handleStartExercise = () => {
    setExerciseStarted(true);
    setIsTimerActive(true);
    if (currentExercise) {
      setTimeLeft(currentExercise.duration);
    }
  };

  const handlePauseExercise = () => {
    setIsTimerActive(!isTimerActive);
  };

  const handleCompleteExercise = () => {
    setIsTimerActive(false);
    setExerciseStarted(false);
    
    // Award XP and coins for completing exercise
    dispatch({ type: 'UPDATE_STATS', payload: {
      xp: state.userStats.xp + 25,
      coins: state.userStats.coins + 10
    }});

    if (isLastExercise) {
      // Complete workout
      dispatch({ type: 'UPDATE_STATS', payload: {
        xp: state.userStats.xp + 100,
        coins: state.userStats.coins + 50,
        totalWorkouts: state.userStats.totalWorkouts + 1,
        totalTime: state.userStats.totalTime + (currentWorkout?.duration || 0)
      }});
      
      dispatch({ type: 'END_WORKOUT' });
      onComplete();
    } else {
      dispatch({ type: 'NEXT_EXERCISE' });
      setTimeLeft(0);
    }
  };

  const handleSkipExercise = () => {
    setIsTimerActive(false);
    setExerciseStarted(false);
    handleCompleteExercise();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentWorkout || !currentExercise) {
    return null;
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${currentWorkout.backgroundGradient.join(', ')})`
      }}
    >
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
              {/* Timer Display */}
              <InteractiveCard className="p-6 mb-6 text-center border border-gray-600/30 bg-gray-800/30" glowEffect>
                <div className="relative">
                  <motion.div 
                    className="text-6xl font-light text-white mb-4"
                    animate={{ 
                      scale: timeLeft <= 5 && timeLeft > 0 && isTimerActive ? [1, 1.2, 1] : 1,
                      color: timeLeft <= 5 && timeLeft > 0 && isTimerActive ? ['#ffffff', '#ff4757', '#ffffff'] : '#ffffff'
                    }}
                    transition={{ duration: 0.5, repeat: timeLeft <= 5 && timeLeft > 0 && isTimerActive ? Infinity : 0 }}
                  >
                    {formatTime(timeLeft)}
                  </motion.div>
                  <div className="text-white/60 text-sm font-light mb-4">
                    {isTimerActive ? 'Training...' : exerciseStarted ? 'Paused' : 'Ready'}
                  </div>
                  
                  {/* Timer Controls */}
                  <div className="flex justify-center space-x-4">
                    {!exerciseStarted ? (
                      <Button 
                        onClick={handleStartExercise} 
                        variant="primary" 
                        size="lg"
                        className="flex items-center space-x-2"
                        glowEffect
                      >
                        <Play className="w-5 h-5" />
                        <span>Start Exercise</span>
                      </Button>
                    ) : (
                      <Button 
                        onClick={handlePauseExercise} 
                        variant="outline" 
                        size="lg"
                        className="flex items-center space-x-2"
                      >
                        {isTimerActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        <span>{isTimerActive ? 'Pause' : 'Resume'}</span>
                      </Button>
                    )}
                  </div>
                </div>
              </InteractiveCard>

              {/* Exercise Details */}
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
                
                {/* Exercise Stats */}
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
                    Instructions
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
                  onClick={handleCompleteExercise}
                  variant="primary"
                  className="flex-2 flex items-center justify-center space-x-2"
                  glowEffect
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isLastExercise ? 'Complete Workout' : 'Complete Exercise'}</span>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}