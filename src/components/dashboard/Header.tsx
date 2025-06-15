import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Settings, Crown, ArrowLeft, Bot } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ProgressBar } from '../common/ProgressBar';
import { InteractiveCard } from '../common/InteractiveCard';
import { HeroAvatar } from '../3d/HeroAvatar';
import { AICoach } from '../ai/AICoach';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBackButton = false, onBack, title }: HeaderProps) {
  const { state } = useApp();
  const { user, userStats } = state;
  const [showAICoach, setShowAICoach] = useState(false);

  const xpToNextLevel = userStats.level * 1000;
  const xpProgress = ((userStats.xp % 1000) / 1000) * 100;

  return (
    <>
      <div className="bg-black/80 backdrop-blur-xl px-4 py-4 relative overflow-hidden border-b border-white/10">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {showBackButton && onBack && (
                <motion.button
                  onClick={onBack}
                  className="p-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </motion.button>
              )}
              
              {/* 3D Hero Avatar */}
              <div className="relative">
                <HeroAvatar 
                  spiritAnimal={user?.spiritAnimal} 
                  level={userStats.level} 
                  isAnimating={true}
                  size="small"
                />
              </div>
              
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl font-medium text-white"
                >
                  {title || `Welcome back, ${user?.name || 'Cyber Warrior'}`}
                </motion.h1>
                <div className="flex items-center space-x-4 text-sm">
                  <InteractiveCard
                    className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-full border-0"
                    hoverScale={1.05}
                    variant="vercel"
                  >
                    <Crown className="w-4 h-4 text-white/80" />
                    <span className="text-white/80 font-medium">Level {userStats.level}</span>
                  </InteractiveCard>
                  
                  <InteractiveCard
                    className="text-white/80 font-medium bg-white/5 px-2 py-1 rounded-full border-0"
                    hoverScale={1.05}
                    variant="vercel"
                  >
                    {userStats.coins} coins
                  </InteractiveCard>
                  
                  <InteractiveCard
                    className="text-white/80 font-medium bg-white/5 px-2 py-1 rounded-full border-0"
                    hoverScale={1.05}
                    variant="vercel"
                  >
                    {userStats.streak} day streak 🔥
                  </InteractiveCard>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <InteractiveCard
                className="p-3 hover:bg-white/5 rounded-full transition-colors backdrop-blur-sm border-0"
                hoverScale={1.1}
                onClick={() => setShowAICoach(!showAICoach)}
                variant="vercel"
              >
                <Bot className="w-5 h-5 text-white/80" />
              </InteractiveCard>

              <InteractiveCard
                className="p-3 hover:bg-white/5 rounded-full transition-colors backdrop-blur-sm border-0"
                hoverScale={1.1}
                variant="vercel"
              >
                <Bell className="w-5 h-5 text-white/80" />
              </InteractiveCard>
              
              <InteractiveCard
                className="p-3 hover:bg-white/5 rounded-full transition-colors backdrop-blur-sm border-0"
                hoverScale={1.1}
                variant="vercel"
              >
                <Settings className="w-5 h-5 text-white/80" />
              </InteractiveCard>
            </div>
          </div>
          
          {/* XP Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/60 mb-2">
              <span className="font-medium">{userStats.xp} XP</span>
              <span className="font-medium">{xpToNextLevel} XP to level {userStats.level + 1}</span>
            </div>
            <ProgressBar
              progress={xpProgress}
              color="cyan"
              animated
              glowEffect
            />
          </div>
        </div>
      </div>

      {/* AI Coach Component */}
      <AICoach isVisible={showAICoach} onClose={() => setShowAICoach(false)} />
    </>
  );
}