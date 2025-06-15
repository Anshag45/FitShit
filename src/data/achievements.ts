import type { Achievement } from '../types';

export const achievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first workout',
    icon: '🏃‍♂️',
    requirement: 1,
    type: 'workouts'
  },
  {
    id: '2',
    name: 'Streak Starter',
    description: 'Complete workouts for 3 days in a row',
    icon: '🔥',
    requirement: 3,
    type: 'streak'
  },
  {
    id: '3',
    name: 'Dedication',
    description: 'Complete workouts for 7 days in a row',
    icon: '⭐',
    requirement: 7,
    type: 'streak'
  },
  {
    id: '4',
    name: 'Workout Warrior',
    description: 'Complete 10 total workouts',
    icon: '💪',
    requirement: 10,
    type: 'workouts'
  },
  {
    id: '5',
    name: 'Time Master',
    description: 'Spend 60 minutes total working out',
    icon: '⏱️',
    requirement: 60,
    type: 'time'
  },
  {
    id: '6',
    name: 'Level Up',
    description: 'Reach level 5',
    icon: '🎯',
    requirement: 5,
    type: 'level'
  },
  {
    id: '7',
    name: 'Consistency King',
    description: 'Complete workouts for 30 days in a row',
    icon: '👑',
    requirement: 30,
    type: 'streak'
  },
  {
    id: '8',
    name: 'Century Club',
    description: 'Complete 100 total workouts',
    icon: '🏆',
    requirement: 100,
    type: 'workouts'
  }
];

export function checkAchievements(userStats: any, currentAchievements: Achievement[]): Achievement[] {
  const newAchievements: Achievement[] = [];
  const unlockedIds = currentAchievements.map(a => a.id);

  achievements.forEach(achievement => {
    if (unlockedIds.includes(achievement.id)) return;

    let meetsRequirement = false;
    switch (achievement.type) {
      case 'workouts':
        meetsRequirement = userStats.totalWorkouts >= achievement.requirement;
        break;
      case 'streak':
        meetsRequirement = userStats.streak >= achievement.requirement;
        break;
      case 'time':
        meetsRequirement = userStats.totalTime >= achievement.requirement;
        break;
      case 'level':
        meetsRequirement = userStats.level >= achievement.requirement;
        break;
    }

    if (meetsRequirement) {
      newAchievements.push({
        ...achievement,
        unlockedAt: new Date().toISOString()
      });
    }
  });

  return newAchievements;
}