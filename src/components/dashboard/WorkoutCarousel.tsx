import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, Zap, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../contexts/AppContext';
import { workouts } from '../../data/workouts';

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

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Featured Workouts</h2>
        <div className="flex space-x-2">
          <motion.button
            onClick={prevWorkout}
            className="p-2 bg-white/10 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            onClick={nextWorkout}
            className="p-2 bg-white/10 rounded-full backdrop-blur-sm"
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
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${currentWorkout.backgroundGradient.join(', ')})`
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  {currentWorkout.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white/80 mb-4"
                >
                  {currentWorkout.description}
                </motion.p>
              </div>
              <motion.div
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="flex items-center space-x-6 text-white/90 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{currentWorkout.duration} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span className="font-medium">{currentWorkout.exercises.length} exercises</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span className="font-medium">{currentWorkout.calories} cal</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-white/80">
                <div className="text-sm">Difficulty</div>
                <div className="font-bold capitalize">{currentWorkout.difficulty}</div>
              </div>
              
              <Button 
                onClick={() => handleStartWorkout(currentWorkout)}
                variant="secondary"
                size="lg"
                className="flex items-center space-x-2"
                glowEffect
              >
                <Play className="w-5 h-5" />
                <span>Start Mission</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Workout indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {workouts.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/40'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}