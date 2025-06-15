import type { Workout, Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    description: 'Classic upper body exercise targeting chest, shoulders, and triceps',
    duration: 30,
    sets: 3,
    reps: 10,
    restTime: 30,
    difficulty: 'medium',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    equipment: ['bodyweight'],
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your core tight throughout the movement'
    ],
    imageUrl: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Squats',
    description: 'Fundamental lower body exercise for legs and glutes',
    duration: 45,
    sets: 3,
    reps: 15,
    restTime: 30,
    difficulty: 'easy',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
    equipment: ['bodyweight'],
    instructions: [
      'Stand with feet hip-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep your chest up and knees behind toes',
      'Return to standing position'
    ],
    imageUrl: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Burpees',
    description: 'Full body high-intensity exercise',
    duration: 60,
    sets: 3,
    reps: 8,
    restTime: 60,
    difficulty: 'hard',
    muscleGroups: ['full body'],
    equipment: ['bodyweight'],
    instructions: [
      'Start standing, then squat down and place hands on floor',
      'Jump feet back into plank position',
      'Do a push-up, then jump feet back to squat',
      'Jump up with arms overhead'
    ],
    imageUrl: 'https://images.pexels.com/photos/4164511/pexels-photo-4164511.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Plank',
    description: 'Core strengthening isometric exercise',
    duration: 60,
    sets: 3,
    restTime: 30,
    difficulty: 'medium',
    muscleGroups: ['core', 'shoulders'],
    equipment: ['bodyweight'],
    instructions: [
      'Start in push-up position',
      'Lower to forearms, keeping body straight',
      'Hold position while breathing normally',
      'Keep core tight and avoid sagging hips'
    ],
    imageUrl: 'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    name: 'Jumping Jacks',
    description: 'Cardio exercise to get heart rate up',
    duration: 30,
    sets: 3,
    restTime: 15,
    difficulty: 'easy',
    muscleGroups: ['full body'],
    equipment: ['bodyweight'],
    instructions: [
      'Start standing with feet together, arms at sides',
      'Jump while spreading legs shoulder-width apart',
      'Simultaneously raise arms overhead',
      'Jump back to starting position'
    ],
    imageUrl: 'https://images.pexels.com/photos/4164752/pexels-photo-4164752.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    name: 'Mountain Climbers',
    description: 'Dynamic core and cardio exercise',
    duration: 30,
    sets: 3,
    restTime: 30,
    difficulty: 'medium',
    muscleGroups: ['core', 'shoulders', 'legs'],
    equipment: ['bodyweight'],
    instructions: [
      'Start in plank position',
      'Alternate bringing knees to chest rapidly',
      'Keep hips level and core engaged',
      'Maintain quick pace while controlling movement'
    ],
    imageUrl: 'https://images.pexels.com/photos/4164516/pexels-photo-4164516.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const workouts: Workout[] = [
  {
    id: '1',
    name: 'Morning Energy Boost',
    description: 'Start your day with this energizing full-body workout',
    duration: 15,
    difficulty: 'easy',
    exercises: [exercises[4], exercises[1], exercises[3]], // Jumping Jacks, Squats, Plank
    targetMuscles: ['full body', 'legs', 'core'],
    equipment: ['bodyweight'],
    calories: 120
  },
  {
    id: '2',
    name: 'Upper Body Strength',
    description: 'Build upper body strength with these targeted exercises',
    duration: 20,
    difficulty: 'medium',
    exercises: [exercises[0], exercises[3], exercises[5]], // Push-ups, Plank, Mountain Climbers
    targetMuscles: ['chest', 'shoulders', 'core'],
    equipment: ['bodyweight'],
    calories: 150
  },
  {
    id: '3',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity workout to torch calories',
    duration: 25,
    difficulty: 'hard',
    exercises: [exercises[2], exercises[4], exercises[5], exercises[1]], // Burpees, Jumping Jacks, Mountain Climbers, Squats
    targetMuscles: ['full body'],
    equipment: ['bodyweight'],
    calories: 200
  },
  {
    id: '4',
    name: 'Core Focus',
    description: 'Strengthen your core with these targeted exercises',
    duration: 12,
    difficulty: 'medium',
    exercises: [exercises[3], exercises[5]], // Plank, Mountain Climbers
    targetMuscles: ['core'],
    equipment: ['bodyweight'],
    calories: 90
  },
  {
    id: '5',
    name: 'Beginner Friendly',
    description: 'Perfect for those just starting their fitness journey',
    duration: 10,
    difficulty: 'easy',
    exercises: [exercises[4], exercises[1]], // Jumping Jacks, Squats
    targetMuscles: ['legs', 'cardio'],
    equipment: ['bodyweight'],
    calories: 80
  }
];

export function getPersonalizedWorkout(fitnessLevel: string, goals: string[]): Workout {
  const availableWorkouts = workouts.filter(workout => {
    if (fitnessLevel === 'beginner') return workout.difficulty === 'easy';
    if (fitnessLevel === 'intermediate') return workout.difficulty !== 'hard';
    return true; // advanced gets all workouts
  });

  // Simple recommendation based on goals
  if (goals.includes('weight_loss')) {
    return availableWorkouts.find(w => w.name.includes('HIIT')) || availableWorkouts[0];
  }
  if (goals.includes('strength')) {
    return availableWorkouts.find(w => w.name.includes('Strength')) || availableWorkouts[0];
  }
  if (goals.includes('endurance')) {
    return availableWorkouts.find(w => w.name.includes('Cardio')) || availableWorkouts[0];
  }

  // Default to first available workout
  return availableWorkouts[0];
}