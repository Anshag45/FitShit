import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Welcome } from './components/onboarding/Welcome';
import { UserInfo } from './components/onboarding/UserInfo';
import { FitnessLevel } from './components/onboarding/FitnessLevel';
import { Goals } from './components/onboarding/Goals';
import { Complete } from './components/onboarding/Complete';
import { Header } from './components/dashboard/Header';
import { DailyWorkout } from './components/dashboard/DailyWorkout';
import { StatsGrid } from './components/dashboard/StatsGrid';
import { QuickActions } from './components/dashboard/QuickActions';
import { WorkoutSession } from './components/workout/WorkoutSession';
import { AchievementBadge } from './components/achievements/AchievementBadge';
import { achievements } from './data/achievements';
import type { User } from './types';

function OnboardingFlow() {
  const { dispatch } = useApp();
  const [step, setStep] = useState(0);
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

  const handleComplete = () => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: userData.name!,
      email: userData.email!,
      age: userData.age!,
      fitnessLevel: userData.fitnessLevel!,
      goals: userData.goals!,
      preferences: []
    };

    dispatch({ type: 'SET_USER', payload: newUser });
    dispatch({ type: 'UPDATE_STATS', payload: { xp: 100, coins: 50 } });
    dispatch({ type: 'SET_ONBOARDED', payload: true });
  };

  switch (step) {
    case 0:
      return <UserInfo onNext={handleUserInfo} onBack={() => setStep(-1)} />;
    case 1:
      return <FitnessLevel onNext={handleFitnessLevel} onBack={() => setStep(0)} />;
    case 2:
      return <Goals onNext={handleGoals} onBack={() => setStep(1)} />;
    case 3:
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
          <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Achievements</h2>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={Math.random() > 0.7} // Simulate some unlocked achievements
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Social Challenges</h2>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon!</h3>
                <p className="text-gray-600">Social features and challenges are coming in the next update.</p>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h2>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600">Detailed analytics and progress tracking coming soon!</p>
              </div>
            </div>
          </div>
        );
      case 'store':
        return (
          <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Reward Store</h2>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">🏪</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Store Coming Soon!</h3>
                <p className="text-gray-600">Spend your coins on rewards and upgrades in the next update.</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="p-4">
              <DailyWorkout onStartWorkout={handleStartWorkout} />
              <StatsGrid />
              <QuickActions onNavigate={setCurrentSection} />
            </div>
          </div>
        );
    }
  };

  return renderSection();
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