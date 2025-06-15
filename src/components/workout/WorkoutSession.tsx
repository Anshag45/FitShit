import React, { useEffect } from 'react';
import { ArrowLeft, SkipForward, CheckCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Timer } from '../common/Timer';
import { useApp } from '../../contexts/AppContext';

interface WorkoutSessionProps {
  onBack: () => void;
  onComplete: () => void;
}

export function WorkoutSession({ onBack, onComplete }: WorkoutSessionProps) {
  const { state, dispatch } = useApp();
  const { currentWorkout, currentExerciseIndex, timerActive, timerSeconds } = state;

  const currentExercise = currentWorkout?.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === currentWorkout?.exercises.length - 1;

  useEffect(() => {
    if (currentExercise && !timerActive && timerSeconds === 0) {
      dispatch({ type: 'START_TIMER', payload: currentExercise.duration });
    }
  }, [currentExercise, timerActive, timerSeconds, dispatch]);

  const handleStartTimer = () => {
    if (currentExercise) {
      dispatch({ type: 'START_TIMER', payload: currentExercise.duration });
    }
  };

  const handlePauseTimer = () => {
    dispatch({ type: 'STOP_TIMER' });
  };

  const handleStopTimer = () => {
    dispatch({ type: 'RESET_TIMER' });
  };

  const handleNextExercise = () => {
    if (isLastExercise) {
      // Complete workout
      const xpEarned = 50;
      const coinsEarned = 10;
      
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
    handleNextExercise();
  };

  if (!currentWorkout || !currentExercise) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-center">
            <h1 className="font-semibold text-gray-800">{currentWorkout.name}</h1>
            <p className="text-sm text-gray-600">
              Exercise {currentExerciseIndex + 1} of {currentWorkout.exercises.length}
            </p>
          </div>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 py-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentExerciseIndex + 1) / currentWorkout.exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Exercise Content */}
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          {/* Exercise Image */}
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <img
              src={currentExercise.imageUrl}
              alt={currentExercise.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentExercise.name}</h2>
            <p className="text-gray-600 mb-4">{currentExercise.description}</p>
            
            {/* Exercise Details */}
            <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
              {currentExercise.sets && (
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{currentExercise.sets}</div>
                  <div>Sets</div>
                </div>
              )}
              {currentExercise.reps && (
                <div className="text-center">
                  <div className="font-semibold text-gray-800">{currentExercise.reps}</div>
                  <div>Reps</div>
                </div>
              )}
              <div className="text-center">
                <div className="font-semibold text-gray-800">{currentExercise.duration}s</div>
                <div>Duration</div>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm text-center">
            <Timer
              seconds={timerSeconds}
              isActive={timerActive}
              onStart={handleStartTimer}
              onPause={handlePauseTimer}
              onStop={handleStopTimer}
              onReset={handleStopTimer}
            />
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Instructions</h3>
            <ol className="space-y-2">
              {currentExercise.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleSkipExercise}
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <SkipForward className="w-4 h-4" />
              <span>Skip</span>
            </Button>
            
            <Button
              onClick={handleNextExercise}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isLastExercise ? 'Complete' : 'Next'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}