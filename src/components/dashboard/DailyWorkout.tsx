import React from 'react';
import { Play, Clock, Zap, Target } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../contexts/AppContext';
import { getPersonalizedWorkout } from '../../data/workouts';

interface DailyWorkoutProps {
  onStartWorkout: () => void;
}

export function DailyWorkout({ onStartWorkout }: DailyWorkoutProps) {
  const { state, dispatch } = useApp();
  const { user } = state;

  const todaysWorkout = user ? getPersonalizedWorkout(user.fitnessLevel, user.goals) : null;

  const handleStartWorkout = () => {
    if (todaysWorkout) {
      dispatch({ type: 'START_WORKOUT', payload: todaysWorkout });
      onStartWorkout();
    }
  };

  if (!todaysWorkout) return null;

  const difficultyColors = {
    easy: 'text-green-600 bg-green-100',
    medium: 'text-orange-600 bg-orange-100',
    hard: 'text-red-600 bg-red-100'
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Today's Workout</h2>
          <p className="text-purple-100">Personalized just for you</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Zap className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">{todaysWorkout.name}</h3>
        <p className="text-purple-100 text-sm mb-3">{todaysWorkout.description}</p>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{todaysWorkout.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4" />
            <span>{todaysWorkout.exercises.length} exercises</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[todaysWorkout.difficulty]} text-gray-800`}>
            {todaysWorkout.difficulty}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <div className="text-purple-100">Estimated burn</div>
          <div className="font-semibold">{todaysWorkout.calories} calories</div>
        </div>
        
        <Button 
          onClick={handleStartWorkout}
          variant="secondary"
          className="flex items-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>Start Workout</span>
        </Button>
      </div>
    </div>
  );
}