import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BarChart3, Store, Sword, Map } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (section: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const actions = [
    {
      icon: Map,
      label: 'Quests',
      description: 'Epic story adventures',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-500/20',
      action: 'quests'
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
      icon: Users,
      label: 'Squad Battles',
      description: 'Team up with friends',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/20',
      action: 'social'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      description: 'Track your progress',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/20',
      action: 'analytics'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action, index) => (
        <motion.button
          key={index}
          onClick={() => onNavigate(action.action)}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-left relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${action.color} mb-3 shadow-lg`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <action.icon className="w-6 h-6 text-white" />
          </motion.div>
          <h3 className="font-bold text-white text-lg mb-1">{action.label}</h3>
          <p className="text-white/60 text-sm">{action.description}</p>
          
          {/* Hover effect */}
          <motion.div
            className={`absolute inset-0 ${action.bgColor} rounded-2xl opacity-0 group-hover:opacity-100`}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      ))}
    </div>
  );
}