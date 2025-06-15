import React from 'react';
import { User, Bell, Settings } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function Header() {
  const { state } = useApp();
  const { user, userStats } = state;

  const xpToNextLevel = userStats.level * 1000; // Simple progression
  const xpProgress = (userStats.xp % 1000) / 10; // Progress as percentage

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Hey, {user?.name || 'Fitness Hero'}! 👋
            </h1>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-purple-600 font-medium">Level {userStats.level}</span>
              <span className="text-green-600 font-medium">{userStats.coins} coins</span>
              <span className="text-orange-600 font-medium">{userStats.streak} day streak</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* XP Progress Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>{userStats.xp} XP</span>
          <span>{xpToNextLevel} XP to level {userStats.level + 1}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}