import React from 'react';
import { Users, Award, BarChart3, Store } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (section: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const actions = [
    {
      icon: Users,
      label: 'Challenges',
      description: 'Join social challenges',
      color: 'text-green-600 bg-green-100',
      action: 'social'
    },
    {
      icon: Award,
      label: 'Achievements',
      description: 'View your badges',
      color: 'text-purple-600 bg-purple-100',
      action: 'achievements'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      description: 'Track your progress',
      color: 'text-blue-600 bg-blue-100',
      action: 'analytics'
    },
    {
      icon: Store,
      label: 'Store',
      description: 'Spend your coins',
      color: 'text-orange-600 bg-orange-100',
      action: 'store'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onNavigate(action.action)}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.color} mb-3`}>
            <action.icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">{action.label}</h3>
          <p className="text-sm text-gray-600">{action.description}</p>
        </button>
      ))}
    </div>
  );
}