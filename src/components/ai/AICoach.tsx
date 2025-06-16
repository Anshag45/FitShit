import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageCircle, Zap, Target, TrendingUp, Heart, Brain, Camera, Mic } from 'lucide-react';
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
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [coachMode, setCoachMode] = useState<'chat' | 'analysis' | 'motivation'>('chat');

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

  const aiTips = [
    "💡 AI Analysis: Your heart rate recovery has improved 23% this month. Your cardiovascular fitness is excellent!",
    "🎯 Smart Insight: I notice you're strongest in the morning. Consider scheduling strength training then.",
    "📊 Performance Data: Your workout intensity is perfect for your fitness level. Maintain this pace for optimal results.",
    "🔥 Motivation Boost: You're in the top 15% of users with your consistency. Keep pushing those limits!",
    "⚡ Energy Optimization: Your performance peaks 2 hours after your last meal. Time your workouts accordingly!",
    "🧠 Neural Pattern: Your focus improves 40% during evening workouts. Consider meditation sessions then.",
    "💪 Muscle Memory: Your form has improved significantly. I can see the neural pathways strengthening!"
  ];

  const smartResponses = [
    "Based on your biometric data, I recommend increasing your protein intake by 15g post-workout for optimal recovery.",
    "Your sleep patterns show you're getting quality REM sleep. This is boosting your workout performance by 18%!",
    "I've analyzed your movement patterns - your left side is 8% weaker. Let's add some unilateral exercises.",
    "Your stress levels are elevated today. I suggest a yoga session instead of high-intensity training.",
    "Perfect! Your consistency is triggering positive neuroplasticity. Your brain is literally rewiring for fitness success!",
    "I've detected micro-improvements in your balance. Your proprioception is enhancing - keep up the stability work!",
    "Your workout timing aligns perfectly with your circadian rhythm. This is why you're seeing such great results!"
  ];

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTip(aiTips[Math.floor(Math.random() * aiTips.length)]);
      }, 8000);
      
      setCurrentTip(aiTips[0]);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage = {
      type: 'user' as const,
      content: userInput,
      timestamp: new Date()
    };

    const aiResponse = {
      type: 'ai' as const,
      content: smartResponses[Math.floor(Math.random() * smartResponses.length)],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setUserInput('');
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setUserInput("How can I improve my squat form?");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleQuickAction = (action: string) => {
    const responses = {
      'analyze': `🧠 AI Analysis Complete: Your performance metrics show 15% improvement in strength, 22% in endurance. Your neural adaptation is accelerating!`,
      'motivate': `🔥 LEGENDARY STATUS ACTIVATED! You're not just working out - you're evolving! Every rep is rewriting your DNA for greatness!`,
      'optimize': `⚡ Optimization Protocol: Based on your biometrics, I've adjusted your next workout. Focus on compound movements with 85% intensity.`,
      'predict': `🔮 AI Prediction: If you maintain current trajectory, you'll achieve your goal 3.2 weeks early. Your consistency is your superpower!`,
      'form': `📹 Form Analysis: I've detected slight knee valgus in your squats. Activate your glutes more and focus on external rotation.`,
      'recovery': `💤 Recovery Optimization: Your HRV suggests you need 7.5 hours sleep tonight. I'll adjust tomorrow's intensity accordingly.`
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
          className="fixed bottom-4 right-4 z-50 w-96"
        >
          <InteractiveCard className="p-6 bg-gray-900/95 border-cyan-500/50 backdrop-blur-xl" glowEffect>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <motion.div
                  className={`w-14 h-14 bg-gradient-to-r ${currentCoach.color} rounded-full flex items-center justify-center text-2xl relative`}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentCoach.avatar}
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white">{currentCoach.name}</h3>
                  <p className="text-xs text-gray-400">AI Fitness Coach • Online</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Brain className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs text-cyan-400">Neural Mode Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Mode Selector */}
            <div className="flex space-x-2 mb-4">
              {[
                { id: 'chat', label: 'Chat', icon: MessageCircle },
                { id: 'analysis', label: 'Analysis', icon: TrendingUp },
                { id: 'motivation', label: 'Boost', icon: Zap }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setCoachMode(mode.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-1 p-2 rounded-lg text-xs transition-all ${
                    coachMode === mode.id 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  <mode.icon className="w-3 h-3" />
                  <span>{mode.label}</span>
                </button>
              ))}
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
            <div className="max-h-48 overflow-y-auto mb-4 space-y-2">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.type === 'ai' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg text-sm ${
                    message.type === 'ai' 
                      ? 'bg-gray-800/50 text-gray-300 border-l-2 border-cyan-500' 
                      : 'bg-cyan-500/20 text-cyan-300 ml-8 border-l-2 border-cyan-400'
                  }`}
                >
                  {message.content}
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask your AI coach anything..."
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={handleVoiceInput}
                className={`p-2 rounded-lg transition-all ${
                  isListening 
                    ? 'bg-red-500/20 text-red-400 animate-pulse' 
                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'analyze', label: 'Analyze', icon: TrendingUp },
                { id: 'motivate', label: 'Motivate', icon: Zap },
                { id: 'optimize', label: 'Optimize', icon: Target },
                { id: 'form', label: 'Form Check', icon: Camera },
                { id: 'recovery', label: 'Recovery', icon: Heart },
                { id: 'predict', label: 'Predict', icon: Bot }
              ].map((action) => (
                <motion.button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="flex flex-col items-center space-y-1 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors text-xs text-gray-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <action.icon className="w-4 h-4" />
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