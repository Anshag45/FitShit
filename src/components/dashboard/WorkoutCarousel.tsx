import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, Zap, Target, ChevronLeft, ChevronRight, Star, Flame, Trophy } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../contexts/AppContext';
import { workouts } from '../../data/workouts';
import { InteractiveCard } from '../common/InteractiveCard';

interface WorkoutCarouselProps {
  onStartWorkout: () => void;
}

export function WorkoutCarousel({ onStartWorkout }: WorkoutCarouselProps) {
  const { state, dispatch } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStartWorkout = (workout: any) => {
    dispatch({ type: 'START_WORKOUT', payload: workout });
    onStartWorkout();
  };

  const nextWorkout = () => {
    setCurrentIndex((prev) => (prev + 1) % workouts.length);
  };

  const prevWorkout = () => {
    setCurrentIndex((prev) => (prev - 1 + workouts.length) % workouts.length);
  };

  const currentWorkout = workouts[currentIndex];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-white/60 bg-white/10';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Featured Workouts</h2>
        <div className="flex space-x-2">
          <motion.button
            onClick={prevWorkout}
            className="p-3 bg-white/[0.02] border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/[0.05] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            onClick={nextWorkout}
            className="p-3 bg-white/[0.02] border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/[0.05] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <InteractiveCard
            className="relative overflow-hidden bg-white/[0.02] border-white/[0.05]"
            glowEffect
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                background: `linear-gradient(135deg, ${currentWorkout.backgroundGradient.join(', ')})`
              }}
            />
            
            <div className="relative z-10 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl font-light text-white"
                    >
                      {currentWorkout.name}
                    </motion.h3>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-light ${getDifficultyColor(currentWorkout.difficulty)}`}>
                      {currentWorkout.difficulty.toUpperCase()}
                    </span>
                    
                    {currentWorkout.theme && (
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-light">
                        {currentWorkout.theme.toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/80 mb-6 text-lg font-light"
                  >
                    {currentWorkout.description}
                  </motion.p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-white/90">
                      <Clock className="w-5 h-5 text-cyan-400" />
                      <span className="font-light">{currentWorkout.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/90">
                      <Target className="w-5 h-5 text-cyan-400" />
                      <span className="font-light">{currentWorkout.exercises.length} exercises</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/90">
                      <Flame className="w-5 h-5 text-cyan-400" />
                      <span className="font-light">{currentWorkout.calories} cal</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/90">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <span className="font-light capitalize">{currentWorkout.intensity}</span>
                    </div>
                  </div>

                  {/* Exercise preview */}
                  <div className="mb-6">
                    <h4 className="text-white/80 font-light mb-3">Exercises included:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentWorkout.exercises.slice(0, 4).map((exercise, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/[0.05] text-white/70 rounded-full text-sm font-light border border-white/10"
                        >
                          {exercise.name}
                        </span>
                      ))}
                      {currentWorkout.exercises.length > 4 && (
                        <span className="px-3 py-1 bg-white/[0.05] text-white/70 rounded-full text-sm font-light border border-white/10">
                          +{currentWorkout.exercises.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <motion.div
                  className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm ml-8"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="w-10 h-10 text-white" />
                </motion.div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-white/80">
                    <div className="text-sm font-light">Estimated Rewards</div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-cyan-400 font-light">+{Math.floor(currentWorkout.calories / 4)} XP</span>
                      <span className="text-yellow-400 font-light">+{Math.floor(currentWorkout.calories / 8)} Coins</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleStartWorkout(currentWorkout)}
                  variant="primary"
                  size="lg"
                  className="flex items-center space-x-3 font-light"
                  glowEffect
                >
                  <Play className="w-5 h-5" />
                  <span>Start Mission</span>
                </Button>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>
      </AnimatePresence>

      {/* Workout indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {workouts.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/40'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <InteractiveCard className="p-4 bg-white/[0.02] border-white/[0.05]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-white/80 font-light">Last workout: +85 XP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-red-400" />
                <span className="text-white/80 font-light">Best streak: {state.userStats.streak} days</span>
              </div>
            </div>
            <div className="text-white/60 text-sm font-light">
              {state.userStats.totalWorkouts} missions completed
            </div>
          </div>
        </InteractiveCard>
      </motion.div>
    </div>
  );
}