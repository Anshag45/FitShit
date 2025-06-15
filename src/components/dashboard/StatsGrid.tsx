import React from 'react';
import { Trophy, Flame, Clock, Target } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function StatsGrid() {
  const { state } = useApp();
  const { userStats } = state;

  const stats = [
    {
      icon: Trophy,
      label: 'Total Workouts',
      value: userStats.totalWorkouts,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: userStats.streak,
      color: 'text-red-600 bg-red-100'
    },
    {
      icon: Clock,
      label: 'Total Time',
      value: `${userStats.totalTime}m`,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Target,
      label: 'Level',
      value: userStats.level,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}