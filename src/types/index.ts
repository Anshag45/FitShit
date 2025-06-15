export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferences: string[];
  avatar?: string;
  spiritAnimal?: 'cheetah' | 'turtle' | 'eagle' | 'bear';
  workoutStyle?: 'intense' | 'balanced' | 'zen';
  motivation?: 'competition' | 'personal' | 'social';
}

export interface UserStats {
  level: number;
  xp: number;
  coins: number;
  streak: number;
  totalWorkouts: number;
  totalTime: number;
  lastWorkoutDate?: string;
  skillPoints: {
    strength: number;
    endurance: number;
    flexibility: number;
    balance: number;
  };
  unlockedSkills: string[];
  currentQuest?: string;
  questProgress: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number;
  sets?: number;
  reps?: number;
  restTime?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  muscleGroups: string[];
  equipment: string[];
  instructions: string[];
  imageUrl?: string;
  videoUrl?: string;
  intensity: 'low' | 'medium' | 'high';
  skillType: 'strength' | 'endurance' | 'flexibility' | 'balance';
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  exercises: Exercise[];
  targetMuscles: string[];
  equipment: string[];
  calories: number;
  intensity: 'low' | 'medium' | 'high';
  theme?: string;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  backgroundGradient: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'streak' | 'workouts' | 'time' | 'level' | 'special' | 'skill';
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  skillPoints?: number;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  theme: string;
  duration: number; // in days
  chapters: QuestChapter[];
  rewards: {
    xp: number;
    coins: number;
    skillPoints: number;
    unlockedContent: string[];
  };
  backgroundImage: string;
}

export interface QuestChapter {
  id: string;
  name: string;
  description: string;
  workoutId: string;
  storyText: string;
  unlockImage: string;
}

export interface Squad {
  id: string;
  name: string;
  members: SquadMember[];
  totalCaloriesBurned: number;
  currentChallenge?: string;
  rank: number;
}

export interface SquadMember {
  userId: string;
  name: string;
  avatar: string;
  level: number;
  caloriesContributed: number;
  isOnline: boolean;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'squad' | 'global';
  requirement: number;
  reward: {
    xp: number;
    coins: number;
    skillPoints?: number;
  };
  participants: number;
  timeLeft: number;
  progress: number;
  isLive?: boolean;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  date: string;
  duration: number;
  completed: boolean;
  exercises: {
    exerciseId: string;
    completed: boolean;
    duration: number;
    perfectForm?: boolean;
  }[];
  xpEarned: number;
  coinsEarned: number;
  skillPointsEarned: {
    strength: number;
    endurance: number;
    flexibility: number;
    balance: number;
  };
}

export interface AICoach {
  name: string;
  personality: 'motivational' | 'zen' | 'competitive' | 'supportive';
  avatar: string;
  level: number;
  specialties: string[];
}