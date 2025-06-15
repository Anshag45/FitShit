export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferences: string[];
  avatar?: string;
}

export interface UserStats {
  level: number;
  xp: number;
  coins: number;
  streak: number;
  totalWorkouts: number;
  totalTime: number; // in minutes
  lastWorkoutDate?: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  sets?: number;
  reps?: number;
  restTime?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  muscleGroups: string[];
  equipment: string[];
  instructions: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number; // estimated total duration in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  exercises: Exercise[];
  targetMuscles: string[];
  equipment: string[];
  calories: number; // estimated calories burned
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'streak' | 'workouts' | 'time' | 'level' | 'special';
  unlockedAt?: string;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  requirement: number;
  reward: {
    xp: number;
    coins: number;
  };
  participants: number;
  timeLeft: number; // in hours
  progress: number;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  date: string;
  duration: number; // actual duration in minutes
  completed: boolean;
  exercises: {
    exerciseId: string;
    completed: boolean;
    duration: number;
  }[];
  xpEarned: number;
  coinsEarned: number;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar?: string;
  score: number;
  rank: number;
  streak: number;
  level: number;
}