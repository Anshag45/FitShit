import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Settings, Crown, ArrowLeft } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ProgressBar } from '../common/ProgressBar';
import { InteractiveCard } from '../common/InteractiveCard';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBackButton = false, onBack, title }: HeaderProps) {
  const { state } = useApp();
  const { user, userStats } = state;

  const xpToNextLevel = userStats.level * 1000;
  const xpProgress = ((userStats.xp % 1000) / 1000) * 100;

  return (
    <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-black px-4 py-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl"
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
                className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-cyan-500/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 text-cyan-400" />
              </motion.button>
            )}
            
            <InteractiveCard
              className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full shadow-lg border-0"
              hoverScale={1.1}
              glowEffect
            >
              <User className="w-7 h-7 text-white" />
            </InteractiveCard>
            
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-white"
              >
                {title || `Welcome back, ${user?.name || 'Gamer'}! 🎮`}
              </motion.h1>
              <div className="flex items-center space-x-4 text-sm">
                <InteractiveCard
                  className="flex items-center space-x-1 bg-purple-600/30 px-2 py-1 rounded-full border-0"
                  hoverScale={1.05}
                >
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">Level {userStats.level}</span>
                </InteractiveCard>
                
                <InteractiveCard
                  className="text-green-400 font-bold bg-green-500/20 px-2 py-1 rounded-full border-0"
                  hoverScale={1.05}
                >
                  {userStats.coins} coins
                </InteractiveCard>
                
                <InteractiveCard
                  className="text-orange-400 font-bold bg-orange-500/20 px-2 py-1 rounded-full border-0"
                  hoverScale={1.05}
                >
                  {userStats.streak} day streak 🔥
                </InteractiveCard>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <InteractiveCard
              className="p-3 hover:bg-gray-800/50 rounded-full transition-colors backdrop-blur-sm border-0"
              hoverScale={1.1}
            >
              <Bell className="w-5 h-5 text-cyan-400" />
            </InteractiveCard>
            
            <InteractiveCard
              className="p-3 hover:bg-gray-800/50 rounded-full transition-colors backdrop-blur-sm border-0"
              hoverScale={1.1}
            >
              <Settings className="w-5 h-5 text-cyan-400" />
            </InteractiveCard>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span className="font-medium">{userStats.xp} XP</span>
            <span className="font-medium">{xpToNextLevel} XP to level {userStats.level + 1}</span>
          </div>
          <ProgressBar
            progress={xpProgress}
            color="cosmic"
            animated
            glowEffect
          />
        </div>
      </div>
    </div>
  );
}