import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageCircle, Zap, Target, TrendingUp } from 'lucide-react';
import { InteractiveCard } from '../common/InteractiveCard';
import { useApp } from '../../contexts/AppContext';

interface AICoachProps {
  isVisible: boolean;
  onClose: () => void;
}

export function AICoach({ isVisible, onClose }: AICoachProps) {
  const { state } = useApp();
  const [messages, setMessages] = useState<Array<{ type: 'ai' | 'user'; content: string; timestamp: Date }>>([]);
  const [currentTip, setCurrentTip] = useState('');

  const aiPersonalities = {
    cheetah: {
      name: 'Velocity',
      personality: 'High-energy, motivational, speed-focused',
      avatar: '🐆',
      color: 'from-orange-500 to-red-500'
    },
    turtle: {
      name: 'Zen',
      personality: 'Calm, steady, mindful',
      avatar: '🐢',
      color: 'from-green-500 to-teal-500'
    },
    eagle: {
      name: 'Precision',
      personality: 'Focused, strategic, goal-oriented',
      avatar: '🦅',
      color: 'from-blue-500 to-cyan-500'
    },
    bear: {
      name: 'Titan',
      personality: 'Strong, powerful, endurance-focused',
      avatar: '🐻',
      color: 'from-purple-500 to-indigo-500'
    }
  };

  const currentCoach = aiPersonalities[state.user?.spiritAnimal || 'cheetah'];

  const generateAIResponse = (userStats: any, workoutHistory: any[]) => {
    const responses = [
      `Great job on your recent workouts! I've analyzed your performance and noticed you're improving your ${state.user?.goals?.[0] || 'fitness'} by 15%.`,
      `Your consistency is impressive! You've maintained a ${userStats.streak}-day streak. Let's push for even higher goals!`,
      `I recommend focusing on your weaker areas. Based on your data, adding more flexibility training could boost your overall performance.`,
      `Your heart rate patterns show you're in the optimal training zone 78% of the time. Excellent work!`,
      `I've detected you perform best on ${['Tuesday', 'Thursday'][Math.floor(Math.random() * 2)]}s. Consider scheduling intense workouts then.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const aiTips = [
    "💡 Pro Tip: Your performance peaks 2 hours after your last meal. Time your workouts accordingly!",
    "🎯 Focus Alert: I notice you're strongest in the morning. Consider scheduling strength training then.",
    "📊 Data Insight: Your heart rate recovery has improved 23% this month. Your cardiovascular fitness is excellent!",
    "🔥 Motivation Boost: You're in the top 15% of users with your consistency. Keep pushing those limits!",
    "⚡ Energy Optimization: Your workout intensity is perfect for your fitness level. Maintain this pace for optimal results."
  ];

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTip(aiTips[Math.floor(Math.random() * aiTips.length)]);
      }, 5000);
      
      // Initial tip
      setCurrentTip(aiTips[0]);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleQuickAction = (action: string) => {
    const responses = {
      'analyze': `Based on your recent performance, you're excelling in endurance but could improve strength training. I recommend adding 2 more strength sessions this week.`,
      'motivate': `You're absolutely crushing it! Your dedication is inspiring. Remember, every rep counts, every step matters. You're building the best version of yourself!`,
      'optimize': `I've optimized your next workout based on your recovery data. Focus on compound movements today - they'll give you maximum results in minimum time.`,
      'predict': `Prediction: If you maintain your current pace, you'll reach your goal 3 weeks ahead of schedule! Your consistency is your superpower.`
    };

    const newMessage = {
      type: 'ai' as const,
      content: responses[action as keyof typeof responses],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-4 right-4 z-50 w-80"
        >
          <InteractiveCard className="p-4 bg-gray-900/95 border-cyan-500/50 backdrop-blur-xl" glowEffect>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-r ${currentCoach.color} rounded-full flex items-center justify-center text-2xl`}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentCoach.avatar}
                </motion.div>
                <div>
                  <h3 className="font-bold text-white">{currentCoach.name}</h3>
                  <p className="text-xs text-gray-400">AI Fitness Coach</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Current Tip */}
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3 mb-4"
            >
              <p className="text-cyan-300 text-sm">{currentTip}</p>
            </motion.div>

            {/* Messages */}
            <div className="max-h-40 overflow-y-auto mb-4 space-y-2">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.type === 'ai' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-2 rounded-lg text-sm ${
                    message.type === 'ai' 
                      ? 'bg-gray-800/50 text-gray-300' 
                      : 'bg-cyan-500/20 text-cyan-300 ml-8'
                  }`}
                >
                  {message.content}
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'analyze', label: 'Analyze', icon: TrendingUp },
                { id: 'motivate', label: 'Motivate', icon: Zap },
                { id: 'optimize', label: 'Optimize', icon: Target },
                { id: 'predict', label: 'Predict', icon: Bot }
              ].map((action) => (
                <motion.button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="flex items-center space-x-1 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors text-xs text-gray-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <action.icon className="w-3 h-3" />
                  <span>{action.label}</span>
                </motion.button>
              ))}
            </div>
          </InteractiveCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}