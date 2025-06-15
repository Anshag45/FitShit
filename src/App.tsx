import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './contexts/AppContext';
import { Welcome } from './components/onboarding/Welcome';
import { UserInfo } from './components/onboarding/UserInfo';
import { WeightInfo } from './components/onboarding/WeightInfo';
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
import { QuestSystem } from './components/quests/QuestSystem';
import { SquadBattles } from './components/social/SquadBattles';
import { Analytics } from './components/analytics/Analytics';
import { FitnessGames } from './components/games/FitnessGames';
import { ColorShiftBackground } from './components/common/ColorShiftBackground';
import { LiquidGlass } from './components/common/LiquidGlass';
import { achievements } from './data/achievements';
import type { User } from './types';

function OnboardingFlow() {
  const { dispatch } = useApp();
  const [step, setStep] = useState(-1); // Start with Welcome screen
  const [userData, setUserData] = useState<Partial<User>>({});

  const handleUserInfo = (data: { name: string; age: number; email: string; rememberMe: boolean }) => {
    setUserData({ ...userData, name: data.name, age: data.age, email: data.email });
    
    // Store remember me preference
    if (data.rememberMe) {
      localStorage.setItem('fitquest_remember_user', JSON.stringify({
        name: data.name,
        email: data.email,
        age: data.age
      }));
    }
    
    setStep(1);
  };

  const handleWeightInfo = (data: { currentWeight: number; targetWeight: number; weightGoal: 'lose' | 'gain' | 'maintain' }) => {
    setUserData({ ...userData, ...data });
    setStep(2);
  };

  const handleFitnessLevel = (fitnessLevel: 'beginner' | 'intermediate' | 'advanced') => {
    setUserData({ ...userData, fitnessLevel });
    setStep(3);
  };

  const handleGoals = (goals: string[]) => {
    setUserData({ ...userData, goals });
    setStep(4);
  };

  const handleAICoach = (data: { spiritAnimal: string; workoutStyle: string; motivation: string }) => {
    setUserData({ 
      ...userData, 
      spiritAnimal: data.spiritAnimal as any,
      workoutStyle: data.workoutStyle as any,
      motivation: data.motivation as any
    });
    setStep(5);
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
      motivation: userData.motivation,
      currentWeight: userData.currentWeight,
      targetWeight: userData.targetWeight,
      weightGoal: userData.weightGoal
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
      return <WeightInfo onNext={handleWeightInfo} onBack={() => setStep(0)} />;
    case 2:
      return <FitnessLevel onNext={handleFitnessLevel} onBack={() => setStep(1)} />;
    case 3:
      return <Goals onNext={handleGoals} onBack={() => setStep(2)} />;
    case 4:
      return <AICoachIntro onNext={handleAICoach} onBack={() => setStep(3)} />;
    case 5:
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
          <ColorShiftBackground variant="cyberpunk" intensity="medium">
            <Header 
              showBackButton 
              onBack={() => setCurrentSection('home')} 
              title="🏆 Achievement Gallery"
            />
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <LiquidGlass intensity="medium" colorShift animated>
                      <AchievementBadge
                        achievement={achievement}
                        unlocked={Math.random() > 0.7}
                      />
                    </LiquidGlass>
                  </motion.div>
                ))}
              </div>
            </div>
          </ColorShiftBackground>
        );
      case 'quests':
        return (
          <ColorShiftBackground variant="neon" intensity="medium">
            <Header 
              showBackButton 
              onBack={() => setCurrentSection('home')} 
              title="🚀 Epic Quests"
            />
            <QuestSystem />
          </ColorShiftBackground>
        );
      case 'social':
        return (
          <ColorShiftBackground variant="cyberpunk" intensity="medium">
            <Header 
              showBackButton 
              onBack={() => setCurrentSection('home')} 
              title="⚔️ Squad Battles"
            />
            <SquadBattles />
          </ColorShiftBackground>
        );
      case 'analytics':
        return (
          <ColorShiftBackground variant="neon" intensity="medium">
            <Header 
              showBackButton 
              onBack={() => setCurrentSection('home')} 
              title="📊 Mission Analytics"
            />
            <Analytics />
          </ColorShiftBackground>
        );
      case 'games':
        return (
          <ColorShiftBackground variant="cyberpunk" intensity="intense">
            <Header 
              showBackButton 
              onBack={() => setCurrentSection('home')} 
              title="🎮 Fitness Games"
            />
            <FitnessGames />
          </ColorShiftBackground>
        );
      default:
        return (
          <ColorShiftBackground variant="cyberpunk" intensity="subtle">
            <Header />
            <div className="p-4">
              <LiquidGlass intensity="medium" colorShift animated className="mb-6">
                <WorkoutCarousel onStartWorkout={handleStartWorkout} />
              </LiquidGlass>
              <LiquidGlass intensity="light" className="mb-6">
                <StatsGrid />
              </LiquidGlass>
              <LiquidGlass intensity="medium" animated>
                <QuickActions onNavigate={setCurrentSection} />
              </LiquidGlass>
            </div>
          </ColorShiftBackground>
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