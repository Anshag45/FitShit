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
      color: 'from-white/20 to-white/10'
    },
    {
      icon: Flame,
      label: 'Calories Burned',
      value: '12,450',
      change: '+8%',
      color: 'from-white/20 to-white/10'
    },
    {
      icon: Clock,
      label: 'Total Time',
      value: `${state.userStats.totalTime}m`,
      change: '+15%',
      color: 'from-white/20 to-white/10'
    },
    {
      icon: Zap,
      label: 'Avg Intensity',
      value: '8.2/10',
      change: '+5%',
      color: 'from-white/20 to-white/10'
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
      <div className="space-y-4">
        <h4 className="text-white font-light text-lg">{label}</h4>
        <div className="flex items-end space-x-3 h-40">
          {data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <motion.div
                className="w-full bg-white/20 rounded-t-lg"
                initial={{ height: 0 }}
                animate={{ height: `${(value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              />
              <span className="text-xs text-white/60 mt-2 font-light">{currentData.labels[index]}</span>
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
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <BarChart3 className="w-10 h-10 text-black" />
          </motion.div>
          <h1 className="text-6xl font-light text-white mb-4">Gaming Analytics</h1>
          <p className="text-white/60 font-light text-xl">Deep insights into your fitness gaming journey</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-center space-x-2 mb-12">
          {(['week', 'month', 'year'] as const).map((range) => (
            <motion.button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-8 py-3 rounded-full font-light transition-all ${
                timeRange === range
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <InteractiveCard className="p-6 bg-white/[0.02] border-white/[0.05]" glowEffect>
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-light text-white">{stat.value}</div>
                    <div className="text-sm text-white/60 font-light">{stat.label}</div>
                    <div className="text-xs text-white/40 font-light">{stat.change}</div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <InteractiveCard className="p-8 bg-white/[0.02] border-white/[0.05]" glowEffect>
            {renderChart(currentData.workouts, 'Workouts Completed', 'from-white/20 to-white/10')}
          </InteractiveCard>
          
          <InteractiveCard className="p-8 bg-white/[0.02] border-white/[0.05]" glowEffect>
            {renderChart(currentData.calories, 'Calories Burned', 'from-white/20 to-white/10')}
          </InteractiveCard>
          
          <InteractiveCard className="p-8 bg-white/[0.02] border-white/[0.05]" glowEffect>
            {renderChart(currentData.duration, 'Workout Duration (min)', 'from-white/20 to-white/10')}
          </InteractiveCard>
        </div>

        {/* Achievement Progress */}
        <InteractiveCard className="p-8 mb-12 bg-white/[0.02] border-white/[0.05]" glowEffect>
          <h3 className="text-2xl font-light text-white mb-8 flex items-center">
            <Target className="w-6 h-6 mr-3 text-white/60" />
            Achievement Progress
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-white font-light">{achievement.name}</span>
                  <span className="text-white/60 font-light">{achievement.progress}/{achievement.target}</span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-white/20 transition-all duration-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </InteractiveCard>

        {/* Insights */}
        <InteractiveCard className="p-8 bg-white/[0.02] border-white/[0.05]" glowEffect>
          <h3 className="text-2xl font-light text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-white/60" />
            AI Insights
          </h3>
          <div className="space-y-6">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
              <div className="text-white/80 font-light mb-2">🎯 Great Progress!</div>
              <div className="text-white/60 text-sm font-light">
                You've increased your workout frequency by 15% this month. Keep up the momentum!
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
              <div className="text-white/80 font-light mb-2">💡 Optimization Tip</div>
              <div className="text-white/60 text-sm font-light">
                Your best performance days are Tuesday and Thursday. Consider scheduling intense workouts then.
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
              <div className="text-white/80 font-light mb-2">🚀 Next Goal</div>
              <div className="text-white/60 text-sm font-light">
                You're 3 workouts away from unlocking the "Consistency Master" achievement!
              </div>
            </div>
          </div>
        </InteractiveCard>
      </motion.div>
    </div>
  );
}