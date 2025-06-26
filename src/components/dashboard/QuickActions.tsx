import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BarChart3, Map, Gamepad2, Brain, Zap, Target, MessageCircle, Trophy, Crown, Flame } from 'lucide-react';
import { InteractiveCard } from '../common/InteractiveCard';
import { useApp } from '../../contexts/AppContext';

interface QuickActionsProps {
  onNavigate: (section: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const { state } = useApp();

  const actions = [
    {
      icon: Map,
      label: 'Epic Quests',
      description: 'Story-driven adventures',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-500/20',
      action: 'quests',
      isNew: true,
      progress: 65
    },
    {
      icon: Gamepad2,
      label: 'Fitness Games',
      description: 'Interactive workouts',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-500/20',
      action: 'games',
      isHot: true,
      progress: 0
    },
    {
      icon: Users,
      label: 'Squad Battles',
      description: 'Team competitions',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/20',
      action: 'social',
      isLive: true,
      progress: 0
    },
    {
      icon: Award,
      label: 'Achievements',
      description: 'Unlock cosmic badges',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/20',
      action: 'achievements',
      progress: 40
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      description: 'AI-powered insights',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/20',
      action: 'analytics',
      progress: 0
    }
  ];

  const handleActionClick = (action: string) => {
    onNavigate(action);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Quick Actions</h2>
        <div className="flex items-center space-x-2 text-white/60">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-light">Power up your journey</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <InteractiveCard
              onClick={() => handleActionClick(action.action)}
              className="p-6 bg-white/[0.02] border-white/[0.05] text-left relative overflow-hidden group cursor-pointer"
              hoverScale={1.05}
              glowEffect
            >
              {/* Status badges */}
              <div className="absolute top-3 right-3 flex space-x-1">
                {action.isNew && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-light">
                    NEW
                  </span>
                )}
                {action.isHot && (
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-light animate-pulse">
                    🔥 HOT
                  </span>
                )}
                {action.isLive && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-light animate-pulse">
                    LIVE
                  </span>
                )}
              </div>

              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <motion.div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-r ${action.color} mb-4 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <action.icon className="w-7 h-7 text-white" />
                </motion.div>
                
                <div className="space-y-2">
                  <h3 className="font-light text-white text-lg">{action.label}</h3>
                  <p className="text-white/60 text-sm font-light">{action.description}</p>
                  
                  {/* Progress bar for applicable actions */}
                  {action.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>Progress</span>
                        <span>{action.progress}%</span>
                      </div>
                      <div className="w-full bg-white/[0.05] rounded-full h-1">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${action.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${action.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </div>

      {/* Daily challenges preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6"
      >
        <InteractiveCard className="p-6 bg-white/[0.02] border-white/[0.05]" glowEffect>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-light text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-cyan-400" />
              Daily Challenges
            </h3>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full font-light">
              2/3 Complete
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-white/80 text-sm font-light">Complete 1 workout</span>
              </div>
              <span className="text-green-400 text-sm font-light">+50 XP</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-white/80 text-sm font-light">Burn 200 calories</span>
              </div>
              <span className="text-green-400 text-sm font-light">+75 XP</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <span className="text-white/60 text-xs">○</span>
                </div>
                <span className="text-white/60 text-sm font-light">Play 1 fitness game</span>
              </div>
              <span className="text-white/60 text-sm font-light">+100 XP</span>
            </div>
          </div>
        </InteractiveCard>
      </motion.div>
    </div>
  );
}