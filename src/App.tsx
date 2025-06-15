import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './contexts/AppContext';
import { Welcome } from './components/onboarding/Welcome';
import { UserInfo } from './components/onboarding/UserInfo';
import { FitnessLevel } from './components/onboarding/FitnessLevel';
import { Goals } from './components/onboarding/Goals';
import { AICoachIntro } from './components/onboarding/AICoachIntro';
import { Complete } from './components/onboarding/Complete';
import { Header } from './components/dashboard/Header';
import { WorkoutCarousel } from './components/dashboard/WorkoutCarousel';
import { StatsGrid } from './components/dashboard/StatsGrid';
import { QuickActions } from './components/dashboard/QuickActions';
import { WorkoutSession } from './components/workout/WorkoutSession';
import { AchievementBadge } from './components/achievements/AchievementBadge';
import { achievements } from './data/achievements';
import type { User } from './types';

function OnboardingFlow() {
  const { dispatch } = useApp();
  const [step, setStep] = useState(-1); // Start with Welcome screen
  const [userData, setUserData] = useState<Partial<User>>({});

  const handleUserInfo = (data: { name: string; age: number; email: string }) => {
    setUserData({ ...userData, ...data });
    setStep(1);
  };

  const handleFitnessLevel = (fitnessLevel: 'beginner' | 'intermediate' | 'advanced') => {
    setUserData({ ...userData, fitnessLevel });
    setStep(2);
  };

  const handleGoals = (goals: string[]) => {
    setUserData({ ...userData, goals });
    setStep(3);
  };

  const handleAICoach = (data: { spiritAnimal: string; workoutStyle: string; motivation: string }) => {
    setUserData({ 
      ...userData, 
      spiritAnimal: data.spiritAnimal as any,
      workoutStyle: data.workoutStyle as any,
      motivation: data.motivation as any
    });
    setStep(4);
  };

  const handleComplete = () => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: userData.name!,
      email: userData.email!,
      age: userData.age!,
      fitnessLevel: userData.fitnessLevel!,
      goals: userData.goals!,
      preferences: [],
      spiritAnimal: userData.spiritAnimal,
      workoutStyle: userData.workoutStyle,
      motivation: userData.motivation
    };

    dispatch({ type: 'SET_USER', payload: newUser });
    dispatch({ type: 'UPDATE_STATS', payload: { xp: 100, coins: 50 } });
    dispatch({ type: 'SET_ONBOARDED', payload: true });
  };

  switch (step) {
    case -1:
      return <Welcome onNext={() => setStep(0)} />;
    case 0:
      return <UserInfo onNext={handleUserInfo} onBack={() => setStep(-1)} />;
    case 1:
      return <FitnessLevel onNext={handleFitnessLevel} onBack={() => setStep(0)} />;
    case 2:
      return <Goals onNext={handleGoals} onBack={() => setStep(1)} />;
    case 3:
      return <AICoachIntro onNext={handleAICoach} onBack={() => setStep(2)} />;
    case 4:
      return <Complete onComplete={handleComplete} userName={userData.name!} />;
    default:
      return <Welcome onNext={() => setStep(0)} />;
  }
}

function Dashboard() {
  const [currentSection, setCurrentSection] = useState('home');

  const handleStartWorkout = () => {
    setCurrentSection('workout');
  };

  const handleCompleteWorkout = () => {
    setCurrentSection('home');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'workout':
        return (
          <WorkoutSession
            onBack={() => setCurrentSection('home')}
            onComplete={handleCompleteWorkout}
          />
        );
      case 'achievements':
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <Header />
            <div className="p-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-6"
              >
                🏆 Achievement Gallery
              </motion.h2>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AchievementBadge
                      achievement={achievement}
                      unlocked={Math.random() > 0.7}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'quests':
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <Header />
            <div className="p-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-6"
              >
                🚀 Epic Quests
              </motion.h2>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20">
                <div className="text-6xl mb-4">🌌</div>
                <h3 className="text-2xl font-bold text-white mb-2">Quest System Coming Soon!</h3>
                <p className="text-white/70">Embark on epic adventures through space, become a ninja warrior, and unlock legendary rewards.</p>
              </div>
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <Header />
            <div className="p-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-6"
              >
                ⚔️ Squad Battles
              </motion.h2>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-white mb-2">Squad Battles Coming Soon!</h3>
                <p className="text-white/70">Team up with friends, compete in live challenges, and dominate the leaderboards together.</p>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <Header />
            <div className="p-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-6"
              >
                📊 Mission Analytics
              </motion.h2>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-2xl font-bold text-white mb-2">Advanced Analytics Coming Soon!</h3>
                <p className="text-white/70">Deep insights into your fitness journey with AI-powered recommendations and progress tracking.</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <Header />
            <div className="p-4">
              <WorkoutCarousel onStartWorkout={handleStartWorkout} />
              <StatsGrid />
              <QuickActions onNavigate={setCurrentSection} />
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderSection()}
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  const { state } = useApp();
  
  if (!state.isOnboarded) {
    return <OnboardingFlow />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;