import type { Workout, Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Cosmic Push-ups',
    description: 'Channel the power of the stars with these stellar push-ups',
    duration: 30,
    sets: 3,
    reps: 10,
    restTime: 30,
    difficulty: 'medium',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    equipment: ['bodyweight'],
    intensity: 'medium',
    skillType: 'strength',
    instructions: [
      'Position yourself like you\'re launching into space',
      'Lower with the grace of zero gravity',
      'Push up with the force of a rocket engine',
      'Feel the cosmic energy flow through your muscles'
    ],
    imageUrl: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Galactic Squats',
    description: 'Squat like you\'re landing on alien worlds',
    duration: 45,
    sets: 3,
    reps: 15,
    restTime: 30,
    difficulty: 'easy',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
    equipment: ['bodyweight'],
    intensity: 'medium',
    skillType: 'strength',
    instructions: [
      'Stand tall like a space explorer',
      'Descend as if landing on a new planet',
      'Rise up to survey your new world',
      'Feel the power of planetary gravity'
    ],
    imageUrl: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Meteor Burpees',
    description: 'Explosive full-body movement like a meteor impact',
    duration: 60,
    sets: 3,
    reps: 8,
    restTime: 60,
    difficulty: 'hard',
    muscleGroups: ['full body'],
    equipment: ['bodyweight'],
    intensity: 'high',
    skillType: 'endurance',
    instructions: [
      'Begin in orbit position',
      'Crash down like a meteor',
      'Explode back up with cosmic force',
      'Leave a crater of determination'
    ],
    imageUrl: 'https://images.pexels.com/photos/4164511/pexels-photo-4164511.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Stellar Plank',
    description: 'Hold steady like a fixed star in the galaxy',
    duration: 60,
    sets: 3,
    restTime: 30,
    difficulty: 'medium',
    muscleGroups: ['core', 'shoulders'],
    equipment: ['bodyweight'],
    intensity: 'medium',
    skillType: 'balance',
    instructions: [
      'Align yourself with the cosmic plane',
      'Hold steady like a guiding star',
      'Breathe with the rhythm of the universe',
      'Shine with unwavering determination'
    ],
    imageUrl: 'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    name: 'Solar Jumping Jacks',
    description: 'Radiate energy like the sun with these explosive movements',
    duration: 30,
    sets: 3,
    restTime: 15,
    difficulty: 'easy',
    muscleGroups: ['full body'],
    equipment: ['bodyweight'],
    intensity: 'high',
    skillType: 'endurance',
    instructions: [
      'Start in solar core position',
      'Explode outward like solar flares',
      'Return to center with gravitational pull',
      'Radiate energy throughout the galaxy'
    ],
    imageUrl: 'https://images.pexels.com/photos/4164752/pexels-photo-4164752.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    name: 'Nebula Mountain Climbers',
    description: 'Navigate through cosmic dust clouds with agility',
    duration: 30,
    sets: 3,
    restTime: 30,
    difficulty: 'medium',
    muscleGroups: ['core', 'shoulders', 'legs'],
    equipment: ['bodyweight'],
    intensity: 'high',
    skillType: 'endurance',
    instructions: [
      'Position yourself at the nebula\'s edge',
      'Navigate through cosmic debris rapidly',
      'Maintain stellar alignment',
      'Move with the grace of stardust'
    ],
    imageUrl: 'https://images.pexels.com/photos/4164516/pexels-photo-4164516.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const workouts: Workout[] = [
  {
    id: '1',
    name: 'Cosmic Dawn',
    description: 'Begin your day with the energy of a newborn star',
    duration: 15,
    difficulty: 'easy',
    exercises: [exercises[4], exercises[1], exercises[3]],
    targetMuscles: ['full body', 'legs', 'core'],
    equipment: ['bodyweight'],
    calories: 120,
    intensity: 'medium',
    theme: 'space',
    thumbnailUrl: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800',
    backgroundGradient: ['#667eea', '#764ba2', '#f093fb']
  },
  {
    id: '2',
    name: 'Stellar Strength',
    description: 'Forge your body in the heart of a supernova',
    duration: 20,
    difficulty: 'medium',
    exercises: [exercises[0], exercises[3], exercises[5]],
    targetMuscles: ['chest', 'shoulders', 'core'],
    equipment: ['bodyweight'],
    calories: 150,
    intensity: 'medium',
    theme: 'space',
    thumbnailUrl: 'https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg?auto=compress&cs=tinysrgb&w=800',
    backgroundGradient: ['#ff6b6b', '#ee5a24', '#ff9ff3']
  },
  {
    id: '3',
    name: 'Galactic Inferno',
    description: 'Burn calories like a blazing quasar',
    duration: 25,
    difficulty: 'hard',
    exercises: [exercises[2], exercises[4], exercises[5], exercises[1]],
    targetMuscles: ['full body'],
    equipment: ['bodyweight'],
    calories: 200,
    intensity: 'high',
    theme: 'space',
    thumbnailUrl: 'https://images.pexels.com/photos/87009/earth-soil-creep-moon-87009.jpeg?auto=compress&cs=tinysrgb&w=800',
    backgroundGradient: ['#ff4757', '#ff3838', '#ff6348']
  },
  {
    id: '4',
    name: 'Zen Nebula',
    description: 'Find balance in the cosmic void',
    duration: 12,
    difficulty: 'medium',
    exercises: [exercises[3], exercises[5]],
    targetMuscles: ['core'],
    equipment: ['bodyweight'],
    calories: 90,
    intensity: 'low',
    theme: 'space',
    thumbnailUrl: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=800',
    backgroundGradient: ['#667eea', '#764ba2', '#a8edea']
  },
  {
    id: '5',
    name: 'Rookie Astronaut',
    description: 'Perfect for new space cadets beginning their journey',
    duration: 10,
    difficulty: 'easy',
    exercises: [exercises[4], exercises[1]],
    targetMuscles: ['legs', 'cardio'],
    equipment: ['bodyweight'],
    calories: 80,
    intensity: 'low',
    theme: 'space',
    thumbnailUrl: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800',
    backgroundGradient: ['#a8edea', '#fed6e3', '#d299c2']
  }
];

export function getPersonalizedWorkout(fitnessLevel: string, goals: string[], spiritAnimal?: string): Workout {
  let availableWorkouts = workouts.filter(workout => {
    if (fitnessLevel === 'beginner') return workout.difficulty === 'easy';
    if (fitnessLevel === 'intermediate') return workout.difficulty !== 'hard';
    return true;
  });

  // Personalize based on spirit animal
  if (spiritAnimal === 'cheetah') {
    availableWorkouts = availableWorkouts.filter(w => w.intensity === 'high');
  } else if (spiritAnimal === 'turtle') {
    availableWorkouts = availableWorkouts.filter(w => w.intensity === 'low');
  }

  if (goals.includes('weight_loss')) {
    return availableWorkouts.find(w => w.name.includes('Inferno')) || availableWorkouts[0];
  }
  if (goals.includes('strength')) {
    return availableWorkouts.find(w => w.name.includes('Strength')) || availableWorkouts[0];
  }
  if (goals.includes('flexibility')) {
    return availableWorkouts.find(w => w.name.includes('Zen')) || availableWorkouts[0];
  }

  return availableWorkouts[0];
}