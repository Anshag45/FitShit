import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { User, UserStats, Achievement, WorkoutSession, Challenge } from '../types';

interface AppState {
  user: User | null;
  userStats: UserStats;
  achievements: Achievement[];
  workoutSessions: WorkoutSession[];
  challenges: Challenge[];
  isOnboarded: boolean;
  currentWorkout: any;
  currentExerciseIndex: number;
  isWorkoutActive: boolean;
  timerActive: boolean;
  timerSeconds: number;
  currentQuest: string | null;
  questProgress: number;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_STATS'; payload: Partial<UserStats> }
  | { type: 'ADD_ACHIEVEMENT'; payload: Achievement }
  | { type: 'ADD_WORKOUT_SESSION'; payload: WorkoutSession }
  | { type: 'SET_ONBOARDED'; payload: boolean }
  | { type: 'START_WORKOUT'; payload: any }
  | { type: 'END_WORKOUT' }
  | { type: 'NEXT_EXERCISE' }
  | { type: 'START_TIMER'; payload: number }
  | { type: 'STOP_TIMER' }
  | { type: 'TICK_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'START_QUEST'; payload: string }
  | { type: 'UPDATE_QUEST_PROGRESS'; payload: number };

const initialState: AppState = {
  user: null,
  userStats: {
    level: 1,
    xp: 0,
    coins: 0,
    streak: 0,
    totalWorkouts: 0,
    totalTime: 0,
    skillPoints: {
      strength: 0,
      endurance: 0,
      flexibility: 0,
      balance: 0
    },
    unlockedSkills: [],
    questProgress: 0
  },
  achievements: [],
  workoutSessions: [],
  challenges: [],
  isOnboarded: false,
  currentWorkout: null,
  currentExerciseIndex: 0,
  isWorkoutActive: false,
  timerActive: false,
  timerSeconds: 0,
  currentQuest: null,
  questProgress: 0,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_STATS':
      const newStats = { ...state.userStats, ...action.payload };
      // Auto-level up based on XP
      const newLevel = Math.floor(newStats.xp / 1000) + 1;
      if (newLevel > newStats.level) {
        newStats.level = newLevel;
      }
      return { ...state, userStats: newStats };
    case 'ADD_ACHIEVEMENT':
      return { ...state, achievements: [...state.achievements, action.payload] };
    case 'ADD_WORKOUT_SESSION':
      return { ...state, workoutSessions: [...state.workoutSessions, action.payload] };
    case 'SET_ONBOARDED':
      return { ...state, isOnboarded: action.payload };
    case 'START_WORKOUT':
      return { 
        ...state, 
        currentWorkout: action.payload, 
        currentExerciseIndex: 0,
        isWorkoutActive: true 
      };
    case 'END_WORKOUT':
      return { 
        ...state, 
        currentWorkout: null, 
        currentExerciseIndex: 0,
        isWorkoutActive: false,
        timerActive: false,
        timerSeconds: 0
      };
    case 'NEXT_EXERCISE':
      return { 
        ...state, 
        currentExerciseIndex: state.currentExerciseIndex + 1,
        timerActive: false,
        timerSeconds: 0
      };
    case 'START_TIMER':
      return { ...state, timerActive: true, timerSeconds: action.payload };
    case 'STOP_TIMER':
      return { ...state, timerActive: false };
    case 'TICK_TIMER':
      return { ...state, timerSeconds: Math.max(0, state.timerSeconds - 1) };
    case 'RESET_TIMER':
      return { ...state, timerActive: false, timerSeconds: 0 };
    case 'START_QUEST':
      return { ...state, currentQuest: action.payload, questProgress: 0 };
    case 'UPDATE_QUEST_PROGRESS':
      return { ...state, questProgress: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fitquest_user');
    const savedStats = localStorage.getItem('fitquest_stats');
    const savedOnboarded = localStorage.getItem('fitquest_onboarded');

    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }
    if (savedStats) {
      dispatch({ type: 'UPDATE_STATS', payload: JSON.parse(savedStats) });
    }
    if (savedOnboarded) {
      dispatch({ type: 'SET_ONBOARDED', payload: JSON.parse(savedOnboarded) });
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('fitquest_user', JSON.stringify(state.user));
    }
    localStorage.setItem('fitquest_stats', JSON.stringify(state.userStats));
    localStorage.setItem('fitquest_onboarded', JSON.stringify(state.isOnboarded));
  }, [state.user, state.userStats, state.isOnboarded]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.timerActive && state.timerSeconds > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    } else if (state.timerSeconds === 0 && state.timerActive) {
      dispatch({ type: 'STOP_TIMER' });
    }
    return () => clearInterval(interval);
  }, [state.timerActive, state.timerSeconds]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}