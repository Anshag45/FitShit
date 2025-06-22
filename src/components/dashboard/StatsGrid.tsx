import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Clock, Target, Star, Zap, Crown, TrendingUp } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { InteractiveCard } from '../common/InteractiveCard';

export function StatsGrid() {
  const { state } = useApp();
  const { userStats } = state;

  const stats = [
    {
      icon: Trophy,
      label: 'Missions',
      value: userStats.totalWorkouts,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-500/20',
      change: '+12%',
      description: 'Completed workouts'
    },
    {
      icon: Flame,
      label: 'Streak',
      value: userStats.streak,
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-500/20',
      change: '+3 days',
      description: 'Current streak'
    },
    {
      icon: Clock,
      label: 'Time',
      value: `${userStats.totalTime}m`,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-500/20',
      change: '+45m',
      description: 'Total training time'
    },
    {
      icon: Crown,
      label: 'Level',
      value: userStats.level,
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-purple-500/20',
      change: `${userStats.xp}/1000 XP`,
      description: 'Current level'
    },
    {
      icon: Star,
      label: 'XP',
      value: userStats.xp.toLocaleString(),
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-500/20',
      change: '+250 XP',
      description: 'Experience points'
    },
    {
      icon: Zap,
      label: 'Coins',
      value: userStats.coins,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-500/20',
      change: '+50 coins',
      description: 'Gaming currency'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Your Stats</h2>
        <div className="flex items-center space-x-2 text-white/60">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-light">All time high!</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <InteractiveCard
              className="p-6 bg-white/[0.02] border-white/[0.05] relative overflow-hidden group"
              hoverScale={1.05}
              glowEffect
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${stat.color} shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className="text-right">
                    <div className="text-xs text-white/60 font-light">{stat.label}</div>
                    <div className="text-xs text-green-400 font-light">{stat.change}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <motion.div
                    className="text-3xl font-light text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-white/60 font-light">{stat.description}</div>
                </div>

                {/* Progress indicator for XP */}
                {stat.label === 'Level' && (
                  <div className="mt-4">
                    <div className="w-full bg-white/[0.05] rounded-full h-1">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(userStats.xp % 1000) / 10}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </div>

      {/* Quick achievements preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6"
      >
        <InteractiveCard className="p-4 bg-white/[0.02] border-white/[0.05]" glowEffect>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-light">Next Achievement</div>
                <div className="text-white/60 text-sm font-light">Complete 10 workouts</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-light">{userStats.totalWorkouts}/10</div>
              <div className="w-20 bg-white/[0.05] rounded-full h-1 mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(userStats.totalWorkouts / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </InteractiveCard>
      </motion.div>
    </div>
  );
}