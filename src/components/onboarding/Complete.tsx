import React from 'react';
import { CheckCircle, Zap } from 'lucide-react';
import { Button } from '../common/Button';

interface CompleteProps {
  onComplete: () => void;
  userName: string;
}

export function Complete({ onComplete, userName }: CompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            You're all set, {userName}!
          </h1>
          <p className="text-gray-600 mb-6">
            Your personalized fitness journey is ready to begin
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-semibold text-gray-800">Starting Rewards</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">100</div>
              <div className="text-sm text-gray-600">XP Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">50</div>
              <div className="text-sm text-gray-600">Coins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
          </div>
        </div>

        <Button onClick={onComplete} className="w-full" size="lg">
          Start My Journey
        </Button>
      </div>
    </div>
  );
}