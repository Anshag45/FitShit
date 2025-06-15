import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Clock, Target } from 'lucide-react';
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
      bgColor: 'bg-yellow-500/20'
    },
    {
      icon: Flame,
      label: 'Streak',
      value: userStats.streak,
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-500/20'
    },
    {
      icon: Clock,
      label: 'Time',
      value: `${userStats.totalTime}m`,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: Target,
      label: 'Level',
      value: userStats.level,
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-purple-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InteractiveCard
            className="p-4 border border-white/20 relative overflow-hidden"
            hoverScale={1.05}
            glowEffect
          >
            <div className="flex items-center space-x-3 relative z-10">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${stat.color} shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <motion.div
                  className="text-2xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-white/70 font-medium">{stat.label}</div>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>
      ))}
    </div>
  );
}