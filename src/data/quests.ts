import type { Quest } from '../types';

export const quests: Quest[] = [
  {
    id: 'space-explorer',
    name: 'Space Explorer',
    description: 'Journey through the cosmos, unlocking new planets with each workout',
    theme: 'space',
    duration: 56, // 8 weeks
    backgroundImage: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1200',
    chapters: [
      {
        id: 'earth-departure',
        name: 'Earth Departure',
        description: 'Begin your cosmic journey',
        workoutId: '1',
        storyText: 'You stand at the launch pad, ready to begin your interstellar fitness journey...',
        unlockImage: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'mars-landing',
        name: 'Mars Landing',
        description: 'Adapt to the red planet\'s gravity',
        workoutId: '2',
        storyText: 'The red dust swirls as you land on Mars. Time to test your strength in lower gravity...',
        unlockImage: 'https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'jupiter-moons',
        name: 'Jupiter\'s Moons',
        description: 'Navigate the gas giant\'s satellite system',
        workoutId: '3',
        storyText: 'The massive storms of Jupiter rage below as you train on its mysterious moons...',
        unlockImage: 'https://images.pexels.com/photos/87009/earth-soil-creep-moon-87009.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ],
    rewards: {
      xp: 1000,
      coins: 500,
      skillPoints: 50,
      unlockedContent: ['space-suit-avatar', 'cosmic-background', 'astronaut-badge']
    }
  },
  {
    id: 'ninja-warrior',
    name: 'Ninja Warrior',
    description: 'Master the ancient arts of stealth and agility',
    theme: 'ninja',
    duration: 42, // 6 weeks
    backgroundImage: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1200',
    chapters: [
      {
        id: 'shadow-training',
        name: 'Shadow Training',
        description: 'Learn to move like the wind',
        workoutId: '4',
        storyText: 'In the moonlit dojo, you begin your training in the ancient ninja arts...',
        unlockImage: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ],
    rewards: {
      xp: 800,
      coins: 400,
      skillPoints: 40,
      unlockedContent: ['ninja-outfit', 'stealth-mode', 'shadow-badge']
    }
  }
];