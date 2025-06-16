import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BarChart3, Map, Gamepad2, Brain, Zap, Target } from 'lucide-react';
import { InteractiveCard } from '../common/InteractiveCard';

interface QuickActionsProps {
  onNavigate: (section: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const actions = [
    {
      icon: Map,
      label: 'Epic Quests',
      description: 'Story-driven adventures',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-500/20',
      action: 'quests'
    },
    {
      icon: Gamepad2,
      label: 'Fitness Games',
      description: 'Interactive workouts',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-500/20',
      action: 'games'
    },
    {
      icon: Users,
      label: 'Squad Battles',
      description: 'Team competitions',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/20',
      action: 'social'
    },
    {
      icon: Award,
      label: 'Achievements',
      description: 'Unlock cosmic badges',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/20',
      action: 'achievements'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      description: 'AI-powered insights',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/20',
      action: 'analytics'
    },
    {
      icon: Brain,
      label: 'AI Coach',
      description: 'Personal trainer',
      color: 'from-cyan-500 to-teal-600',
      bgColor: 'bg-cyan-500/20',
      action: 'ai-coach'
    },
    {
      icon: Zap,
      label: 'Challenges',
      description: 'Daily missions',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-500/20',
      action: 'challenges'
    },
    {
      icon: Target,
      label: 'Goals',
      description: 'Track progress',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-500/20',
      action: 'goals'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {actions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InteractiveCard
            onClick={() => onNavigate(action.action)}
            className="p-4 border border-white/20 text-left relative overflow-hidden group"
            hoverScale={1.05}
            glowEffect
          >
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${action.color} mb-3 shadow-lg`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <action.icon className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="font-bold text-white text-lg mb-1">{action.label}</h3>
            <p className="text-white/60 text-sm">{action.description}</p>
          </InteractiveCard>
        </motion.div>
      ))}
    </div>
  );
}