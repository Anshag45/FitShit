import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { Button } from '../common/Button';

interface GoalsProps {
  onNext: (goals: string[]) => void;
  onBack: () => void;
}

export function Goals({ onNext, onBack }: GoalsProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { id: 'weight_loss', title: 'Lose Weight', emoji: '⚖️' },
    { id: 'strength', title: 'Build Strength', emoji: '💪' },
    { id: 'endurance', title: 'Improve Endurance', emoji: '🏃‍♂️' },
    { id: 'flexibility', title: 'Increase Flexibility', emoji: '🧘‍♀️' },
    { id: 'health', title: 'General Health', emoji: '❤️' },
    { id: 'energy', title: 'Boost Energy', emoji: '⚡' }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">What are your goals?</h2>
          <p className="text-gray-600">Select all that apply</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedGoals.includes(goal.id)
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-center">
                <span className="text-2xl block mb-2">{goal.emoji}</span>
                <span className="text-sm font-medium text-gray-800">{goal.title}</span>
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
            disabled={selectedGoals.length === 0}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}