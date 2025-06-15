import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { Button } from '../common/Button';

interface FitnessLevelProps {
  onNext: (fitnessLevel: 'beginner' | 'intermediate' | 'advanced') => void;
  onBack: () => void;
}

export function FitnessLevel({ onNext, onBack }: FitnessLevelProps) {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);

  const levels = [
    {
      id: 'beginner' as const,
      title: 'Beginner',
      description: 'New to exercise or getting back into it',
      emoji: '🌱'
    },
    {
      id: 'intermediate' as const,
      title: 'Intermediate',
      description: 'Exercise regularly, comfortable with basic movements',
      emoji: '💪'
    },
    {
      id: 'advanced' as const,
      title: 'Advanced',
      description: 'Very active, looking for challenging workouts',
      emoji: '🔥'
    }
  ];

  const handleContinue = () => {
    if (selectedLevel) {
      onNext(selectedLevel);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">What's your fitness level?</h2>
          <p className="text-gray-600">This helps us customize your workouts</p>
        </div>

        <div className="space-y-4 mb-8">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedLevel === level.id
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{level.emoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{level.title}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex space-x-4">
          <Button 
            type="button" 
            onClick={onBack} 
            variant="outline" 
            className="flex-1"
          >
            Back
          </Button>
          <Button 
            onClick={handleContinue} 
            disabled={!selectedLevel}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}