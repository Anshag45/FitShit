import React from 'react';
import type { Achievement } from '../../types';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked?: boolean;
}

export function AchievementBadge({ achievement, unlocked = false }: AchievementBadgeProps) {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border ${
      unlocked 
        ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' 
        : 'border-gray-200'
    }`}>
      <div className="text-center">
        <div className={`text-3xl mb-2 ${unlocked ? '' : 'grayscale opacity-50'}`}>
          {achievement.icon}
        </div>
        <h3 className={`font-semibold mb-1 ${unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
          {achievement.name}
        </h3>
        <p className={`text-sm ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
          {achievement.description}
        </p>
        {!unlocked && (
          <div className="mt-2 text-xs text-gray-500">
            Progress: 0/{achievement.requirement}
          </div>
        )}
        {unlocked && achievement.unlockedAt && (
          <div className="mt-2 text-xs text-green-600">
            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}