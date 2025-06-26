import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Settings, Crown, ArrowLeft, Bot, Activity } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ProgressBar } from '../common/ProgressBar';
import { InteractiveCard } from '../common/InteractiveCard';
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
      <div className="bg-black/90 backdrop-blur-xl px-4 py-4 relative overflow-hidden border-b border-white/[0.05]">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {showBackButton && onBack && (
                <motion.button
                  onClick={onBack}
                  className="p-2 bg-white/[0.02] backdrop-blur-sm rounded-full border border-white/[0.05] hover:bg-white/[0.05] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </motion.button>
              )}
              
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl font-light text-white"
                >
                  {title || `Welcome back, ${user?.name || 'Cyber Warrior'}`}
                </motion.h1>
                <div className="flex items-center space-x-4 text-sm">
                  <InteractiveCard
                    className="flex items-center space-x-1 bg-white/[0.02] px-3 py-1 rounded-full border-0"
                    hoverScale={1.05}
                    variant="vercel"
                  >
                    <Crown className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 font-light">Level {userStats.level}</span>
                  </InteractiveCard>
                  
                  <InteractiveCard
                    className="text-white/60 font-light bg-white/[0.02] px-3 py-1 rounded-full border-0"
                    hoverScale={1.05}
                    variant="vercel"
                  >
                    {userStats.coins} coins
                  </InteractiveCard>
                  
                  <InteractiveCard
                    className="text-white/60 font-light bg-white/[0.02] px-3 py-1 rounded-full border-0"
                    hoverScale={1.05}
                    variant="vercel"
                  >
                    {userStats.streak} day streak
                  </InteractiveCard>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <InteractiveCard
                className="p-3 hover:bg-white/[0.02] rounded-full transition-colors backdrop-blur-sm border-0 relative"
                hoverScale={1.1}
                onClick={() => setShowAICoach(!showAICoach)}
                variant="vercel"
              >
                <Bot className="w-5 h-5 text-white/60" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </InteractiveCard>

              <InteractiveCard
                className="p-3 hover:bg-white/[0.02] rounded-full transition-colors backdrop-blur-sm border-0"
                hoverScale={1.1}
                variant="vercel"
              >
                <Bell className="w-5 h-5 text-white/60" />
              </InteractiveCard>
              
              <InteractiveCard
                className="p-3 hover:bg-white/[0.02] rounded-full transition-colors backdrop-blur-sm border-0"
                hoverScale={1.1}
                variant="vercel"
              >
                <Settings className="w-5 h-5 text-white/60" />
              </InteractiveCard>
            </div>
          </div>
          
          {/* XP Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/40 mb-2">
              <span className="font-light">{userStats.xp} XP</span>
              <span className="font-light">{xpToNextLevel} XP to level {userStats.level + 1}</span>
            </div>
            <div className="w-full bg-white/[0.05] rounded-full h-1 overflow-hidden">
              <motion.div
                className="h-full bg-white/20 transition-all duration-500"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      <AICoach isVisible={showAICoach} onClose={() => setShowAICoach(false)} />
    </>
  );
}