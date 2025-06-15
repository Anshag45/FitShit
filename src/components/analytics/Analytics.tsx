import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, Target, Flame, Clock, Trophy, Zap } from 'lucide-react';
import { InteractiveCard } from '../common/InteractiveCard';
import { ProgressBar } from '../common/ProgressBar';
import { useApp } from '../../contexts/AppContext';

export function Analytics() {
  const { state } = useApp();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const mockData = {
    week: {
      workouts: [3, 5, 2, 4, 6, 3, 4],
      calories: [320, 450, 280, 380, 520, 340, 410],
      duration: [25, 35, 20, 30, 45, 25, 35],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    month: {
      workouts: [15, 18, 22, 20],
      calories: [2100, 2400, 2800, 2600],
      duration: [180, 210, 240, 220],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    year: {
      workouts: [180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345],
      calories: [25200, 27300, 29400, 31500, 33600, 35700, 37800, 39900, 42000, 44100, 46200, 48300],
      duration: [2160, 2340, 2520, 2700, 2880, 3060, 3240, 3420, 3600, 3780, 3960, 4140],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  const currentData = mockData[timeRange];

  const stats = [
    {
      icon: Trophy,
      label: 'Total Workouts',
      value: state.userStats.totalWorkouts,
      change: '+12%',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Flame,
      label: 'Calories Burned',
      value: '12,450',
      change: '+8%',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: Clock,
      label: 'Total Time',
      value: `${state.userStats.totalTime}m`,
      change: '+15%',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Zap,
      label: 'Avg Intensity',
      value: '8.2/10',
      change: '+5%',
      color: 'from-purple-400 to-indigo-500'
    }
  ];

  const achievements = [
    { name: 'Consistency Master', progress: 85, target: 100 },
    { name: 'Calorie Crusher', progress: 92, target: 100 },
    { name: 'Time Warrior', progress: 78, target: 100 },
    { name: 'Streak Legend', progress: 65, target: 100 }
  ];

  const renderChart = (data: number[], label: string, color: string) => {
    const maxValue = Math.max(...data);
    
    return (
      <div className="space-y-2">
        <h4 className="text-white font-medium text-sm">{label}</h4>
        <div className="flex items-end space-x-2 h-32">
          {data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <motion.div
                className={`w-full bg-gradient-to-t ${color} rounded-t-lg`}
                initial={{ height: 0 }}
                animate={{ height: `${(value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              />
              <span className="text-xs text-gray-400 mt-1">{currentData.labels[index]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <BarChart3 className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Gaming Analytics</h1>
          <p className="text-gray-300">Deep insights into your fitness gaming journey</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-center space-x-2 mb-8">
          {(['week', 'month', 'year'] as const).map((range) => (
            <motion.button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <InteractiveCard className="p-4 bg-gray-800/30 border-gray-600/30" glowEffect>
                <div className="flex items-center space-x-3">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${stat.color}`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="text-xs text-green-400">{stat.change}</div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <InteractiveCard className="p-6 bg-gray-800/30 border-gray-600/30" glowEffect>
            {renderChart(currentData.workouts, 'Workouts Completed', 'from-cyan-500 to-purple-500')}
          </InteractiveCard>
          
          <InteractiveCard className="p-6 bg-gray-800/30 border-gray-600/30" glowEffect>
            {renderChart(currentData.calories, 'Calories Burned', 'from-red-500 to-orange-500')}
          </InteractiveCard>
          
          <InteractiveCard className="p-6 bg-gray-800/30 border-gray-600/30" glowEffect>
            {renderChart(currentData.duration, 'Workout Duration (min)', 'from-blue-500 to-cyan-500')}
          </InteractiveCard>
        </div>

        {/* Achievement Progress */}
        <InteractiveCard className="p-6 mb-8 bg-gray-800/30 border-gray-600/30" glowEffect>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Target className="w-6 h-6 mr-2 text-cyan-400" />
            Achievement Progress
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-white font-medium">{achievement.name}</span>
                  <span className="text-gray-400">{achievement.progress}/{achievement.target}</span>
                </div>
                <ProgressBar
                  progress={achievement.progress}
                  color="cosmic"
                  animated
                  glowEffect
                />
              </motion.div>
            ))}
          </div>
        </InteractiveCard>

        {/* Insights */}
        <InteractiveCard className="p-6 bg-gray-800/30 border-gray-600/30" glowEffect>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
            AI Insights
          </h3>
          <div className="space-y-4">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <div className="text-green-400 font-bold mb-1">🎯 Great Progress!</div>
              <div className="text-gray-300 text-sm">
                You've increased your workout frequency by 15% this month. Keep up the momentum!
              </div>
            </div>
            <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-4">
              <div className="text-cyan-400 font-bold mb-1">💡 Optimization Tip</div>
              <div className="text-gray-300 text-sm">
                Your best performance days are Tuesday and Thursday. Consider scheduling intense workouts then.
              </div>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
              <div className="text-purple-400 font-bold mb-1">🚀 Next Goal</div>
              <div className="text-gray-300 text-sm">
                You're 3 workouts away from unlocking the "Consistency Master" achievement!
              </div>
            </div>
          </div>
        </InteractiveCard>
      </motion.div>
    </div>
  );
}