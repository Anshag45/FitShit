import React from 'react';
import { Zap, Target, Trophy } from 'lucide-react';
import { Button } from '../common/Button';

interface WelcomeProps {
  onNext: () => void;
}

export function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to FitQuest
          </h1>
          <p className="text-gray-600">
            Your gamified fitness journey starts here!
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Personalized Workouts</h3>
              <p className="text-sm text-gray-600">Tailored to your goals and fitness level</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Earn Rewards</h3>
              <p className="text-sm text-gray-600">Level up, earn coins, and unlock achievements</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Stay Motivated</h3>
              <p className="text-sm text-gray-600">Track streaks and compete with friends</p>
            </div>
          </div>
        </div>

        <Button onClick={onNext} className="w-full" size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
}